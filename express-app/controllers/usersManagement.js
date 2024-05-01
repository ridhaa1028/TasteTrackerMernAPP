const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
  service: "Gmail",
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  },
});

const registerUser = async (username, email, password) => {
  try {
    // Check if user already exists
    let existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new Error('User already exists');
    }

    // Create a new user
    const newUser = new User({ username, email, password });
    // Hash the password
    //newUser.password = await bcrypt.hash(password, 8);
    await newUser.save();

      // Email content
      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Thank you for Registering with TasteTracker',
        text: `Dear ${username},

      Thank you for registering with TasteTracker! We are thrilled to have you as a member of our community.

      Here are your registration details:
      - Username: ${username}
      - Email: ${email}

      We hope you enjoy using our platform and find it helpful for discovering new tastes and flavors. If you have any questions or need assistance, feel free to contact us at ru.profbot@gmail.com.

      Best regards,
      The TasteTracker Team`
      };

    // Send email
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error sending email:', error);
      } else {
        console.log('Email sent:', info.response);
      }
    });

    return { message: 'User created successfully' };
  } catch (err) {
    console.error('Error creating user', err);
    throw err;
  }
};

const loginUser = async (email, password) => {
  try {
    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error('User not found');
    }

    // Check if the password is correct
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error('Invalid password');
    }

    // Generate a JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    return { token, username: user.username, email: user.email }; // Include username and email in the response so it can be saved in session or local storage
  } catch (err) {
    console.error('Error logging in user', err);
    throw err;
  }
};


module.exports = { registerUser, loginUser };

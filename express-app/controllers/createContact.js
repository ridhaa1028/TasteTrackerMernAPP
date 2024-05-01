const Contact = require('../models/Contact');
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

// Create a new contact and send email
async function createContact(name, email, subject, message) {
  const newContact = new Contact({ name, email, subject, message });
  await newContact.save();

  // Email content
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: 'ridhaa1028@gmail.com',
    subject: 'New Contact Form Submission',
    text: `Name: ${name}\nEmail: ${email}\nSubject: ${subject}\nMessage: ${message}`
  };

  // Send email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
    } else {
      console.log('Email sent:', info.response);
    }
  });

  return newContact;
}

module.exports = createContact;
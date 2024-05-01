const express = require('express');
const router = express.Router();
const createReview = require('../controllers/createReview');
const getAllReviews = require('../controllers/getAllReviews');
const updateReview = require('../controllers/updateReview');
const deleteReview = require('../controllers/deleteReview');

// Route to create a new review
router.post('/', async (req, res) => {
  const { restaurantName, reviewText, rating, reviewer } = req.body;
  try {
    const newReview = await createReview(restaurantName, rating, reviewText, reviewer); //calls createReview controller
    res.status(201).json(newReview);
  } catch (err) {
    console.error('Error creating review', err);
    res.status(500).send('Internal Server Error');
  }
});

// Route to get all reviews
router.get('/', async (req, res) => {
  try {
    const reviews = await getAllReviews(); //calls getAllReviews controller
    res.json(reviews);
  } catch (err) {
    console.error('Error getting reviews', err);
    res.status(500).send('Internal Server Error');
  }
});

// Route to update a review
router.put('/', async (req, res) => {
  const { id, currentUser } = req.body
  const { restaurantName, reviewText, rating, reviewer} = req.body;
  try {
    const updatedReview = await updateReview(id, restaurantName, rating, reviewText, reviewer, currentUser); //calls updateReview controller
    if (!updatedReview) {
      console.log("reviewnotfound")
      res.status(404).send('Review not found');
    } else {
      res.json(updatedReview);
    }
  } catch (err) {
    console.error('Error updating review', err);
    res.status(500).send('Internal Server Error');
  }
});

// Route to delete a review
router.delete('/', async (req, res) => {
  const { id, currentUser } = req.body; 
  console.log(id);
  console.log(currentUser);
  try {
    if (!id) {
      console.log("ReviewIDMissing")
      return res.status(400).send('Review ID is required');
    }

    const deletedReview = await deleteReview(id, currentUser); //calls deleteReview controller
    if (!deletedReview) {
      res.status(404).send('Review not found');
    } else {
      res.json(deletedReview);
    }
  } catch (err) {
    console.error('Error deleting review', err);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;

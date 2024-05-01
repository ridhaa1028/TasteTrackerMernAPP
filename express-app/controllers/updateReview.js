const Review = require('../models/Review');

async function updateReview(id, restaurantName, rating, reviewText, reviewer, currentUser) {
  // Check if currentUser matches the reviewer
  if (currentUser !== reviewer) {
    throw new Error('Unauthorized: You are not authorized to update this review');
  }

  return await Review.findByIdAndUpdate(id, { restaurantName, rating, reviewText, reviewer }, { new: true });
}

module.exports = updateReview;

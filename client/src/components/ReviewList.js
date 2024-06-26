import React, { useState } from 'react';
import { Link } from 'react-scroll';
import heroImage from './hero.jpg';
import axios from 'axios';
import EditReviewModal from './EditReviewModal';

function ReviewList({ reviews }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');
  const [editReviewData, setEditReviewData] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

let currentUser = '';
try {
  currentUser = JSON.parse(localStorage.getItem('user')).username.toString();
} catch (error) {
  console.error('Error getting current user:', error);
}

  const filteredReviews = reviews.filter(review =>
    review.restaurantName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sortedReviews = sortOrder === 'asc'
    ? filteredReviews.sort((a, b) => a.rating - b.rating)
    : filteredReviews.sort((a, b) => b.rating - a.rating);


  const handleUpdateReview = (reviewData) => {
    setEditReviewData(reviewData);
    setIsEditModalOpen(true);
  };

  const handleDeleteReview = async (id) => {
    try {
      const currentUser = JSON.parse(localStorage.getItem('user')).username.toString();
      await axios.delete('http://localhost:3001/api/reviews', {
        data: { id, currentUser }
      });
      window.location.reload();
    } catch (error) {
      console.error('Error deleting review:', error);
    }
  };

  const handleCancelEdit = () => {
    setIsEditModalOpen(false);
    setEditReviewData(null);
  };

  const handleUpdateButtonClick = async (updatedReviewData) => {
    try {
      // Make axios PUT request to update review
      // Use updatedReviewData to update the review
      console.log('Updating review with data:', updatedReviewData);
      setIsEditModalOpen(false);
      setEditReviewData(null);
    } catch (error) {
      console.error('Error updating review:', error);
    }
  };

  return (
    <div
      id="reviewList"
      className="w-screen min-h-screen text-black flex flex-col items-center justify-center"
      style={{
        backgroundImage: `url(${heroImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      <div className="bg-black bg-opacity-90 p-8 rounded-lg w-full max-w-4xl">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl md:text-6xl font-bold mb-8 text-white">All Reviews</h2>
          <div className="flex justify-center mb-8">
            <input
              type="text"
              placeholder="Search by restaurant name"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="px-4 py-2 rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-lg w-full md:w-auto"
            />
          </div>
          <div className="flex justify-center mb-8">
            <button
              onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
              className="hover:scale-110 transform transition-transform duration-300 bg-gray-200 text-gray-800 font-bold rounded-full px-6 py-3"
            >
              Sort by Rating {sortOrder === 'asc' ? '↑' : '↓'}
            </button>
          </div>
          <div className="max-w-full w-full md:max-w-4xl md:w-full md:h-96 md:overflow-y-auto custom-scrollbar">
            <div className="max-w-full">
              {sortedReviews.map(review => (
                <div key={review.id} className="bg-white p-6 rounded-lg mb-8 shadow-md">
                  <h3 className="text-xl md:text-2xl font-bold mb-2">{review.restaurantName}</h3>
                  <p className="text-sm text-gray-600 mb-1">Reviewed by: {review.reviewer}</p>
                  <div className="flex items-center justify-center mb-2">
                    <span className="text-yellow-400 text-3xl">{'★'.repeat(review.rating)}</span>
                    <span className="text-gray-600 ml-2 text-lg">{review.rating}/5</span>
                  </div>
                  <p className="text-base text-gray-800">{review.reviewText}</p>
                  {currentUser && currentUser === review.reviewer && (
                    <div className="mt-4 flex justify-between">
                      <button
                        onClick={() => handleUpdateReview(review)}
                        className="bg-blue-500 text-white font-semibold px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteReview(review._id)}
                        className="bg-red-500 text-white font-semibold px-4 py-2 rounded hover:bg-red-600 focus:outline-none focus:bg-red-600"
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
          {isEditModalOpen && (
        <EditReviewModal
          isOpen={isEditModalOpen}
          onClose={handleCancelEdit}
          reviewData={editReviewData}
        />
      )}
      </div>

      <Link
        to="hero"
        spy={true}
        smooth={true}
        duration={500}
        className="hover:scale-110 transform transition-transform duration-300 bg-white text-white font-bold rounded-full py-4 px-8  mt-3"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 inline-block -mt-1" fill="black" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
        </svg>
      </Link>
    </div>
  );
}

export default ReviewList;










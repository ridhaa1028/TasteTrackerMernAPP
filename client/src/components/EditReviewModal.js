import React, { useState } from 'react';
import axios from 'axios';

function EditReviewModal({ isOpen, onClose, reviewData,}) {
  const [editedReview, setEditedReview] = useState({});

  // Update local state with initial review data when modal is opened
  React.useEffect(() => {
    if (isOpen && reviewData) {
      setEditedReview({
        restaurantName: reviewData.restaurantName,
        rating: reviewData.rating,
        reviewText: reviewData.reviewText
      });
    }
  }, [isOpen, reviewData]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEditedReview({ ...editedReview, [name]: value });
  };

    const handleSubmit = async (event) => {
    event.preventDefault();
    try {
        // Get currentUser from local storage
        const currentUser = JSON.parse(localStorage.getItem('user')).username;

        // Destructure editedReview to get individual fields
        const { restaurantName, rating, reviewText } = editedReview;

        // Make PUT request to update review
        await axios.put('http://localhost:3001/api/reviews', {
        id: reviewData._id,
        currentUser: currentUser,
        restaurantName: restaurantName,
        rating: rating,
        reviewText: reviewText,
        reviewer: reviewData.reviewer // Assuming reviewer data is also needed
        });
        window.location.reload()
        onClose(); // Close the modal after successful update
    } catch (error) {
        console.error('Error updating review:', error);
        // Handle error
    }
    };

  return (
    <div className={`modal ${isOpen ? 'fixed inset-0 flex items-center justify-center overflow-auto' : 'hidden'}`}>
      <div className="modal-overlay absolute w-full h-full bg-gray-900 opacity-50"></div>
      <div className="modal-container bg-white w-11/12 md:max-w-md mx-auto rounded shadow-lg z-50 overflow-y-auto">
        <div className="modal-content py-4 text-left px-6">
          <div className="flex justify-between items-center pb-3">
            <p className="text-2xl font-bold">Edit Review</p>
            <button onClick={onClose} className="modal-close cursor-pointer z-50">
              <svg
                className="fill-current text-black"
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 18 18"
              >
                <path
                  d="M16.364 1.636a1 1 0 0 0-1.414 0L9 7.586 2.05.636a1 1 0 1 0-1.414 1.414L7.586 9l-6.95 6.95a1 1 0 0 0 0 1.414 1 1 0 0 0 1.414 0L9 10.414l6.95 6.95a1 1 0 0 0 1.414-1.414L10.414 9l6.95-6.95a1 1 0 0 0 0-1.414z"
                  fillRule="evenodd"
                />
              </svg>
            </button>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="restaurantName">
                Restaurant Name
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="restaurantName"
                type="text"
                placeholder="Restaurant Name"
                name="restaurantName"
                value={editedReview.restaurantName}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="rating">
                Rating
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="rating"
                type="number"
                placeholder="Rating"
                name="rating"
                value={editedReview.rating}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="reviewText">
                Review Text
              </label>
              <textarea
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="reviewText"
                placeholder="Review Text"
                name="reviewText"
                value={editedReview.reviewText}
                onChange={handleInputChange}
              ></textarea>
            </div>
            <div className="flex items-center justify-between">
              <button
                className="bg-blue-500 hover:scale-110 transform transition-transform duration-300 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Update
              </button>
              <button
                className="modal-close bg-red-600 hover:scale-110 transform transition-transform duration-300 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                onClick={onClose}
                type="button"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditReviewModal;



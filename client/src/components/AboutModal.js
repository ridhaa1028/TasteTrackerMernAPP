import React from 'react';

const AboutModal = ({ onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Tech Stack</h2>
        <div className="flex items-center mb-4">
          <div>
            <h3 className="text-xl font-semibold">MongoDB</h3>
            <p className="text-gray-600">Why I used it: MongoDB is a NoSQL database that provides flexibility and scalability, making it suitable for modern applications. Gaining NoSQL expereience was also very valuable to me.</p>
          </div>
        </div>
        <div className="flex items-center mb-4">
          <div>
            <h3 className="text-xl font-semibold">Express.js</h3>
            <p className="text-gray-600">Why I used it: Express.js is a minimal and flexible Node.js web application framework that made building server-side logic very easy!</p>
          </div>
        </div>
        <div className="flex items-center mb-4">
          <div>
            <h3 className="text-xl font-semibold">React</h3>
            <p className="text-gray-600">Why I used it: React makes frontend development much more intuitive by allowing for the use of components. Functionality, and frontend features can be broken down into components to isolate functionality and make development easier/tidier.</p>
          </div>
        </div>
        <div className="flex items-center">
          <div>
            <h3 className="text-xl font-semibold">Node.js</h3>
            <p className="text-gray-600">Why I used it: Node.js is a JavaScript runtime that makes it easier to build server side logic. It also comes with a great built-in package manager.</p>
          </div>
        </div>
        <button onClick={onClose} className="text-black bg-gray-200 px-3 py-2 rounded-md text-xl font-medium mt-4">Close</button>
      </div>
    </div>
  );
};

export default AboutModal;


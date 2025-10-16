Chat App

A real-time chat application built with React, Zustand, Node.js, Express, Socket.IO, and MongoDB. This app allows users to sign up, log in, and chat with other online users. Messages support text and images, and users can see who is online in real-time.

Highlights:

- 🌟 Tech stack: MERN + Socket.io + TailwindCSS + Daisy UI
- 🎃 Authentication && Authorization with JWT
- 👾 Real-time messaging with Socket.io
- 🚀 Online user status
- 👌 Global state management with Zustand
- 🐞 Error handling both on the server and on the client
- ⭐ At the end Deployment like a pro for FREE!
- ⏳ And much more!

Tech Stack

Frontend: React, Zustand, TailwindCSS, Vite

Backend: Node.js, Express, Socket.IO

Database: MongoDB with Mongoose

File Storage: Cloudinary (for image uploads)

Authentication: JWT (JSON Web Tokens)

Installation

Clone the repository:

git clone https://github.com/yourusername/chat-app.git


Install backend dependencies:

cd backend
npm install


Install frontend dependencies:

cd ../frontend
npm install


Create a .env file in the backend folder with the following variables:

PORT=5001
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret


Run the backend server:

npm run dev


Run the frontend app:

npm run dev


Open http://localhost:5173 in your browser.

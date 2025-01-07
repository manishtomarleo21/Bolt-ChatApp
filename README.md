# 🚀 Bolt ChatApp

Bolt ChatApp is a full-stack real-time chat application built using modern web technologies. The app allows users to send messages, share media, and interact with an AI-powered chat assistant using Google Gemini AI.

## ✨ Features

- 💬 **Real-time Messaging** powered by Socket.io
- 🤖 **AI Chat Integration** using Google Gemini AI
- 🔑 **Authentication System** with JWT and bcryptjs
- 🗄️ **State Management** using Zustand
- 🗃️ **Database Management** using MongoDB and Mongoose
- 📦 **Image Uploading** using Cloudinary
- 🎨 **Modern UI** with React, TailwindCSS, and DaisyUI

## 🛠️ Tech Stack

```plaintext
Frontend:
- React 18
- React Router Dom 7
- Zustand
- Axios
- Lucide React
- TailwindCSS & DaisyUI
- Vite

Backend:
- Node.js with Express
- MongoDB with Mongoose
- JWT for Authentication
- bcryptjs for Password Hashing
- Cloudinary for Image Uploading
- Socket.io for Real-time Communication
- OpenAI API Integration
```

## 🚀 Getting Started

### ✅ Prerequisites

- 📦 Node.js and npm installed
- 🍃 MongoDB instance running

### 📥 Installation

```bash
# Clone the repository
git clone https://github.com/manishtomarleo21/Bolt-ChatApp.git

# Navigate to the backend folder and install dependencies
cd backend
npm install

# Set up environment variables by creating a `.env` file

# Run the backend server
npm run dev

# Navigate to the frontend folder and install dependencies
cd ../frontend
npm install

# Run the frontend server
npm run dev
```

## 🔑 Environment Variables

Create a `.env` file in the `backend` directory with the following keys:

```plaintext
MONGO_URI=your-mongo-uri
JWT_SECRET=your-secret
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
OPENAI_API_KEY=your-openai-api-key
```

## 🤝 Contributing

Feel free to contribute to this project by opening issues and submitting pull requests.

## 📄 License

This project is licensed under the ISC License.

## 👨‍💻 Author

- [Manish Tomar](https://github.com/manishtomarleo21)

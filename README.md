# Full Stack Form Submission App

A simple full-stack application where users can submit a form with name, email, age group, rating, and profile picture. The frontend is built with **React**, **Vite**, and **Tailwind CSS**, while the backend uses **Express.js** with an API to store user data.

## ✨ Features

- 📋 User form with fields: Name, Email, Age Group, Rating, and Profile Picture Upload  
- 📤 Data submitted to a Node.js + Express backend  
- ✅ Client-side validations  
- 🖼️ Image preview  
- 📁 Backend stores users in memory 
- 🌐 Displays submitted user data on a results page  

## 📁 Project Structure

```
full/
├── client/                 # Frontend (React + Vite)
│   ├── public/
│   ├── src/
│   └── package.json
│
├── server/
│   ├── models/
│   │   └── User.js              # Backend (Express.js)
│   ├── routes/
│   │   └── user.js
│   ├── server.js
│   └── package.json
│
├── .gitignore
└── README.md
```

## 🚀 Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name
```

### 2. Start the Backend

```bash
cd server
npm install
node server.js
```

Backend runs at: `http://localhost:5000`

### 3. Start the Frontend

```bash
cd client
npm install
npm run dev
```

Frontend runs at: `http://localhost:5173`

## 📦 API Endpoints

### POST `/api/user`

Create a new user.

**Request Body:**

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "age": "18-25",
  "rating": 4,
  "profilePicture": "data:image/jpeg;base64,..."
}
```

### GET `/api/users`

Returns all submitted users.

## ⚙️ Deployment

Deploy the frontend on **Vercel**, and the backend on **Render**, **Railway**, or any Node hosting provider.

## 🙋‍♀️ Author

**Nimisha Gupta**

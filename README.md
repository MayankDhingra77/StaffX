# 🚀 StaffX - Employee Management System

A full-stack Employee Management System built using React, Node.js, Express, and MongoDB Atlas.

StaffX helps organizations manage employees, attendance, leave requests, tasks, and workforce operations through a centralized dashboard.

## ✨ Features

* Employee Management
* Attendance Tracking
* Leave Management
* Task Assignment & Tracking
* JWT Authentication
* Role-Based Access Control
* MongoDB Atlas Integration
* Responsive UI with Tailwind CSS

## 🛠 Tech Stack

### Frontend

* React
* Vite
* Tailwind CSS
* Axios
* React Router

### Backend

* Node.js
* Express.js
* MongoDB Atlas
* Mongoose
* JWT
* bcrypt

## 📁 Project Structure

```text
StaffX/
│
├── backend/
│   ├── src/
│   ├── server.js
│   ├── package.json
│   └── .env
│
├── frontend/
│   ├── src/
│   ├── package.json
│   ├── vite.config.js
│   ├── index.html
│   └── .env
│
└── README.md
```

## ⚙️ Installation

### Clone Repository

```bash
git clone https://github.com/MayankDhingra77/StaffX
cd StaffX
```

### Backend Setup

```bash
cd backend
npm install
```

Create `.env`

```env
PORT=5000
NODE_ENV=development

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_secret_key
JWT_EXPIRES_IN=7d

ADMIN_EMAIL=admin@staffx.io
ADMIN_PASSWORD=admin123
ADMIN_NAME=Admin

CORS_ORIGIN=http://localhost:5173
```

Start backend:

```bash
npm run dev
```

Backend will run on:

```text
http://localhost:5000
```

### Frontend Setup

```bash
cd ../frontend
npm install
```

Create `.env`

```env
VITE_API_URL=http://localhost:5000/api
```

Start frontend:

```bash
npm run dev
```

Frontend will run on:

```text
http://localhost:5173
```

## 🔐 Default Admin Login

```text
Email: admin@staffx.io
Password: admin123
```

## 🌐 Deployment

### Frontend

* Vercel

### Backend

* Render

### Database

* MongoDB Atlas

Environment variable on Vercel:

```env
VITE_API_URL=https://your-render-backend-url.onrender.com/api
```

Environment variable on Render:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
CORS_ORIGIN=https://your-vercel-app.vercel.app
```

## 📌 Future Enhancements

* Payroll Management
* Performance Analytics
* Email Notifications
* Real-Time Updates
* Document Management

## 👨‍💻 Author

Mayank

If you found this project useful, consider giving it a ⭐ on GitHub.

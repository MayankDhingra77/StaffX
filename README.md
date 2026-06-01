<div align="center">

# 🚀 StaffX - Human Resource Management System

A modern full-stack HRMS built with React, Node.js, Express, and MongoDB Atlas.

Manage employees, attendance, tasks, leave requests, performance ratings, and activity logs through dedicated Admin and Employee portals.

### 🌐 Live Demo

Frontend: https://staffxfrontend.vercel.app

Backend API: https://staffx-backend.onrender.com

---

![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-18+-339933?style=for-the-badge&logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express.js-Backend-000000?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-Frontend-black?style=for-the-badge&logo=vercel)
![Render](https://img.shields.io/badge/Render-Backend-46E3B7?style=for-the-badge&logo=render)

</div>

---

# 📸 Screenshots

## Admin Dashboard

![Admin Dashboard](screenshots/adminDashboard.png)

## Employee Portal

![Employee Portal](screenshots/employeeDashboard.png)

# ✨ Features

## 👨‍💼 Admin Portal

- Dashboard with real-time statistics
- Employee management system
- Attendance management
- Leave management
- Task assignment and tracking
- Employee performance ratings
- Activity monitoring and logs
- Department overview and analytics

## 👨‍💻 Employee Portal

- Personal employee dashboard
- View assigned tasks
- Apply for leaves
- Leave history tracking
- Performance overview
- Attendance records
- Task progress updates

## 📊 Dashboard Analytics

- Total Employees
- Active Employees
- Employees On Leave
- Department Statistics
- Present Today
- Pending Tasks
- Task Progress Overview
- Recent Activity Feed
- Employee Performance Ratings

## 🔐 Authentication & Security

- JWT Authentication
- Role Based Access Control (RBAC)
- Protected Routes
- Password Hashing using bcrypt
- Secure REST APIs
- Environment Variable Configuration

---

# 🛠️ Tech Stack

## Frontend

- React 18
- Vite
- Tailwind CSS
- Axios
- Context API
- React Icons

## Backend

- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- JWT Authentication
- bcryptjs
- Express Middleware

## Deployment

- Vercel (Frontend)
- Render (Backend)
- MongoDB Atlas (Database)

---

# 📁 Project Structure

```text
StaffX/
└── Ems/
    ├── backend/
    │   ├── src/
    │   ├── server.js
    │   ├── package.json
    │   └── .env
    │
    ├── frontend/
    │   ├── src/
    │   ├── public/
    │   ├── package.json
    │   ├── vite.config.js
    │   └── .env
    │
    ├── screenshots/
    │   ├── admin-dashboard.png
    │   └── employee-portal.png
    │
    └── README.md
```

---

# 🚀 Local Setup

## Clone Repository

```bash
git clone https://github.com/MayankDhingra77/StaffX.git
```

## Backend Setup

```bash
cd Ems/backend
npm install
npm run dev
```

Backend runs on:

```text
http://localhost:5000
```

## Frontend Setup

```bash
cd Ems/frontend
npm install
npm run dev
```

Frontend runs on:

```text
http://localhost:5173
```

---

# ⚙️ Environment Variables

## Backend (.env)

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
JWT_EXPIRES_IN=7d
CORS_ORIGIN=http://localhost:5173
```

## Frontend (.env)

```env
VITE_API_URL=http://localhost:5000/api
```

---

# 🌍 Deployment

## Frontend

Hosted on Vercel

https://staffxfrontend.vercel.app

## Backend

Hosted on Render

https://staffx-backend.onrender.com

## Database

MongoDB Atlas Cloud Database

---

# 🎯 Highlights

- Full Stack MERN Application
- Production Deployment
- MongoDB Atlas Integration
- JWT Authentication
- Role Based Access Control
- Responsive Dark Theme UI
- Attendance Management System
- Leave Management Workflow
- Employee Performance Tracking
- Task Assignment & Monitoring
- Activity Logging System

---

# 👨‍💻 Author

### Mayank Dhingra

GitHub:
https://github.com/MayankDhingra77

---

⭐ If you found this project useful, consider giving it a star.

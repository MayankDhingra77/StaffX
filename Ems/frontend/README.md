# StaffX — Full-Stack HRMS

A production-grade Human Resource Management System with React + Node.js + MongoDB.

## Quick Start

### 1. Backend
```bash
cd backend && npm install && npm run seed && npm run dev
```

### 2. Frontend
```bash
npm install && npm run dev
```

## Demo Credentials
| Role     | Email             | Password |
|----------|-------------------|----------|
| Admin    | admin@staffx.io   | admin123 |
| Employee | aman@staffx.io    | 123      |

## Environment Variables

**backend/.env**
```
PORT=5000
MONGO_URI=mongodb://localhost:27017/staffx
JWT_SECRET=your_secret_here
CORS_ORIGIN=http://localhost:5173
```

**.env (frontend)**
```
VITE_API_URL=http://localhost:5000/api
```

## API Routes
- POST   /api/auth/login
- GET    /api/employees
- POST   /api/employees
- GET    /api/attendance/all
- POST   /api/attendance/bulk
- GET    /api/leaves
- POST   /api/tasks
- GET    /api/dashboard
- GET    /api/activities

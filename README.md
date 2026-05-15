# StaffX — HR Management System

A clean, full-featured HR management web app built with React, Vite, and Tailwind CSS. Supports two roles — **Admin** and **Employee** — each with their own dashboard and capabilities.

---

## Screenshots

> Admin Dashboard · Employee Portal · Dark Mode supported throughout

---

## Features

**Admin Panel**
- Dashboard with live stats — headcount, attendance, pending tasks, departments
- Employee directory — add, edit, delete, search, filter by department/status
- Task management — assign tasks, set priorities, track status
- Leave management — review and approve/reject leave requests
- Attendance tracking — mark daily attendance for all employees
- Activity log — timestamped record of all actions taken

**Employee Panel**
- Personal profile portal — view your own details and salary info
- My Tasks — see assigned tasks and update their status
- My Leaves — apply for leave and track approval status
- Performance — view your ratings and feedback from admin

**General**
- Dark / Light mode toggle
- React Icons throughout (no emojis)
- Toast notifications for all actions
- Responsive layout

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 18 |
| Build Tool | Vite |
| Styling | Tailwind CSS |
| Icons | React Icons (Material Design) |
| State | React Context API + useReducer |
| Storage | localStorage |

---

## Getting Started

**Prerequisites:** Node.js 16+

```bash
# 1. Clone the repo
git clone https://github.com/your-username/staffx.git
cd staffx

# 2. Install dependencies
npm install

# 3. Start the dev server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

```bash
# Build for production
npm run build

# Preview production build
npm run preview
```

---

## Demo Credentials

**Admin**
```
Email:    admin@staffx.io
Password: admin123
```

**Employee** — any of the following:

| Name | Email | Password |
|---|---|---|
| Aman Gupta | aman@staffx.io | 123 |
| Rohit Sharma | rohit@staffx.io | 123 |
| Rahul Singh | rahul@staffx.io | 123 |
| Abhishek Kumar | abhishek@staffx.io | 123 |
| Karan Malhotra | karan@staffx.io | 123 |
| Gagan Thakral | gagan@staffx.io | 123 |
| Vansh Arora | vansh@staffx.io | 123 |
| Gautam Sachdeva | gautam@staffx.io | 123 |
| Nitesh Srivastava | nitesh@staffx.io | 123 |
| Arpit Joshi | arpit@staffx.io | 123 |

---

## Project Structure

```
staffx/
├── src/
│   ├── components/
│   │   ├── UI.jsx            # Shared UI primitives (Button, Modal, Toast, etc.)
│   │   ├── LoginPage.jsx     # Login screen with role switcher
│   │   └── Sidebar.jsx       # Navigation sidebar
│   ├── contexts/
│   │   ├── AuthContext.jsx   # Login / logout state
│   │   ├── DataContext.jsx   # Global data store with useReducer
│   │   └── ThemeContext.jsx  # Dark / light mode
│   ├── pages/
│   │   ├── admin/            # Dashboard, Employees, Tasks, Leaves, Attendance, Logs
│   │   └── employee/         # Portal, MyTasks, MyLeaves, Performance
│   ├── utils/
│   │   └── data.js           # Seed data, helpers, formatCurrency
│   ├── App.jsx
│   ├── index.jsx
│   └── index.css
├── index.html
├── vite.config.js
├── tailwind.config.js
└── package.json
```

---

## License

MIT
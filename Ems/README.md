# StaffX - HR Management System

A modern HR management application built with React, Vite, and Tailwind CSS.

## Project Structure

```
staffx-app/
├── src/
│   ├── components/          # UI components
│   │   ├── UI.jsx          # Reusable UI elements
│   │   ├── LoginPage.jsx   # Login page
│   │   └── Sidebar.jsx     # Navigation sidebar
│   ├── contexts/           # React contexts
│   │   ├── AuthContext.jsx      # Authentication
│   │   └── DataContext.jsx      # Data management
│   ├── pages/              # Page components
│   │   ├── admin/          # Admin pages
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Employees.jsx
│   │   │   ├── Tasks.jsx
│   │   │   ├── Leaves.jsx
│   │   │   └── ActivityLogs.jsx
│   │   └── employee/       # Employee pages
│   │       ├── Portal.jsx
│   │       ├── MyTasks.jsx
│   │       └── MyLeaves.jsx
│   ├── utils/              # Utility functions
│   │   └── data.js         # Sample data and helpers
│   ├── App.jsx             # Main app component
│   ├── index.jsx           # Entry point
│   └── index.css           # Global styles
├── index.html              # HTML template
├── vite.config.js          # Vite config
├── tailwind.config.js      # Tailwind config
├── postcss.config.js       # PostCSS config
└── package.json            # Dependencies

```

## Installation

1. Install dependencies:
```bash
npm install
```

2. Start development server:
```bash
npm run dev
```

3. Open browser at `http://localhost:5173`

## Build for Production

```bash
npm run build
```

## Demo Credentials

**Admin:**
- Email: admin@staffx.io
- Password: admin123

**Employee:**
- Email: arjun@staffx.io
- Password: 123

## Features

- Employee management
- Task assignment and tracking
- Leave request management
- Activity logging
- Dark mode UI
- Responsive design
- Local storage persistence

## Technologies Used

- React 18
- Vite
- Tailwind CSS
- React Context API

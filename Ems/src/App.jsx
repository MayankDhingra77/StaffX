import { useState } from 'react';
import { useAuth } from './contexts/AuthContext';
import { useToast, Toast } from './components/UI';
import { LoginPage } from './components/LoginPage';
import { Sidebar } from './components/Sidebar';
import { DashboardPage } from './pages/admin/Dashboard';
import { EmployeesPage } from './pages/admin/Employees';
import { TasksPage } from './pages/admin/Tasks';
import { LeavesPage } from './pages/admin/Leaves';
import { ActivityLogsPage } from './pages/admin/ActivityLogs';
import { AttendancePage } from './pages/admin/Attendance';
import { EmployeePortalPage } from './pages/employee/Portal';
import { MyTasksPage } from './pages/employee/MyTasks';
import { MyLeavesPage } from './pages/employee/MyLeaves';
import { PerformancePage } from './pages/employee/Performance';

function Shell() {
  const { user } = useAuth();
  const isAdmin = user?.role === "admin";
  const [page, setPage] = useState(isAdmin ? "dashboard" : "portal");
  const { toasts, toast, removeToast } = useToast();

  function renderPage() {
    if (isAdmin) {
      if (page === "dashboard")  return <DashboardPage />;
      if (page === "employees")  return <EmployeesPage toast={toast} />;
      if (page === "tasks")      return <TasksPage toast={toast} />;
      if (page === "leaves")     return <LeavesPage toast={toast} />;
      if (page === "attendance") return <AttendancePage toast={toast} />;
      if (page === "logs")       return <ActivityLogsPage />;
    } else {
      if (page === "portal")      return <EmployeePortalPage />;
      if (page === "my-tasks")    return <MyTasksPage toast={toast} />;
      if (page === "my-leaves")   return <MyLeavesPage toast={toast} />;
      if (page === "performance") return <PerformancePage />;
    }
    return null;
  }

  return (
    <div className="flex h-screen bg-slate-50 dark:bg-[#161b22] text-gray-900 dark:text-gray-100 overflow-hidden transition-colors">
      <Sidebar page={page} setPage={setPage} role={isAdmin ? "admin" : "employee"} />
      <main className="flex-1 overflow-y-auto">
        <div className="p-6 max-w-7xl mx-auto">{renderPage()}</div>
      </main>
      <Toast toasts={toasts} removeToast={removeToast} />
    </div>
  );
}

export default function App() {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <Shell /> : <LoginPage />;
}

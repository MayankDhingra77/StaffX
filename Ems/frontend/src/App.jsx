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
import { MdMenu, MdClose } from 'react-icons/md';

function Shell() {
  const { user } = useAuth();
  const isAdmin = user?.role === 'admin' || user?.role === 'hr';
  const [page, setPage] = useState(isAdmin ? 'dashboard' : 'portal');
  const { toasts, toast, removeToast } = useToast();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  function renderPage() {
    if (isAdmin) {
      if (page === 'dashboard')  return <DashboardPage />;
      if (page === 'employees')  return <EmployeesPage toast={toast} />;
      if (page === 'tasks')      return <TasksPage toast={toast} />;
      if (page === 'leaves')     return <LeavesPage toast={toast} />;
      if (page === 'attendance') return <AttendancePage toast={toast} />;
      if (page === 'logs')       return <ActivityLogsPage />;
    } else {
      if (page === 'portal')      return <EmployeePortalPage />;
      if (page === 'my-tasks')    return <MyTasksPage toast={toast} />;
      if (page === 'my-leaves')   return <MyLeavesPage toast={toast} />;
      if (page === 'performance') return <PerformancePage />;
    }
    return null;
  }

  function handleNavChange(p) {
    setPage(p);
    setSidebarOpen(false);
  }

  return (
    <div className="flex h-screen bg-slate-50 dark:bg-[#0a0c10] text-gray-900 dark:text-gray-100 overflow-hidden transition-colors">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/50 backdrop-blur-sm lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar — hidden on mobile unless open */}
      <div className={`
        fixed inset-y-0 left-0 z-40 lg:static lg:z-auto
        transform transition-transform duration-200 ease-in-out
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <Sidebar page={page} setPage={handleNavChange} role={isAdmin ? 'admin' : 'employee'} />
      </div>

      {/* Main content */}
      <main className="flex-1 overflow-y-auto min-w-0">
        {/* Mobile top bar */}
        <div className="sticky top-0 z-20 flex items-center gap-3 px-4 py-3 bg-white/90 dark:bg-[#0d1017]/90 backdrop-blur border-b border-gray-200 dark:border-[#1e2432] lg:hidden">
          <button
            onClick={() => setSidebarOpen(true)}
            className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 dark:hover:bg-[#1a1f2c] text-gray-500 dark:text-gray-400 transition-colors"
          >
            <MdMenu size={20} />
          </button>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-emerald-600 flex items-center justify-center">
              <span className="text-white font-bold text-[10px] tracking-wider">SX</span>
            </div>
            <span className="font-semibold text-sm text-gray-900 dark:text-white">StaffX</span>
          </div>
        </div>

        <div className="p-4 sm:p-6 max-w-7xl mx-auto min-h-full">{renderPage()}</div>
      </main>

      <Toast toasts={toasts} removeToast={removeToast} />
    </div>
  );
}

export default function App() {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <Shell /> : <LoginPage />;
}
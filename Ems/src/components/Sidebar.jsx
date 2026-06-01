import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import { Avatar, Btn } from './UI';
import {
  MdDashboard, MdPeople, MdAssignment, MdEventNote,
  MdCalendarToday, MdHistory, MdPerson, MdStar,
  MdWbSunny, MdNightlight, MdLogout,
} from 'react-icons/md';

const NAV_ADMIN = [
  { key: "dashboard",  label: "Dashboard",  Icon: MdDashboard },
  { key: "employees",  label: "Employees",  Icon: MdPeople },
  { key: "tasks",      label: "Tasks",      Icon: MdAssignment },
  { key: "leaves",     label: "Leaves",     Icon: MdEventNote },
  { key: "attendance", label: "Attendance", Icon: MdCalendarToday },
  { key: "logs",       label: "Activity",   Icon: MdHistory },
];

const NAV_EMPLOYEE = [
  { key: "portal",      label: "My Portal",    Icon: MdPerson },
  { key: "my-tasks",    label: "My Tasks",     Icon: MdAssignment },
  { key: "my-leaves",   label: "My Leaves",    Icon: MdEventNote },
  { key: "performance", label: "Performance",  Icon: MdStar },
];

export function Sidebar({ page, setPage, role }) {
  const { user, logout } = useAuth();
  const { dark, toggle } = useTheme();
  const nav = role === "admin" ? NAV_ADMIN : NAV_EMPLOYEE;

  return (
    <div className="flex flex-col h-full bg-white dark:bg-[#0d1017] border-r border-gray-200 dark:border-[#1e2432] w-[220px] shrink-0">
      {/* Logo */}
      <div className="px-4 py-4 border-b border-gray-100 dark:border-[#1a1f2c]">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center shrink-0 shadow-sm shadow-emerald-900/30">
            <span className="text-white font-bold text-xs tracking-wider">SX</span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-sm text-gray-900 dark:text-white">StaffX</p>
            <p className="text-[10px] text-gray-400 dark:text-gray-600 capitalize tracking-wide">{role} panel</p>
          </div>
          <button onClick={toggle}
            className="w-7 h-7 flex items-center justify-center rounded-md hover:bg-gray-100 dark:hover:bg-[#1a1f2c] text-gray-400 dark:text-gray-600 hover:text-gray-600 dark:hover:text-gray-400 transition-colors"
            title="Toggle theme">
            {dark ? <MdWbSunny size={14} /> : <MdNightlight size={14} />}
          </button>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-2.5 py-3 space-y-0.5 overflow-y-auto">
        <p className="px-2 pb-2 text-[10px] font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-700">
          {role === "admin" ? "Management" : "Personal"}
        </p>
        {nav.map(({ key, label, Icon }) => {
          const isActive = page === key;
          return (
            <button key={key} onClick={() => setPage(key)}
              className={`w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-[13px] font-medium transition-all text-left group
                ${isActive
                  ? "bg-emerald-600 text-white shadow-sm shadow-emerald-900/30"
                  : "text-gray-500 dark:text-gray-500 hover:text-gray-800 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-[#161a22]"
                }`}>
              <Icon size={15} className={`shrink-0 transition-colors ${isActive ? "text-white/90" : "text-gray-400 dark:text-gray-600 group-hover:text-gray-600 dark:group-hover:text-gray-400"}`} />
              {label}
            </button>
          );
        })}
      </nav>

      {/* User footer */}
      <div className="px-2.5 py-3 border-t border-gray-100 dark:border-[#1a1f2c] space-y-1">
        <div className="flex items-center gap-2.5 px-2.5 py-2 rounded-lg">
          <Avatar name={user?.name ?? "?"} color="#059669" size="sm" />
          <div className="flex-1 min-w-0">
            <p className="text-xs font-semibold text-gray-700 dark:text-gray-300 truncate">{user?.name}</p>
            <p className="text-[10px] text-gray-400 dark:text-gray-600 truncate capitalize">{user?.role}</p>
          </div>
        </div>
        <button onClick={logout}
          className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-[12px] font-medium text-gray-400 dark:text-gray-600 hover:text-red-500 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/20 transition-colors">
          <MdLogout size={13} />
          Sign out
        </button>
      </div>
    </div>
  );
}

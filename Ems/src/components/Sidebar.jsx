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
    <div className="flex flex-col h-full bg-white dark:bg-[#0d1117] border-r border-gray-200 dark:border-[#21262d] w-60 shrink-0">
      <div className="px-5 py-5 border-b border-gray-200 dark:border-[#21262d]">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-emerald-600 flex items-center justify-center shrink-0">
            <span className="text-white font-black text-sm">SX</span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-black text-base tracking-tight text-gray-900 dark:text-white">StaffX</p>
            <p className="text-gray-400 dark:text-gray-600 text-xs capitalize">{role} Panel</p>
          </div>
          <button onClick={toggle} className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-[#21262d] text-gray-400 transition-colors" title="Toggle theme">
            {dark ? <MdWbSunny size={16} /> : <MdNightlight size={16} />}
          </button>
        </div>
      </div>

      <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
        {nav.map(({ key, label, Icon }) => (
          <button key={key} onClick={() => setPage(key)}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all text-left
              ${page === key
                ? "bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/40"
                : "text-gray-500 dark:text-gray-500 hover:text-gray-800 dark:hover:text-gray-300 hover:bg-gray-50 dark:hover:bg-[#161b22]"}`}>
            <Icon size={17} className="shrink-0" />
            {label}
          </button>
        ))}
      </nav>

      <div className="px-3 py-4 border-t border-gray-200 dark:border-[#21262d]">
        <div className="flex items-center gap-3 px-3 py-2 mb-2">
          <Avatar name={user?.name ?? "?"} color="#059669" size="sm" />
          <div className="flex-1 min-w-0">
            <p className="text-xs font-semibold text-gray-700 dark:text-gray-300 truncate">{user?.name}</p>
            <p className="text-xs text-gray-400 dark:text-gray-600 truncate capitalize">{user?.role}</p>
          </div>
        </div>
        <Btn onClick={logout} variant="ghost" className="w-full justify-start text-red-500 hover:text-red-600 dark:hover:text-red-400">
          <MdLogout size={15} /> Sign Out
        </Btn>
      </div>
    </div>
  );
}

import { useData } from '../../contexts/DataContext';
import { StatCard, Avatar, StarRating, Badge, EmptyState, C } from '../../components/UI';
import {
  MdPeople, MdCheckCircle, MdEventBusy, MdBusiness,
  MdAccessTime, MdOutlineAssignment,
} from 'react-icons/md';

export function DashboardPage() {
  const { employees, tasks, leaves, activityLogs, ratings, attendance } = useData();
  const total = employees.length;
  const active = employees.filter(e => e.status === "Active").length;
  const onLeave = leaves.filter(l => l.status === "Approved").length;
  const depts = new Set(employees.map(e => e.department)).size;
  const pendingTasks = tasks.filter(t => t.status === "Pending").length;

  const taskStats = [
    { label: "Pending",     value: tasks.filter(t => t.status === "Pending").length,    color: "text-gray-500 dark:text-gray-400",   dot: "bg-gray-300 dark:bg-gray-600" },
    { label: "In Progress", value: tasks.filter(t => t.status === "In Progress").length, color: "text-blue-600 dark:text-blue-400",   dot: "bg-blue-400" },
    { label: "Completed",   value: tasks.filter(t => t.status === "Completed").length,   color: "text-emerald-600 dark:text-emerald-400", dot: "bg-emerald-400" },
  ];

  const today = new Date().toISOString().split("T")[0];
  const todayAtt = attendance.filter(a => a.date === today);
  const presentToday = todayAtt.filter(a => a.status === "Present").length;

  const getActivityColor = (action) => {
    if (action.includes("added") || action.includes("approved")) return "bg-emerald-500";
    if (action.includes("deleted") || action.includes("rejected")) return "bg-red-400";
    if (action.includes("updated") || action.includes("assigned")) return "bg-blue-400";
    return "bg-gray-400";
  };

  return (
    <div className="space-y-5 animate-fade-in-up">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold tracking-tight">Dashboard</h1>
          <p className="text-sm mt-0.5 text-gray-500 dark:text-gray-400">
            {new Date().toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "long" })}
          </p>
        </div>
        <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200/60 dark:border-emerald-900/40 rounded-lg">
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-xs font-medium text-emerald-700 dark:text-emerald-400">Live</span>
        </div>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-3 stagger">
        <StatCard label="Total" value={total}           color="text-violet-600 dark:text-violet-400" icon={<MdPeople size={14} />} />
        <StatCard label="Active" value={active}          color="text-emerald-600 dark:text-emerald-400" icon={<MdCheckCircle size={14} />} />
        <StatCard label="On Leave" value={onLeave}       color="text-amber-600 dark:text-amber-400" icon={<MdEventBusy size={14} />} />
        <StatCard label="Departments" value={depts}     color="text-blue-600 dark:text-blue-400" icon={<MdBusiness size={14} />} />
        <StatCard label="Present Today" value={presentToday || "—"} color="text-teal-600 dark:text-teal-400" icon={<MdAccessTime size={14} />} />
        <StatCard label="Pending Tasks" value={pendingTasks} color="text-orange-600 dark:text-orange-400" icon={<MdOutlineAssignment size={14} />} />
      </div>

      {/* Middle row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Task Overview */}
        <div className={`${C.card} p-5`}>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold">Task Overview</h3>
            <span className="text-xs text-gray-400 dark:text-gray-600">{tasks.length} total</span>
          </div>
          <div className="space-y-2.5">
            {taskStats.map(s => {
              const pct = tasks.length ? (s.value / tasks.length) * 100 : 0;
              return (
                <div key={s.label}>
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${s.dot}`} />
                      <span className="text-xs text-gray-500 dark:text-gray-400">{s.label}</span>
                    </div>
                    <span className={`text-sm font-semibold ${s.color}`}>{s.value}</span>
                  </div>
                  <div className="h-1.5 bg-gray-100 dark:bg-[#1a1f2c] rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-700 ${
                        s.label === "Completed" ? "bg-emerald-500" :
                        s.label === "In Progress" ? "bg-blue-500" : "bg-gray-300 dark:bg-gray-700"
                      }`}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Recent Activity */}
        <div className={`${C.card} p-5`}>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold">Recent Activity</h3>
            <span className="text-xs text-gray-400 dark:text-gray-600">{activityLogs.length} entries</span>
          </div>
          {activityLogs.length === 0
            ? <EmptyState title="No activity yet" />
            : (
              <div className="space-y-0">
                {activityLogs.slice(0, 5).map((log, i) => (
                  <div key={log.id} className={`flex gap-3 py-2.5 ${i < 4 ? "border-b border-gray-100 dark:border-[#1a1f2c]" : ""}`}>
                    <div className="flex flex-col items-center gap-1 pt-1">
                      <div className={`w-1.5 h-1.5 rounded-full shrink-0 ${getActivityColor(log.action)}`} />
                      {i < 4 && <div className="w-px flex-1 bg-gray-100 dark:bg-[#1a1f2c]" />}
                    </div>
                    <div className="flex-1 min-w-0 pb-0.5">
                      <p className="text-xs text-gray-600 dark:text-gray-300 leading-snug">{log.action}</p>
                      <p className="text-[11px] mt-0.5 text-gray-400 dark:text-gray-600">
                        {new Date(log.timestamp).toLocaleString("en-IN", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" })}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
        </div>
      </div>

      {/* Employee Ratings */}
      <div className={`${C.card} p-5`}>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-semibold">Employee Ratings</h3>
          <span className="text-xs text-gray-400 dark:text-gray-600">Top performers</span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-5 gap-3">
          {employees.slice(0, 5).map(emp => {
            const r = ratings.find(rt => rt.employeeId === emp.id);
            return (
              <div key={emp.id}
                className="flex flex-col items-center p-3.5 rounded-xl bg-gray-50 dark:bg-[#0d1017] border border-gray-100 dark:border-[#1a1f2c] text-center hover:border-gray-200 dark:hover:border-[#252b38] transition-colors">
                <Avatar name={emp.name} color={emp.avatarColor} size="md" />
                <p className="text-xs font-semibold mt-2.5 truncate w-full">{emp.name}</p>
                <p className="text-[11px] text-gray-400 dark:text-gray-600 truncate w-full">{emp.role}</p>
                <div className="mt-2">
                  {r
                    ? <StarRating value={r.rating} readOnly />
                    : <span className="text-[11px] text-gray-400 dark:text-gray-600">Not rated</span>}
                </div>
                {r && <p className="text-[11px] mt-1 font-semibold text-amber-500">{r.rating}.0</p>}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

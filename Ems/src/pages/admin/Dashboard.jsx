import { useData } from '../../contexts/DataContext';
import { StatCard, Avatar, Badge, StarRating, C } from '../../components/UI';

export function DashboardPage() {
  const { employees, tasks, leaves, activityLogs, ratings, attendance } = useData();
  const total = employees.length;
  const active = employees.filter(e => e.status === "Active").length;
  const onLeave = leaves.filter(l => l.status === "Approved").length;
  const depts = new Set(employees.map(e => e.department)).size;
  const pendingTasks = tasks.filter(t => t.status === "Pending").length;

  const taskStats = [
    { label: "Pending",     value: tasks.filter(t => t.status === "Pending").length,     color: "text-gray-500" },
    { label: "In Progress", value: tasks.filter(t => t.status === "In Progress").length,  color: "text-blue-500" },
    { label: "Completed",   value: tasks.filter(t => t.status === "Completed").length,    color: "text-emerald-500" },
  ];

  const today = new Date().toISOString().split("T")[0];
  const todayAtt = attendance.filter(a => a.date === today);
  const presentToday = todayAtt.filter(a => a.status === "Present").length;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-black">Dashboard</h1>
        <p className={`text-sm mt-0.5 ${C.subtext}`}>Good to have you back, Admin.</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-3">
        <StatCard label="Total Employees" value={total} color="text-violet-500" />
        <StatCard label="Active" value={active} color="text-emerald-500" />
        <StatCard label="On Leave" value={onLeave} color="text-amber-500" />
        <StatCard label="Departments" value={depts} color="text-blue-500" />
        <StatCard label="Present Today" value={presentToday || "—"} color="text-teal-500" />
        <StatCard label="Pending Tasks" value={pendingTasks} color="text-orange-500" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <div className={`${C.card} p-5`}>
          <h3 className="font-bold mb-4">Task Overview</h3>
          <div className="grid grid-cols-3 gap-3">
            {taskStats.map(s => (
              <div key={s.label} className="bg-gray-50 dark:bg-[#161b22] rounded-lg p-3 text-center">
                <p className={`text-2xl font-black ${s.color}`}>{s.value}</p>
                <p className={`text-xs mt-0.5 ${C.muted}`}>{s.label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className={`${C.card} p-5`}>
          <h3 className="font-bold mb-4">Recent Activity</h3>
          <div className="space-y-2.5">
            {activityLogs.slice(0, 5).map(log => (
              <div key={log.id} className="flex gap-3 items-start">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                <div>
                  <p className={`text-xs ${C.subtext}`}>{log.action}</p>
                  <p className={`text-xs mt-0.5 ${C.muted}`}>{new Date(log.timestamp).toLocaleString("en-IN", { day:"numeric", month:"short", hour:"2-digit", minute:"2-digit" })}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className={`${C.card} p-5`}>
        <h3 className="font-bold mb-4">Employee Ratings</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-3">
          {employees.slice(0, 5).map(emp => {
            const r = ratings.find(rt => rt.employeeId === emp.id);
            return (
              <div key={emp.id} className="bg-gray-50 dark:bg-[#161b22] border border-gray-100 dark:border-[#21262d] rounded-xl p-4 text-center">
                <Avatar name={emp.name} color={emp.avatarColor} size="md" />
                <p className={`text-xs font-semibold mt-2 truncate`}>{emp.name}</p>
                <p className={`text-xs truncate ${C.muted}`}>{emp.role}</p>
                <div className="mt-1.5 flex justify-center">
                  {r ? <StarRating value={r.rating} readOnly /> : <span className={`text-xs ${C.muted}`}>Not rated</span>}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

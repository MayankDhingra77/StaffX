import { useAuth } from '../../contexts/AuthContext';
import { useData } from '../../contexts/DataContext';
import { StarRating, Badge, C } from '../../components/UI';

export function PerformancePage() {
  const { user } = useAuth();
  const { employees, ratings, tasks, attendance, leaves } = useData();
  const emp = employees.find(e => e.id === user?.employeeId);
  if (!emp) return null;

  const myRating = ratings.find(r => r.employeeId === emp.id);
  const myTasks = tasks.filter(t => t.assignedTo === emp.id);
  const completed = myTasks.filter(t => t.status === "Completed").length;
  const inProgress = myTasks.filter(t => t.status === "In Progress").length;
  const taskScore = myTasks.length ? ((completed / myTasks.length) * 5).toFixed(1) : null;

  const attRecords = attendance.filter(a => a.employeeId === emp.id);
  const presentDays = attRecords.filter(a => a.status === "Present" || a.status === "WFH").length;
  const halfDays = attRecords.filter(a => a.status === "Half Day").length;
  const absentDays = attRecords.filter(a => a.status === "Absent").length;
  const attScore = attRecords.length ? (((presentDays + halfDays * 0.5) / attRecords.length) * 5).toFixed(1) : null;

  const myLeaves = leaves.filter(l => l.employeeId === emp.id);
  const approvedLeaves = myLeaves.filter(l => l.status === "Approved").length;

  const overallScore = [taskScore, attScore, myRating?.rating].filter(Boolean);
  const overall = overallScore.length ? (overallScore.reduce((a, b) => a + Number(b), 0) / overallScore.length).toFixed(1) : null;

  const metrics = [
    { label: "Tasks Completed", value: `${completed}/${myTasks.length}`, score: taskScore, color: "text-blue-500" },
    { label: "Attendance Score", value: `${presentDays} present days`, score: attScore, color: "text-emerald-500" },
    { label: "Admin Rating", value: myRating ? `${myRating.rating}/5` : "Not yet rated", score: myRating?.rating ?? null, color: "text-amber-500" },
  ];

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="text-2xl font-black">My Performance</h1>
        <p className={`text-sm mt-0.5 ${C.subtext}`}>Your performance overview</p>
      </div>

      {overall && (
        <div className={`${C.card} p-6 text-center`}>
          <p className={`text-sm font-semibold ${C.subtext} mb-2`}>Overall Score</p>
          <p className="text-5xl font-black text-emerald-500">{overall}</p>
          <p className={`text-sm ${C.muted} mb-3`}>out of 5.0</p>
          <StarRating value={Math.round(overall)} readOnly />
        </div>
      )}

      <div className="grid grid-cols-1 gap-4">
        {metrics.map(m => (
          <div key={m.label} className={`${C.card} p-5`}>
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold">{m.label}</h3>
              {m.score && <span className={`text-lg font-black ${m.color}`}>{m.score}★</span>}
            </div>
            <p className={`text-sm ${C.subtext}`}>{m.value}</p>
            {m.score && (
              <div className="mt-3 h-2 bg-gray-100 dark:bg-[#21262d] rounded-full overflow-hidden">
                <div className="h-full bg-emerald-500 rounded-full transition-all" style={{ width: `${(m.score / 5) * 100}%` }} />
              </div>
            )}
          </div>
        ))}
      </div>

      <div className={`${C.card} p-5`}>
        <h3 className="font-bold mb-4">Attendance Breakdown</h3>
        <div className="grid grid-cols-4 gap-3 text-center">
          {[["Present", presentDays, "text-emerald-500"], ["Half Day", halfDays, "text-amber-500"], ["Absent", absentDays, "text-red-500"], ["Total", attRecords.length, "text-blue-500"]].map(([l, v, c]) => (
            <div key={l} className="bg-gray-50 dark:bg-[#161b22] rounded-lg p-3">
              <p className={`text-xl font-black ${c}`}>{v}</p>
              <p className={`text-xs mt-0.5 ${C.muted}`}>{l}</p>
            </div>
          ))}
        </div>
      </div>

      <div className={`${C.card} p-5`}>
        <h3 className="font-bold mb-4">Task History</h3>
        {myTasks.length === 0 ? <p className={`text-sm ${C.muted}`}>No tasks assigned yet.</p> : (
          <div className="space-y-2">
            {myTasks.map(task => (
              <div key={task.id} className={`flex items-center justify-between py-2 border-b ${C.divider} last:border-0`}>
                <div>
                  <p className="text-sm font-medium">{task.title}</p>
                  <p className={`text-xs ${C.muted}`}>Due: {task.dueDate}</p>
                </div>
                <Badge className={task.status === "Completed" ? "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400" : task.status === "In Progress" ? "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400" : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400"}>
                  {task.status}
                </Badge>
              </div>
            ))}
          </div>
        )}
      </div>

      {myRating?.note && (
        <div className={`${C.card} p-5`}>
          <h3 className="font-bold mb-2">Admin Feedback</h3>
          <p className={`text-sm ${C.subtext}`}>{myRating.note}</p>
        </div>
      )}
    </div>
  );
}

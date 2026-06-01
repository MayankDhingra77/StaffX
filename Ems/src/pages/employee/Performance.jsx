import { useAuth } from '../../contexts/AuthContext';
import { useData } from '../../contexts/DataContext';
import { StarRating, Badge, PageHeader, C } from '../../components/UI';

const STATUS_COLOR = {
  Completed:    "bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400 border border-emerald-100 dark:border-emerald-900/40",
  "In Progress":"bg-blue-50 dark:bg-blue-950/30 text-blue-600 dark:text-blue-400 border border-blue-100 dark:border-blue-900/40",
  Pending:      "bg-gray-100 dark:bg-[#1a1f2c] text-gray-500 dark:text-gray-400 border border-gray-200 dark:border-[#252b38]",
  Cancelled:    "bg-red-50 dark:bg-red-950/30 text-red-500 dark:text-red-400 border border-red-100 dark:border-red-900/40",
};

export function PerformancePage() {
  const { user } = useAuth();
  const { employees, ratings, tasks, attendance, leaves } = useData();
  const emp = employees.find(e => e.id === user?.employeeId || e._id === user?.employeeId);
  if (!emp) return null;

  const myRating = ratings.find(r => r.employeeId === emp.id);
  const myTasks = tasks.filter(t => t.assignedTo === emp.id);
  const completed = myTasks.filter(t => t.status === "Completed").length;
  const taskScore = myTasks.length ? ((completed / myTasks.length) * 5).toFixed(1) : null;

  const attRecords = attendance.filter(a => a.employeeId === emp.id);
  const presentDays = attRecords.filter(a => a.status === "Present" || a.status === "WFH").length;
  const halfDays = attRecords.filter(a => a.status === "Half Day").length;
  const absentDays = attRecords.filter(a => a.status === "Absent").length;
  const attScore = attRecords.length ? (((presentDays + halfDays * 0.5) / attRecords.length) * 5).toFixed(1) : null;

  const overallScore = [taskScore, attScore, myRating?.rating].filter(Boolean);
  const overall = overallScore.length
    ? (overallScore.reduce((a, b) => a + Number(b), 0) / overallScore.length).toFixed(1)
    : null;

  const metrics = [
    { label: "Task Completion",  sub: `${completed} of ${myTasks.length} tasks done`,    score: taskScore, color: "bg-blue-500",    textColor: "text-blue-600 dark:text-blue-400" },
    { label: "Attendance",       sub: `${presentDays} present, ${absentDays} absent`,      score: attScore,  color: "bg-emerald-500", textColor: "text-emerald-600 dark:text-emerald-400" },
    { label: "Manager Rating",   sub: myRating ? `Rated by admin` : "Not yet rated",        score: myRating?.rating ?? null, color: "bg-amber-500", textColor: "text-amber-600 dark:text-amber-400" },
  ];

  return (
    <div className="space-y-4 max-w-2xl animate-fade-in-up">
      <PageHeader
        title="My Performance"
        subtitle="Your performance overview"
      />

      {/* Overall score card */}
      {overall && (
        <div className={`${C.card} p-6`}>
          <div className="flex items-center gap-6">
            <div className="relative w-20 h-20 shrink-0">
              <svg viewBox="0 0 36 36" className="w-20 h-20 -rotate-90">
                <circle cx="18" cy="18" r="15.9" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-gray-100 dark:text-[#1a1f2c]" />
                <circle cx="18" cy="18" r="15.9" fill="none" stroke="currentColor" strokeWidth="2.5"
                  className="text-emerald-500"
                  strokeDasharray={`${(Number(overall) / 5) * 100} 100`}
                  strokeLinecap="round" />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-xl font-bold">{overall}</span>
              </div>
            </div>
            <div>
              <p className="text-sm font-semibold">Overall Score</p>
              <p className="text-xs text-gray-400 dark:text-gray-600 mt-0.5">Based on tasks, attendance & rating</p>
              <div className="mt-2">
                <StarRating value={Math.round(overall)} readOnly />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Metrics */}
      <div className="grid grid-cols-1 gap-3">
        {metrics.map(m => (
          <div key={m.label} className={`${C.card} p-4`}>
            <div className="flex items-center justify-between mb-2">
              <div>
                <h3 className="text-sm font-semibold">{m.label}</h3>
                <p className="text-xs text-gray-400 dark:text-gray-600 mt-0.5">{m.sub}</p>
              </div>
              {m.score && (
                <span className={`text-lg font-bold ${m.textColor}`}>{m.score}★</span>
              )}
            </div>
            {m.score ? (
              <div className="mt-2">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[11px] text-gray-400 dark:text-gray-600">Score</span>
                  <span className="text-[11px] text-gray-400 dark:text-gray-600">{m.score}/5</span>
                </div>
                <div className="h-1.5 bg-gray-100 dark:bg-[#1a1f2c] rounded-full overflow-hidden">
                  <div className={`h-full ${m.color} rounded-full transition-all duration-700`}
                    style={{ width: `${(m.score / 5) * 100}%` }} />
                </div>
              </div>
            ) : (
              <div className="h-1.5 bg-gray-100 dark:bg-[#1a1f2c] rounded-full" />
            )}
          </div>
        ))}
      </div>

      {/* Attendance breakdown */}
      <div className={`${C.card} p-5`}>
        <h3 className="text-sm font-semibold mb-4">Attendance Breakdown</h3>
        <div className="grid grid-cols-4 gap-2 text-center">
          {[["Present", presentDays, "text-emerald-600 dark:text-emerald-400"],
            ["Half Day", halfDays, "text-amber-600 dark:text-amber-400"],
            ["Absent", absentDays, "text-red-600 dark:text-red-400"],
            ["Total", attRecords.length, "text-blue-600 dark:text-blue-400"]].map(([l, v, c]) => (
            <div key={l} className="bg-gray-50 dark:bg-[#0d1017] border border-gray-100 dark:border-[#1a1f2c] rounded-lg p-3">
              <p className={`text-xl font-bold ${c}`}>{v}</p>
              <p className="text-[11px] mt-0.5 text-gray-400 dark:text-gray-600">{l}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Task history */}
      <div className={`${C.card} p-5`}>
        <h3 className="text-sm font-semibold mb-4">Task History</h3>
        {myTasks.length === 0
          ? <p className="text-sm text-gray-400 dark:text-gray-600">No tasks assigned yet.</p>
          : (
            <div className="space-y-0">
              {myTasks.map((task, i) => (
                <div key={task.id}
                  className={`flex items-center justify-between py-2.5 ${i < myTasks.length - 1 ? "border-b border-gray-100 dark:border-[#1a1f2c]" : ""}`}>
                  <div>
                    <p className="text-sm font-medium">{task.title}</p>
                    <p className="text-[11px] mt-0.5 text-gray-400 dark:text-gray-600">Due: {task.dueDate}</p>
                  </div>
                  <Badge className={STATUS_COLOR[task.status] ?? "bg-gray-100 text-gray-500"}>
                    {task.status}
                  </Badge>
                </div>
              ))}
            </div>
          )}
      </div>

      {/* Admin feedback */}
      {myRating?.note && (
        <div className={`${C.card} p-5`}>
          <h3 className="text-sm font-semibold mb-2">Manager Feedback</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{myRating.note}</p>
        </div>
      )}
    </div>
  );
}

import { useAuth } from '../../contexts/AuthContext';
import { useData } from '../../contexts/DataContext';
import { StatCard, Avatar, Badge, StarRating, C } from '../../components/UI';
import { formatCurrency } from '../../utils/data';

export function EmployeePortalPage() {
  const { user } = useAuth();
  const { employees, leaves, ratings, attendance, tasks } = useData();
  const emp = employees.find(e => e.id === user?.employeeId);

  if (!emp) return (
    <div className="text-center py-20">
      <p className={`text-lg font-bold`}>Profile not linked</p>
      <p className={`text-sm mt-1 ${C.subtext}`}>Your email was not matched to an employee record.</p>
    </div>
  );

  const myLeaves = leaves.filter(l => l.employeeId === emp.id);
  const approved = myLeaves.filter(l => l.status === "Approved").length;
  const pending  = myLeaves.filter(l => l.status === "Pending").length;
  const myRating = ratings.find(r => r.employeeId === emp.id);
  const myTasks = tasks.filter(t => t.assignedTo === emp.id);
  const completedTasks = myTasks.filter(t => t.status === "Completed").length;
  const presentDays = attendance.filter(a => a.employeeId === emp.id && (a.status === "Present" || a.status === "WFH")).length;

  return (
    <div className="space-y-6 max-w-3xl">
      <div className={`bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-900/15 dark:via-emerald-900/5 dark:to-transparent border border-emerald-200 dark:border-emerald-900/30 rounded-2xl p-6 flex items-center gap-5`}>
        <Avatar name={emp.name} color={emp.avatarColor} size="lg" />
        <div className="flex-1 min-w-0">
          <h2 className="text-xl font-black">{emp.name}</h2>
          <p className={`text-sm ${C.subtext}`}>{emp.role} · {emp.department}</p>
          <p className={`text-xs mt-0.5 ${C.muted}`}>{emp.email}</p>
        </div>
        <div className="hidden sm:block text-right">
          <p className={`text-xs ${C.muted}`}>Employee ID</p>
          <p className="font-mono text-sm font-bold">{emp.id}</p>
          <p className={`text-xs ${C.muted} mt-1`}>Salary</p>
          <p className="font-bold text-sm text-emerald-600 dark:text-emerald-400">{formatCurrency(emp.salary)}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <StatCard label="Approved Leaves" value={approved} color="text-emerald-500" />
        <StatCard label="Pending Leaves" value={pending} color="text-amber-500" />
        <StatCard label="Tasks Done" value={`${completedTasks}/${myTasks.length}`} color="text-blue-500" />
        <StatCard label="Present Days" value={presentDays} color="text-violet-500" />
      </div>

      {myRating && (
        <div className={`${C.card} p-5`}>
          <h3 className="font-bold mb-3">My Performance Rating</h3>
          <StarRating value={myRating.rating} readOnly />
          {myRating.note && <p className={`text-sm mt-2 ${C.subtext}`}>{myRating.note}</p>}
          <p className={`text-xs mt-2 ${C.muted}`}>Last updated: {new Date(myRating.updatedAt).toLocaleDateString("en-IN")}</p>
        </div>
      )}

      <div className={`${C.card} p-5`}>
        <h3 className="font-bold mb-4">Recent Leave History</h3>
        {myLeaves.length === 0 ? <p className={`text-sm ${C.muted}`}>No leave requests yet.</p> : (
          <div className="space-y-2">
            {myLeaves.map(leave => (
              <div key={leave.id} className={`flex items-center justify-between py-2 border-b ${C.divider} last:border-0`}>
                <div>
                  <p className="text-sm font-medium">{leave.type} Leave</p>
                  <p className={`text-xs mt-0.5 ${C.muted}`}>{leave.startDate} → {leave.endDate} · {leave.reason}</p>
                </div>
                <Badge className={leave.status === "Approved" ? "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400" : leave.status === "Rejected" ? "bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400" : "bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400"}>
                  {leave.status}
                </Badge>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

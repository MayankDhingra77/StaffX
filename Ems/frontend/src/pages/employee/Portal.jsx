import { useAuth } from '../../contexts/AuthContext';
import { useData } from '../../contexts/DataContext';
import { Avatar, Badge, StarRating, EmptyState, C } from '../../components/UI';
import { formatCurrency } from '../../utils/data';
import { MdWork, MdEmail, MdPhone, MdCalendarToday } from 'react-icons/md';

const STATUS_COLOR = {
  Pending:  'bg-amber-50 dark:bg-amber-950/30 text-amber-600 dark:text-amber-400 border border-amber-100 dark:border-amber-900/40',
  Approved: 'bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400 border border-emerald-100 dark:border-emerald-900/40',
  Rejected: 'bg-red-50 dark:bg-red-950/30 text-red-600 dark:text-red-400 border border-red-100 dark:border-red-900/40',
};

export function EmployeePortalPage() {
  const { user } = useAuth();
  const { employees, leaves, ratings, attendance, tasks } = useData();

  const emp = employees.find(e =>
    e.id === user?.employeeId ||
    e._id === user?.employeeId ||
    e.id === user?.employeeId?.toString()
  );

  if (!emp) return (
    <div className="flex flex-col items-center justify-center py-24">
      <p className="text-base font-semibold">Profile not linked</p>
      <p className="text-sm mt-1 text-gray-500 dark:text-gray-400">Your account is not matched to an employee record.</p>
    </div>
  );

  const myLeaves = leaves.filter(l => l.employeeId === emp.id);
  const approved = myLeaves.filter(l => l.status === 'Approved').length;
  const pending  = myLeaves.filter(l => l.status === 'Pending').length;
  const myRating = ratings.find(r => r.employeeId === emp.id);
  const myTasks  = tasks.filter(t => t.assignedTo === emp.id);
  const completedTasks = myTasks.filter(t => t.status === 'Completed').length;
  const presentDays = attendance.filter(a => a.employeeId === emp.id && (a.status === 'Present' || a.status === 'WFH')).length;

  const stats = [
    { label: 'Approved Leaves', value: approved,  color: 'text-emerald-600 dark:text-emerald-400' },
    { label: 'Pending Leaves',  value: pending,   color: 'text-amber-600 dark:text-amber-400' },
    { label: 'Tasks Done',      value: `${completedTasks}/${myTasks.length}`, color: 'text-blue-600 dark:text-blue-400' },
    { label: 'Days Present',    value: presentDays, color: 'text-violet-600 dark:text-violet-400' },
  ];

  return (
    <div className="space-y-4 max-w-3xl animate-fade-in-up">
      <div className="bg-white dark:bg-[#111318] border border-gray-200/80 dark:border-[#1e2432] rounded-xl overflow-hidden shadow-sm">
        <div className="h-16 bg-gradient-to-r from-emerald-600/10 via-teal-500/10 to-transparent dark:from-emerald-900/30 dark:via-teal-900/15 dark:to-transparent" />
        <div className="px-5 pb-5 -mt-6">
          <div className="flex items-end gap-4">
            <div className="ring-4 ring-white dark:ring-[#111318] rounded-full">
              <Avatar name={emp.name} color={emp.avatarColor} size="xl" />
            </div>
            <div className="flex-1 pb-1">
              <h2 className="text-lg font-semibold">{emp.name}</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">{emp.role} · {emp.department}</p>
            </div>
            <div className="hidden sm:block pb-1 text-right">
              <p className="text-xs text-gray-400 dark:text-gray-600">Salary</p>
              <p className="text-sm font-semibold text-emerald-600 dark:text-emerald-400">{formatCurrency(emp.salary)}</p>
            </div>
          </div>
          <div className="mt-4 flex flex-wrap gap-3">
            <div className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400">
              <MdEmail size={13} className="text-gray-400 dark:text-gray-600" />{emp.email}
            </div>
            {emp.phone && (
              <div className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400">
                <MdPhone size={13} className="text-gray-400 dark:text-gray-600" />{emp.phone}
              </div>
            )}
            <div className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400">
              <MdCalendarToday size={13} className="text-gray-400 dark:text-gray-600" />Joined {emp.joiningDate}
            </div>
            <div className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400">
              <MdWork size={13} className="text-gray-400 dark:text-gray-600" />{emp.employeeCode || emp.id}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 stagger">
        {stats.map(s => (
          <div key={s.label} className={`${C.card} p-4`}>
            <p className="text-[11px] font-medium uppercase tracking-wide text-gray-400 dark:text-gray-600">{s.label}</p>
            <p className={`text-2xl font-bold mt-1.5 ${s.color}`}>{s.value}</p>
          </div>
        ))}
      </div>

      {myRating && (
        <div className={`${C.card} p-5`}>
          <h3 className="text-sm font-semibold mb-3">Performance Rating</h3>
          <div className="flex items-center gap-4">
            <div className="text-center">
              <p className="text-3xl font-bold text-amber-500">{myRating.rating}.0</p>
              <p className="text-[11px] text-gray-400 dark:text-gray-600">out of 5</p>
            </div>
            <div>
              <StarRating value={myRating.rating} readOnly />
              {myRating.note && <p className="text-sm mt-2 text-gray-500 dark:text-gray-400">{myRating.note}</p>}
              <p className="text-[11px] mt-1.5 text-gray-400 dark:text-gray-600">
                Updated {new Date(myRating.updatedAt).toLocaleDateString('en-IN')}
              </p>
            </div>
          </div>
        </div>
      )}

      <div className={`${C.card} p-5`}>
        <h3 className="text-sm font-semibold mb-4">Leave History</h3>
        {myLeaves.length === 0
          ? <EmptyState title="No leave requests yet" />
          : (
            <div className="space-y-0">
              {myLeaves.map((leave, i) => (
                <div key={leave.id}
                  className={`flex items-center justify-between py-2.5 ${i < myLeaves.length - 1 ? 'border-b border-gray-100 dark:border-[#1a1f2c]' : ''}`}>
                  <div>
                    <p className="text-sm font-medium">{leave.type} Leave</p>
                    <p className="text-[11px] mt-0.5 text-gray-400 dark:text-gray-600">
                      {leave.startDate} → {leave.endDate} · {leave.reason}
                    </p>
                  </div>
                  <Badge className={STATUS_COLOR[leave.status]}>
                    <span className={`w-1.5 h-1.5 rounded-full ${
                      leave.status === 'Approved' ? 'bg-emerald-500' :
                      leave.status === 'Rejected' ? 'bg-red-500' : 'bg-amber-500'
                    }`} />
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

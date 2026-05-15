import { useData } from '../../contexts/DataContext';
import { Btn, Badge, Avatar, C } from '../../components/UI';

const STATUS_COLOR = { Pending:"bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400", Approved:"bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400", Rejected:"bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400" };

export function LeavesPage({ toast }) {
  const { leaves, employees, updateLeaveStatus } = useData();

  function action(id, status) {
    updateLeaveStatus(id, status);
    toast(`Leave ${status.toLowerCase()}`);
  }

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-black">Leave Requests</h1>
        <p className={`text-sm mt-0.5 ${C.subtext}`}>{leaves.filter(l => l.status === "Pending").length} pending</p>
      </div>

      <div className={`${C.card} overflow-hidden`}>
        <table className="w-full">
          <thead>
            <tr className={`border-b ${C.divider}`}>
              {["Employee","Type","Period","Reason","Status","Actions"].map(h => (
                <th key={h} className={`text-left text-xs font-semibold px-4 py-3 ${C.subtext}`}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {leaves.map(leave => {
              const emp = employees.find(e => e.id === leave.employeeId);
              return (
                <tr key={leave.id} className={`border-b ${C.divider} ${C.rowHover} last:border-0`}>
                  <td className="px-4 py-3">
                    {emp ? (
                      <div className="flex items-center gap-2.5">
                        <Avatar name={emp.name} color={emp.avatarColor} size="sm" />
                        <div>
                          <p className="text-sm font-medium">{emp.name}</p>
                          <p className={`text-xs ${C.muted}`}>{emp.department}</p>
                        </div>
                      </div>
                    ) : <span className={`text-sm ${C.muted}`}>{leave.employeeId}</span>}
                  </td>
                  <td className="px-4 py-3"><p className={`text-sm ${C.subtext}`}>{leave.type}</p></td>
                  <td className="px-4 py-3">
                    <p className="text-sm font-medium">{leave.startDate}</p>
                    <p className={`text-xs ${C.muted}`}>to {leave.endDate}</p>
                  </td>
                  <td className="px-4 py-3"><p className={`text-sm ${C.subtext} max-w-[200px] truncate`}>{leave.reason}</p></td>
                  <td className="px-4 py-3"><Badge className={STATUS_COLOR[leave.status]}>{leave.status}</Badge></td>
                  <td className="px-4 py-3">
                    {leave.status === "Pending" && (
                      <div className="flex gap-1">
                        <Btn size="sm" variant="primary" onClick={() => action(leave.id, "Approved")}>Approve</Btn>
                        <Btn size="sm" variant="danger" onClick={() => action(leave.id, "Rejected")}>✕ Reject</Btn>
                      </div>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {leaves.length === 0 && <p className={`text-sm text-center py-10 ${C.muted}`}>No leave requests.</p>}
      </div>
    </div>
  );
}

import { useAuth } from '../../contexts/AuthContext';
import { useData } from '../../contexts/DataContext';
import { Badge, Btn, Select, C } from '../../components/UI';

const STATUS_COLOR = { Pending:"bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400", "In Progress":"bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400", Completed:"bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400", Cancelled:"bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400" };
const PRIORITY_COLOR = { Low:"bg-gray-100 dark:bg-gray-800 text-gray-500", Medium:"bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400", High:"bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400", Critical:"bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400" };
const STATUSES = ["Pending","In Progress","Completed","Cancelled"];

export function MyTasksPage({ toast }) {
  const { user } = useAuth();
  const { tasks, setTaskStatus } = useData();
  const myTasks = tasks.filter(t => t.assignedTo === user?.employeeId);

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-black">My Tasks</h1>
        <p className={`text-sm mt-0.5 ${C.subtext}`}>{myTasks.length} assigned</p>
      </div>
      <div className={`${C.card} overflow-hidden`}>
        <table className="w-full">
          <thead>
            <tr className={`border-b ${C.divider}`}>
              {["Task","Priority","Status","Due Date","Update Status"].map(h => (
                <th key={h} className={`text-left text-xs font-semibold px-4 py-3 ${C.subtext}`}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {myTasks.map(task => (
              <tr key={task.id} className={`border-b ${C.divider} ${C.rowHover} last:border-0`}>
                <td className="px-4 py-3">
                  <p className="text-sm font-medium">{task.title}</p>
                  <p className={`text-xs mt-0.5 ${C.muted}`}>{task.description}</p>
                </td>
                <td className="px-4 py-3"><Badge className={PRIORITY_COLOR[task.priority]}>{task.priority}</Badge></td>
                <td className="px-4 py-3"><Badge className={STATUS_COLOR[task.status]}>{task.status}</Badge></td>
                <td className="px-4 py-3"><p className={`text-sm ${C.subtext}`}>{task.dueDate}</p></td>
                <td className="px-4 py-3">
                  <Select value={task.status} onChange={v => { setTaskStatus(task.id, v); toast(`Task status updated to ${v}`); }} options={STATUSES} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {myTasks.length === 0 && <p className={`text-sm text-center py-10 ${C.muted}`}>No tasks assigned to you.</p>}
      </div>
    </div>
  );
}

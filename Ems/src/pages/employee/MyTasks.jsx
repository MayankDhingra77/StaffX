import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useData } from '../../contexts/DataContext';
import { Badge, Select, EmptyState, PageHeader, C } from '../../components/UI';

const STATUS_COLOR = {
  Pending:       'bg-gray-100 dark:bg-[#1a1f2c] text-gray-500 dark:text-gray-400 border border-gray-200 dark:border-[#252b38]',
  'In Progress': 'bg-blue-50 dark:bg-blue-950/30 text-blue-600 dark:text-blue-400 border border-blue-100 dark:border-blue-900/40',
  Completed:     'bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400 border border-emerald-100 dark:border-emerald-900/40',
  Cancelled:     'bg-red-50 dark:bg-red-950/30 text-red-600 dark:text-red-400 border border-red-100 dark:border-red-900/40',
};
const PRIORITY_COLOR = {
  Low:      'bg-gray-100 dark:bg-[#1a1f2c] text-gray-500 dark:text-gray-500 border border-gray-200 dark:border-[#252b38]',
  Medium:   'bg-blue-50 dark:bg-blue-950/30 text-blue-600 dark:text-blue-400 border border-blue-100 dark:border-blue-900/40',
  High:     'bg-amber-50 dark:bg-amber-950/30 text-amber-600 dark:text-amber-400 border border-amber-100 dark:border-amber-900/40',
  Critical: 'bg-red-50 dark:bg-red-950/30 text-red-600 dark:text-red-400 border border-red-100 dark:border-red-900/40',
};
const STATUSES = ['Pending','In Progress','Completed','Cancelled'];

export function MyTasksPage({ toast }) {
  const { user } = useAuth();
  const { tasks, employees, setTaskStatus } = useData();
  const [updating, setUpdating] = useState(null);

  // Match by employeeId from API
  const emp = employees.find(e => e.id === user?.employeeId || e._id === user?.employeeId);
  const myTasks = tasks.filter(t => emp && t.assignedTo === emp.id);

  async function handleStatusChange(taskId, newStatus) {
    setUpdating(taskId);
    try {
      await setTaskStatus(taskId, newStatus);
      toast(`Status updated to ${newStatus}`);
    } catch (err) {
      toast(err.response?.data?.message || 'Failed to update status', 'error');
    } finally {
      setUpdating(null);
    }
  }

  return (
    <div className="space-y-4 animate-fade-in-up">
      <PageHeader title="My Tasks" subtitle={`${myTasks.length} assigned to you`} />

      <div className={`${C.card} overflow-hidden`}>
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-100 dark:border-[#1a1f2c] bg-gray-50/50 dark:bg-[#0d1017]">
              {['Task','Priority','Status','Due Date','Update Status'].map(h => (
                <th key={h} className="text-left text-[11px] font-semibold px-4 py-3 text-gray-400 dark:text-gray-600 uppercase tracking-wide">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {myTasks.map(task => {
              const isOverdue = task.status !== 'Completed' && task.dueDate < new Date().toISOString().split('T')[0];
              return (
                <tr key={task.id} className={`border-b border-gray-50 dark:border-[#1a1f2c] ${C.rowHover} last:border-0`}>
                  <td className="px-4 py-3">
                    <p className="text-sm font-medium">{task.title}</p>
                    <p className="text-[11px] mt-0.5 text-gray-400 dark:text-gray-600 max-w-[200px] truncate">{task.description}</p>
                  </td>
                  <td className="px-4 py-3"><Badge className={PRIORITY_COLOR[task.priority]}>{task.priority}</Badge></td>
                  <td className="px-4 py-3"><Badge className={STATUS_COLOR[task.status]}>{task.status}</Badge></td>
                  <td className="px-4 py-3">
                    <p className={`text-sm ${isOverdue ? 'text-red-500 font-medium' : 'text-gray-500 dark:text-gray-400'}`}>{task.dueDate}</p>
                    {isOverdue && <p className="text-[10px] text-red-400">Overdue</p>}
                  </td>
                  <td className="px-4 py-3 min-w-[150px]">
                    <Select
                      value={task.status}
                      onChange={v => handleStatusChange(task.id, v)}
                      options={STATUSES}
                      disabled={updating === task.id}
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {myTasks.length === 0 && <EmptyState icon="✅" title="No tasks assigned" description="You're all caught up!" />}
      </div>
    </div>
  );
}

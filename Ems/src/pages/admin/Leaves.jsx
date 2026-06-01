import { useState, useMemo } from 'react';
import { useData } from '../../contexts/DataContext';
import { Avatar, Badge, Btn, EmptyState, PageHeader, C } from '../../components/UI';
import { MdCheckCircle, MdCancel } from 'react-icons/md';

const STATUS_COLOR = {
  Pending:   'bg-amber-50 dark:bg-amber-950/30 text-amber-600 dark:text-amber-400 border border-amber-100 dark:border-amber-900/40',
  Approved:  'bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400 border border-emerald-100 dark:border-emerald-900/40',
  Rejected:  'bg-red-50 dark:bg-red-950/30 text-red-600 dark:text-red-400 border border-red-100 dark:border-red-900/40',
  Cancelled: 'bg-gray-100 dark:bg-[#1a1f2c] text-gray-500 dark:text-gray-400 border border-gray-200 dark:border-[#252b38]',
};

export function LeavesPage({ toast }) {
  const { leaves, employees, updateLeaveStatus } = useData();
  const [filterStatus, setFilterStatus] = useState('All');
  const [updating, setUpdating] = useState(null);

  function getEmployee(id) {
    if (!id) return null;
    const idStr = id?._id?.toString() || id?.toString?.() || id;
    return employees.find(e => e.id === idStr || e._id === idStr);
  }

  const filtered = useMemo(() => {
    if (filterStatus === 'All') return leaves;
    return leaves.filter(l => l.status === filterStatus);
  }, [leaves, filterStatus]);

  async function handleAction(leaveId, status) {
    setUpdating(leaveId + status);
    try {
      await updateLeaveStatus(leaveId, status);
      toast(`Leave ${status.toLowerCase()}`);
    } catch (err) {
      toast(err.response?.data?.message || 'Action failed', 'error');
    } finally { setUpdating(null); }
  }

  return (
    <div className="space-y-4 animate-fade-in-up">
      <PageHeader title="Leave Requests" subtitle={`${leaves.filter(l => l.status === 'Pending').length} pending`} />

      <div className="flex gap-1.5 flex-wrap">
        {['All','Pending','Approved','Rejected','Cancelled'].map(s => (
          <button key={s} onClick={() => setFilterStatus(s)}
            className={`px-3 py-1 rounded-lg text-xs font-medium transition-all border ${
              filterStatus === s
                ? 'bg-emerald-600 text-white border-transparent shadow-sm'
                : 'bg-white dark:bg-[#111318] border-gray-200 dark:border-[#1e2432] text-gray-500 dark:text-gray-400 hover:border-gray-300 dark:hover:border-[#252b38]'
            }`}>
            {s} ({s === 'All' ? leaves.length : leaves.filter(l => l.status === s).length})
          </button>
        ))}
      </div>

      <div className={`${C.card} overflow-hidden`}>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100 dark:border-[#1a1f2c] bg-gray-50/50 dark:bg-[#0d1017]">
                {['Employee','Leave Type','Period','Reason','Applied On','Status','Actions'].map(h => (
                  <th key={h} className="text-left text-[11px] font-semibold px-4 py-3 text-gray-400 dark:text-gray-600 uppercase tracking-wide whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map(leave => {
                const emp = getEmployee(leave.employeeId);
                const start = new Date(leave.startDate);
                const end   = new Date(leave.endDate);
                const days  = Math.round((end - start) / 86400000) + 1;
                return (
                  <tr key={leave.id} className={`border-b border-gray-50 dark:border-[#1a1f2c] ${C.rowHover} last:border-0`}>
                    <td className="px-4 py-3">
                      {emp ? (
                        <div className="flex items-center gap-2.5">
                          <Avatar name={emp.name} color={emp.avatarColor} size="sm" />
                          <div>
                            <p className="text-sm font-medium">{emp.name}</p>
                            <p className="text-[11px] text-gray-400 dark:text-gray-600">{emp.department}</p>
                          </div>
                        </div>
                      ) : <span className="text-xs text-gray-400">{leave.employeeId}</span>}
                    </td>
                    <td className="px-4 py-3">
                      <Badge className="bg-violet-50 dark:bg-violet-950/30 text-violet-600 dark:text-violet-400 border border-violet-100 dark:border-violet-900/40">{leave.type}</Badge>
                    </td>
                    <td className="px-4 py-3">
                      <p className="text-sm">{leave.startDate}</p>
                      <p className="text-[11px] text-gray-400 dark:text-gray-600">to {leave.endDate} · {days}d</p>
                    </td>
                    <td className="px-4 py-3 max-w-[180px]">
                      <p className="text-sm text-gray-600 dark:text-gray-400 truncate">{leave.reason || '—'}</p>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-500 dark:text-gray-400">{leave.appliedOn}</td>
                    <td className="px-4 py-3">
                      <Badge className={STATUS_COLOR[leave.status]}>
                        <span className={`w-1.5 h-1.5 rounded-full ${
                          leave.status === 'Approved' ? 'bg-emerald-500' :
                          leave.status === 'Pending'  ? 'bg-amber-500' :
                          leave.status === 'Rejected' ? 'bg-red-500' : 'bg-gray-400'
                        }`} />
                        {leave.status}
                      </Badge>
                    </td>
                    <td className="px-4 py-3">
                      {leave.status === 'Pending' && (
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => handleAction(leave.id, 'Approved')}
                            disabled={!!updating}
                            className="flex items-center gap-1 px-2 py-1 text-[11px] font-medium rounded-md bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400 border border-emerald-100 dark:border-emerald-900/40 hover:bg-emerald-100 dark:hover:bg-emerald-900/40 transition-colors disabled:opacity-50">
                            <MdCheckCircle size={12} /> Approve
                          </button>
                          <button
                            onClick={() => handleAction(leave.id, 'Rejected')}
                            disabled={!!updating}
                            className="flex items-center gap-1 px-2 py-1 text-[11px] font-medium rounded-md bg-red-50 dark:bg-red-950/30 text-red-600 dark:text-red-400 border border-red-100 dark:border-red-900/40 hover:bg-red-100 dark:hover:bg-red-900/40 transition-colors disabled:opacity-50">
                            <MdCancel size={12} /> Reject
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        {filtered.length === 0 && <EmptyState icon="📅" title="No leave requests" description="Leave requests will appear here" />}
      </div>
    </div>
  );
}

import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useData } from '../../contexts/DataContext';
import { Input, Btn, Modal, Badge, Select, Textarea, C } from '../../components/UI';

const STATUS_COLOR = { Pending:"bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400", Approved:"bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400", Rejected:"bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400" };
const EMPTY = { type:"Casual", startDate:"", endDate:"", reason:"" };

export function MyLeavesPage({ toast }) {
  const { user } = useAuth();
  const { leaves, addLeave } = useData();
  const myLeaves = leaves.filter(l => l.employeeId === user?.employeeId);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState(EMPTY);
  const f = (k, v) => setForm(p => ({ ...p, [k]: v }));

  function handleSubmit(e) {
    e.preventDefault();
    addLeave({ ...form, employeeId: user.employeeId });
    toast("Leave request submitted");
    setOpen(false);
    setForm(EMPTY);
  }

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black">My Leaves</h1>
          <p className={`text-sm mt-0.5 ${C.subtext}`}>{myLeaves.length} requests</p>
        </div>
        <Btn onClick={() => setOpen(true)}>+ Apply Leave</Btn>
      </div>

      <div className={`${C.card} overflow-hidden`}>
        <table className="w-full">
          <thead>
            <tr className={`border-b ${C.divider}`}>
              {["Type","Period","Reason","Applied On","Status"].map(h => (
                <th key={h} className={`text-left text-xs font-semibold px-4 py-3 ${C.subtext}`}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {myLeaves.map(leave => (
              <tr key={leave.id} className={`border-b ${C.divider} ${C.rowHover} last:border-0`}>
                <td className="px-4 py-3"><p className="text-sm font-medium">{leave.type}</p></td>
                <td className="px-4 py-3">
                  <p className="text-sm">{leave.startDate}</p>
                  <p className={`text-xs ${C.muted}`}>to {leave.endDate}</p>
                </td>
                <td className="px-4 py-3"><p className={`text-sm ${C.subtext}`}>{leave.reason}</p></td>
                <td className="px-4 py-3"><p className={`text-sm ${C.subtext}`}>{leave.appliedOn}</p></td>
                <td className="px-4 py-3"><Badge className={STATUS_COLOR[leave.status]}>{leave.status}</Badge></td>
              </tr>
            ))}
          </tbody>
        </table>
        {myLeaves.length === 0 && <p className={`text-sm text-center py-10 ${C.muted}`}>No leave requests yet.</p>}
      </div>

      <Modal open={open} onClose={() => setOpen(false)} title="Apply for Leave" maxWidth="max-w-sm">
        <form onSubmit={handleSubmit} className="space-y-3">
          <Select label="Leave Type" value={form.type} onChange={v => f("type", v)} options={["Casual","Sick","Annual","Unpaid"]} />
          <Input label="Start Date" type="date" value={form.startDate} onChange={e => f("startDate", e.target.value)} required />
          <Input label="End Date" type="date" value={form.endDate} onChange={e => f("endDate", e.target.value)} required />
          <Textarea label="Reason" value={form.reason} onChange={e => f("reason", e.target.value)} placeholder="Brief reason for leave…" rows={2} />
          <div className="flex gap-2 justify-end">
            <Btn variant="outline" onClick={() => setOpen(false)}>Cancel</Btn>
            <Btn type="submit">Submit Request</Btn>
          </div>
        </form>
      </Modal>
    </div>
  );
}

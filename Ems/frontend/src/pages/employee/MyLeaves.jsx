import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useData } from '../../contexts/DataContext';
import { Input, Btn, Modal, Badge, Select, Textarea, EmptyState, PageHeader, C } from '../../components/UI';
import { MdAdd } from 'react-icons/md';

const STATUS_COLOR = {
  Pending:  'bg-amber-50 dark:bg-amber-950/30 text-amber-600 dark:text-amber-400 border border-amber-100 dark:border-amber-900/40',
  Approved: 'bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400 border border-emerald-100 dark:border-emerald-900/40',
  Rejected: 'bg-red-50 dark:bg-red-950/30 text-red-600 dark:text-red-400 border border-red-100 dark:border-red-900/40',
};
const EMPTY = { type: 'Casual', startDate: '', endDate: '', reason: '' };

export function MyLeavesPage({ toast }) {
  const { user } = useAuth();
  const { leaves, addLeave } = useData();
  const myLeaves = leaves;
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState(EMPTY);
  const [saving, setSaving] = useState(false);
  const f = (k, v) => setForm(p => ({ ...p, [k]: v }));

  async function handleSubmit(e) {
    e.preventDefault();
    setSaving(true);
    try {
      await addLeave({ ...form });
      toast('Leave request submitted');
      setOpen(false);
      setForm(EMPTY);
    } catch (err) {
      toast(err.response?.data?.message || 'Failed to submit leave', 'error');
    } finally {
      setSaving(false);
    }
  }

  const approved = myLeaves.filter(l => l.status === 'Approved').length;
  const pending  = myLeaves.filter(l => l.status === 'Pending').length;

  return (
    <div className="space-y-4 animate-fade-in-up">
      <PageHeader
        title="My Leaves"
        subtitle={`${approved} approved · ${pending} pending`}
        action={<Btn onClick={() => setOpen(true)}><MdAdd size={15} /> Apply Leave</Btn>}
      />

      <div className={`${C.card} overflow-hidden`}>
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-100 dark:border-[#1a1f2c] bg-gray-50/50 dark:bg-[#0d1017]">
              {['Type','Period','Reason','Applied On','Status'].map(h => (
                <th key={h} className="text-left text-[11px] font-semibold px-4 py-3 text-gray-400 dark:text-gray-600 uppercase tracking-wide">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {myLeaves.map(leave => {
              const start = new Date(leave.startDate);
              const end = new Date(leave.endDate);
              const days = Math.round((end - start) / 86400000) + 1;
              return (
                <tr key={leave.id} className={`border-b border-gray-50 dark:border-[#1a1f2c] ${C.rowHover} last:border-0`}>
                  <td className="px-4 py-3"><p className="text-sm font-medium">{leave.type}</p></td>
                  <td className="px-4 py-3">
                    <p className="text-sm">{leave.startDate}</p>
                    <p className="text-[11px] text-gray-400 dark:text-gray-600">to {leave.endDate} · {days}d</p>
                  </td>
                  <td className="px-4 py-3">
                    <p className="text-sm text-gray-600 dark:text-gray-400 max-w-[180px] truncate">{leave.reason}</p>
                  </td>
                  <td className="px-4 py-3">
                    <p className="text-sm text-gray-500 dark:text-gray-400">{leave.appliedOn}</p>
                  </td>
                  <td className="px-4 py-3">
                    <Badge className={STATUS_COLOR[leave.status]}>
                      <span className={`w-1.5 h-1.5 rounded-full ${
                        leave.status === 'Approved' ? 'bg-emerald-500' :
                        leave.status === 'Rejected' ? 'bg-red-500' : 'bg-amber-500'
                      }`} />
                      {leave.status}
                    </Badge>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {myLeaves.length === 0 && <EmptyState icon="📋" title="No leave requests yet" description="Apply for leave using the button above" />}
      </div>

      <Modal open={open} onClose={() => setOpen(false)} title="Apply for Leave" maxWidth="max-w-sm">
        <form onSubmit={handleSubmit} className="space-y-3">
          <Select label="Leave Type" value={form.type} onChange={v => f('type', v)} options={['Casual','Sick','Annual','Unpaid']} />
          <div className="grid grid-cols-2 gap-3">
            <Input label="Start Date" type="date" value={form.startDate} onChange={e => f('startDate', e.target.value)} required />
            <Input label="End Date" type="date" value={form.endDate} onChange={e => f('endDate', e.target.value)} required />
          </div>
          <Textarea label="Reason" value={form.reason} onChange={e => f('reason', e.target.value)} placeholder="Brief reason for leave…" rows={2} />
          <div className="flex gap-2 justify-end pt-1 border-t border-gray-100 dark:border-[#1a1f2c]">
            <Btn variant="outline" onClick={() => setOpen(false)}>Cancel</Btn>
            <Btn type="submit" disabled={saving}>{saving ? 'Submitting…' : 'Submit Request'}</Btn>
          </div>
        </form>
      </Modal>
    </div>
  );
}

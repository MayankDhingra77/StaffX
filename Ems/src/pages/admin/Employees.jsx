import { useState, useMemo } from 'react';
import { useData } from '../../contexts/DataContext';
import { Avatar, Badge, Btn, Input, Select, Modal, Textarea, StarRating, EmptyState, PageHeader, C, ConfirmDialog } from '../../components/UI';
import { formatCurrency } from '../../utils/data';
import { MdAdd, MdSearch, MdEdit, MdDelete, MdStar } from 'react-icons/md';

const DEPARTMENTS = ['Engineering','Marketing','Sales','HR','Finance','Operations','Design'];
const STATUSES    = ['Active','Inactive'];
const EMPTY = { name:'', email:'', password:'', phone:'', department:'Engineering', role:'', salary:'', status:'Active', joiningDate:'', avatarColor:'#7c3aed' };
const AVATAR_COLORS = ['#7c3aed','#2563eb','#059669','#d97706','#dc2626','#0891b2','#65a30d','#9333ea','#ea580c','#0284c7','#16a34a','#b45309','#be185d','#6366f1','#f43f5e'];

const STATUS_COLOR = {
  Active:   'bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400 border border-emerald-100 dark:border-emerald-900/40',
  Inactive: 'bg-gray-100 dark:bg-[#1a1f2c] text-gray-500 dark:text-gray-400 border border-gray-200 dark:border-[#252b38]',
};

export function EmployeesPage({ toast }) {
  const { employees, addEmployee, updateEmployee, deleteEmployee, rateEmployee } = useData();
  const [search, setSearch] = useState('');
  const [deptFilter, setDeptFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [editEmp, setEditEmp] = useState(null);
  const [rateEmp, setRateEmp] = useState(null);
  const [deleteEmp, setDeleteEmp] = useState(null);
  const [form, setForm] = useState(EMPTY);
  const [ratingForm, setRatingForm] = useState({ rating: 3, note: '' });
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const f = (k, v) => setForm(p => ({ ...p, [k]: v }));

  const filtered = useMemo(() => {
    return employees.filter(e => {
      const matchSearch = !search || e.name.toLowerCase().includes(search.toLowerCase()) || e.email.toLowerCase().includes(search.toLowerCase());
      const matchDept = deptFilter === 'All' || e.department === deptFilter;
      const matchStatus = statusFilter === 'All' || e.status === statusFilter;
      return matchSearch && matchDept && matchStatus;
    });
  }, [employees, search, deptFilter, statusFilter]);

  function openAdd() { setForm(EMPTY); setEditEmp('new'); }
  function openEdit(emp) { setForm({ ...emp, password: '' }); setEditEmp(emp); }

  async function handleSave(e) {
    e.preventDefault();
    setSaving(true);
    try {
      if (editEmp === 'new') {
        await addEmployee(form);
        toast('Employee added successfully');
      } else {
        await updateEmployee({ ...form, id: editEmp.id });
        toast('Employee updated');
      }
      setEditEmp(null);
    } catch (err) {
      toast(err.response?.data?.message || 'Failed to save employee', 'error');
    } finally { setSaving(false); }
  }

  async function handleDelete() {
    setDeleting(true);
    try {
      await deleteEmployee(deleteEmp.id);
      toast('Employee removed');
      setDeleteEmp(null);
    } catch (err) {
      toast(err.response?.data?.message || 'Failed to delete', 'error');
    } finally { setDeleting(false); }
  }

  async function handleRate(e) {
    e.preventDefault();
    setSaving(true);
    try {
      await rateEmployee(rateEmp.id, ratingForm.rating, ratingForm.note);
      toast('Rating saved');
      setRateEmp(null);
    } catch (err) {
      toast('Failed to save rating', 'error');
    } finally { setSaving(false); }
  }

  return (
    <div className="space-y-4 animate-fade-in-up">
      <PageHeader title="Employees" subtitle={`${filtered.length} of ${employees.length} employees`}
        action={<Btn onClick={openAdd}><MdAdd size={15}/> Add Employee</Btn>} />

      {/* Filters */}
      <div className="flex flex-wrap gap-2">
        <div className="relative flex-1 min-w-[200px] max-w-xs">
          <MdSearch size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search employees…"
            className={`${C.input} pl-8 h-8 text-sm w-full`} />
        </div>
        <select value={deptFilter} onChange={e => setDeptFilter(e.target.value)}
          className={`${C.input} h-8 text-sm px-2 pr-7`}>
          <option value="All">All Departments</option>
          {DEPARTMENTS.map(d => <option key={d}>{d}</option>)}
        </select>
        <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)}
          className={`${C.input} h-8 text-sm px-2 pr-7`}>
          <option value="All">All Status</option>
          {STATUSES.map(s => <option key={s}>{s}</option>)}
        </select>
      </div>

      {/* Table */}
      <div className={`${C.card} overflow-hidden`}>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100 dark:border-[#1a1f2c] bg-gray-50/50 dark:bg-[#0d1017]">
                {['Employee','Department','Role','Salary','Joining Date','Status','Rating','Actions'].map(h => (
                  <th key={h} className="text-left text-[11px] font-semibold px-4 py-3 text-gray-400 dark:text-gray-600 uppercase tracking-wide whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map(emp => (
                <tr key={emp.id} className={`border-b border-gray-50 dark:border-[#1a1f2c] ${C.rowHover} last:border-0`}>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2.5">
                      <Avatar name={emp.name} color={emp.avatarColor} size="sm" />
                      <div>
                        <p className="text-sm font-medium leading-tight">{emp.name}</p>
                        <p className="text-[11px] text-gray-400 dark:text-gray-600">{emp.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">{emp.department}</td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">{emp.role}</td>
                  <td className="px-4 py-3 text-sm font-medium text-emerald-600 dark:text-emerald-400">{formatCurrency(emp.salary)}</td>
                  <td className="px-4 py-3 text-sm text-gray-500 dark:text-gray-400">{emp.joiningDate}</td>
                  <td className="px-4 py-3"><Badge className={STATUS_COLOR[emp.status]}><span className={`w-1.5 h-1.5 rounded-full ${emp.status === 'Active' ? 'bg-emerald-500' : 'bg-gray-400'}`} />{emp.status}</Badge></td>
                  <td className="px-4 py-3">
                    {emp.rating?.rating
                      ? <StarRating value={emp.rating.rating} readOnly size="sm" />
                      : <span className="text-[11px] text-gray-300 dark:text-gray-700">Not rated</span>}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1">
                      <button onClick={() => { setRateEmp(emp); setRatingForm({ rating: emp.rating?.rating || 3, note: emp.rating?.note || '' }); }}
                        className={`${C.iconBtn} text-amber-500`} title="Rate"><MdStar size={14}/></button>
                      <button onClick={() => openEdit(emp)} className={`${C.iconBtn}`} title="Edit"><MdEdit size={14}/></button>
                      <button onClick={() => setDeleteEmp(emp)} className={`${C.iconBtn} hover:text-red-500 dark:hover:text-red-400`} title="Delete"><MdDelete size={14}/></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filtered.length === 0 && <EmptyState icon="👥" title="No employees found" description="Try adjusting filters or add a new employee" />}
      </div>

      {/* Add/Edit Modal */}
      <Modal open={!!editEmp} onClose={() => setEditEmp(null)}
        title={editEmp === 'new' ? 'Add Employee' : 'Edit Employee'} maxWidth="max-w-lg">
        <form onSubmit={handleSave} className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <Input label="Full Name" value={form.name} onChange={e => f('name', e.target.value)} required />
            <Input label="Email" type="email" value={form.email} onChange={e => f('email', e.target.value)} required />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Input label={editEmp === 'new' ? 'Password' : 'New Password (optional)'} type="password"
              value={form.password} onChange={e => f('password', e.target.value)}
              required={editEmp === 'new'} placeholder={editEmp !== 'new' ? 'Leave blank to keep' : ''} />
            <Input label="Phone" value={form.phone || ''} onChange={e => f('phone', e.target.value)} />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Select label="Department" value={form.department} onChange={v => f('department', v)} options={DEPARTMENTS} />
            <Input label="Designation / Role" value={form.role} onChange={e => f('role', e.target.value)} required />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Input label="Salary (₹)" type="number" value={form.salary} onChange={e => f('salary', e.target.value)} required />
            <Input label="Joining Date" type="date" value={form.joiningDate} onChange={e => f('joiningDate', e.target.value)} required />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Select label="Status" value={form.status} onChange={v => f('status', v)} options={STATUSES} />
            <div>
              <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1.5">Avatar Color</p>
              <div className="flex flex-wrap gap-1.5">
                {AVATAR_COLORS.map(c => (
                  <button key={c} type="button" onClick={() => f('avatarColor', c)}
                    style={{ background: c }}
                    className={`w-5 h-5 rounded-full transition-transform ${form.avatarColor === c ? 'ring-2 ring-offset-1 ring-offset-white dark:ring-offset-[#111318] ring-gray-400 scale-110' : 'hover:scale-110'}`} />
                ))}
              </div>
            </div>
          </div>
          <div className="flex gap-2 justify-end pt-2 border-t border-gray-100 dark:border-[#1a1f2c]">
            <Btn variant="outline" type="button" onClick={() => setEditEmp(null)}>Cancel</Btn>
            <Btn type="submit" disabled={saving}>{saving ? 'Saving…' : editEmp === 'new' ? 'Add Employee' : 'Save Changes'}</Btn>
          </div>
        </form>
      </Modal>

      {/* Rate Modal */}
      <Modal open={!!rateEmp} onClose={() => setRateEmp(null)} title={`Rate ${rateEmp?.name}`} maxWidth="max-w-sm">
        <form onSubmit={handleRate} className="space-y-4">
          <div className="flex flex-col items-center gap-3 py-2">
            <Avatar name={rateEmp?.name || ''} color={rateEmp?.avatarColor} size="lg" />
            <StarRating value={ratingForm.rating} onChange={v => setRatingForm(p => ({ ...p, rating: v }))} />
            <p className="text-sm text-gray-500 dark:text-gray-400">{ratingForm.rating} / 5</p>
          </div>
          <Textarea label="Note (optional)" value={ratingForm.note} onChange={e => setRatingForm(p => ({ ...p, note: e.target.value }))} rows={2} placeholder="Performance note…" />
          <div className="flex gap-2 justify-end pt-1 border-t border-gray-100 dark:border-[#1a1f2c]">
            <Btn variant="outline" type="button" onClick={() => setRateEmp(null)}>Cancel</Btn>
            <Btn type="submit" disabled={saving}>{saving ? 'Saving…' : 'Save Rating'}</Btn>
          </div>
        </form>
      </Modal>

      {/* Delete Confirm */}
      <ConfirmDialog open={!!deleteEmp} onClose={() => setDeleteEmp(null)}
        title="Remove Employee"
        message={`Are you sure you want to remove ${deleteEmp?.name}? This cannot be undone.`}
        confirmLabel="Remove" confirmVariant="danger"
        onConfirm={handleDelete} loading={deleting} />
    </div>
  );
}

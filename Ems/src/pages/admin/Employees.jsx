import { useState } from 'react';
import { useData } from '../../contexts/DataContext';
import { Input, Btn, Modal, Avatar, Badge, Select, Textarea, StarRating, C } from '../../components/UI';
import { formatCurrency } from '../../utils/data';

const DEPTS = ["Engineering","Marketing","Sales","HR","Finance","Operations","Design"];
const EMPTY = { name:"", email:"", password:"123", phone:"", department:"Engineering", role:"", salary:"", status:"Active", joiningDate:"" };

export function EmployeesPage({ toast }) {
  const { employees, addEmployee, updateEmployee, deleteEmployee, ratings, rateEmployee, tasks, attendance } = useData();
  const [modalOpen, setModalOpen] = useState(false);
  const [rateModal, setRateModal] = useState(null); // employee obj
  const [editing, setEditing] = useState(null);
  const [search, setSearch] = useState("");
  const [form, setForm] = useState(EMPTY);
  const [rateForm, setRateForm] = useState({ rating: 3, note: "" });

  const f = (k, v) => setForm(p => ({ ...p, [k]: v }));
  const filtered = employees.filter(e => e.name.toLowerCase().includes(search.toLowerCase()) || e.email.toLowerCase().includes(search.toLowerCase()));

  function openAdd() { setEditing(null); setForm({ ...EMPTY, joiningDate: new Date().toISOString().split("T")[0] }); setModalOpen(true); }
  function openEdit(emp) { setEditing(emp); setForm({ ...emp, salary: String(emp.salary) }); setModalOpen(true); }

  function handleSubmit(e) {
    e.preventDefault();
    const data = { ...form, salary: Number(form.salary) };
    if (editing) { updateEmployee({ ...editing, ...data }); toast("Employee updated"); }
    else { addEmployee(data); toast("Employee added"); }
    setModalOpen(false);
  }

  function openRate(emp) {
    const r = ratings.find(rt => rt.employeeId === emp.id);
    setRateForm({ rating: r?.rating ?? 3, note: r?.note ?? "" });
    setRateModal(emp);
  }

  function handleRate() {
    rateEmployee(rateModal.id, rateForm.rating, rateForm.note);
    toast("Rating saved for " + rateModal.name);
    setRateModal(null);
  }

  // compute auto rating score
  function getAutoScore(emp) {
    const empTasks = tasks.filter(t => t.assignedTo === emp.id);
    const completed = empTasks.filter(t => t.status === "Completed").length;
    const taskScore = empTasks.length ? (completed / empTasks.length) * 5 : null;
    const attRecords = attendance.filter(a => a.employeeId === emp.id);
    const presentDays = attRecords.filter(a => a.status === "Present" || a.status === "WFH" || a.status === "Half Day").length;
    const attScore = attRecords.length ? (presentDays / attRecords.length) * 5 : null;
    if (!taskScore && !attScore) return null;
    const scores = [taskScore, attScore].filter(s => s !== null);
    return (scores.reduce((a, b) => a + b, 0) / scores.length).toFixed(1);
  }

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black">Employees</h1>
          <p className={`text-sm mt-0.5 ${C.subtext}`}>{employees.length} total</p>
        </div>
        <Btn onClick={openAdd}>+ Add Employee</Btn>
      </div>

      <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search by name, email…"
        className={`${C.card} w-full px-4 py-2.5 text-sm outline-none focus:border-emerald-500 border`} />

      <div className={`${C.card} overflow-hidden`}>
        <table className="w-full">
          <thead>
            <tr className={`border-b ${C.divider}`}>
              {["Employee","Department","Role","Salary","Rating","Status",""].map(h => (
                <th key={h} className={`text-left text-xs font-semibold px-4 py-3 ${C.subtext}`}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map(emp => {
              const r = ratings.find(rt => rt.employeeId === emp.id);
              const auto = getAutoScore(emp);
              return (
                <tr key={emp.id} className={`border-b ${C.divider} ${C.rowHover} last:border-0`}>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2.5">
                      <Avatar name={emp.name} color={emp.avatarColor} size="sm" />
                      <div>
                        <p className="text-sm font-medium">{emp.name}</p>
                        <p className={`text-xs ${C.muted}`}>{emp.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3"><p className={`text-sm ${C.subtext}`}>{emp.department}</p></td>
                  <td className="px-4 py-3"><p className={`text-sm ${C.subtext}`}>{emp.role}</p></td>
                  <td className="px-4 py-3"><p className="text-sm font-semibold text-emerald-600 dark:text-emerald-400">{formatCurrency(emp.salary)}</p></td>
                  <td className="px-4 py-3">
                    <div className="flex flex-col gap-0.5">
                      {r ? <StarRating value={r.rating} readOnly /> : <span className={`text-xs ${C.muted}`}>Not rated</span>}
                      {auto && <span className={`text-xs ${C.muted}`}>Auto: {auto}★</span>}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <Badge className={emp.status === "Active" ? "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400" : "bg-gray-100 dark:bg-gray-800 text-gray-500"}>
                      {emp.status}
                    </Badge>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-1">
                      <Btn size="sm" variant="outline" onClick={() => openRate(emp)}>Rate</Btn>
                      <Btn size="sm" variant="ghost" onClick={() => openEdit(emp)}>Edit</Btn>
                      <Btn size="sm" variant="danger" onClick={() => { deleteEmployee(emp.id); toast("Employee removed", "error"); }}>✕</Btn>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={editing ? "Edit Employee" : "Add Employee"}>
        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-3">
          <Input label="Full Name" value={form.name} onChange={e => f("name", e.target.value)} required className="col-span-2" />
          <Input label="Email" type="email" value={form.email} onChange={e => f("email", e.target.value)} required />
          <Input label="Password" value={form.password} onChange={e => f("password", e.target.value)} required />
          <Input label="Phone" value={form.phone} onChange={e => f("phone", e.target.value)} />
          <Select label="Department" value={form.department} onChange={v => f("department", v)} options={DEPTS} />
          <Input label="Role/Designation" value={form.role} onChange={e => f("role", e.target.value)} required className="col-span-2" />
          <Input label="Salary (₹)" type="number" value={form.salary} onChange={e => f("salary", e.target.value)} required />
          <Input label="Joining Date" type="date" value={form.joiningDate} onChange={e => f("joiningDate", e.target.value)} required />
          <Select label="Status" value={form.status} onChange={v => f("status", v)} options={["Active","Inactive"]} />
          <div className="col-span-2 flex gap-2 justify-end mt-1">
            <Btn variant="outline" onClick={() => setModalOpen(false)}>Cancel</Btn>
            <Btn type="submit">{editing ? "Save Changes" : "Add Employee"}</Btn>
          </div>
        </form>
      </Modal>

      <Modal open={!!rateModal} onClose={() => setRateModal(null)} title={`Rate: ${rateModal?.name}`} maxWidth="max-w-sm">
        {rateModal && (
          <div className="space-y-4">
            <div className={`p-3 rounded-lg bg-gray-50 dark:bg-[#161b22] text-xs ${C.subtext} space-y-1`}>
              <p>Tasks completed: {tasks.filter(t => t.assignedTo === rateModal.id && t.status === "Completed").length} / {tasks.filter(t => t.assignedTo === rateModal.id).length}</p>
              <p>Attendance days: {attendance.filter(a => a.employeeId === rateModal.id && (a.status === "Present" || a.status === "WFH")).length} present</p>
            </div>
            <div>
              <p className={`text-xs font-medium mb-2 ${C.subtext}`}>Performance Rating</p>
              <StarRating value={rateForm.rating} onChange={v => setRateForm(p => ({ ...p, rating: v }))} />
            </div>
            <Textarea label="Notes (optional)" value={rateForm.note} onChange={e => setRateForm(p => ({ ...p, note: e.target.value }))} placeholder="Add performance notes…" rows={2} />
            <div className="flex gap-2 justify-end">
              <Btn variant="outline" onClick={() => setRateModal(null)}>Cancel</Btn>
              <Btn onClick={handleRate}>Save Rating</Btn>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}

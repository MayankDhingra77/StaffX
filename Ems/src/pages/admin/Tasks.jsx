import { useState } from 'react';
import { useData } from '../../contexts/DataContext';
import { Input, Btn, Modal, Avatar, Badge, Select, Textarea, C } from '../../components/UI';

const PRIORITIES = ["Low","Medium","High","Critical"];
const STATUSES = ["Pending","In Progress","Completed","Cancelled"];
const PRIORITY_COLOR = { Low:"bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400", Medium:"bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400", High:"bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400", Critical:"bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400" };
const STATUS_COLOR = { Pending:"bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400", "In Progress":"bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400", Completed:"bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400", Cancelled:"bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400" };
const EMPTY = { title:"", description:"", assignedTo:"", priority:"Medium", status:"Pending", dueDate:"" };

export function TasksPage({ toast }) {
  const { tasks, employees, addTask, updateTask, deleteTask } = useData();
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(EMPTY);
  const [filter, setFilter] = useState("All");
  const f = (k, v) => setForm(p => ({ ...p, [k]: v }));

  const filtered = filter === "All" ? tasks : tasks.filter(t => t.status === filter);

  function openAdd() { setEditing(null); setForm({ ...EMPTY, dueDate: new Date().toISOString().split("T")[0], assignedTo: employees[0]?.id ?? "" }); setModalOpen(true); }
  function openEdit(t) { setEditing(t); setForm({ ...t }); setModalOpen(true); }

  function handleSubmit(e) {
    e.preventDefault();
    if (editing) { updateTask({ ...editing, ...form }); toast("Task updated"); }
    else { addTask(form); toast("Task created"); }
    setModalOpen(false);
  }

  const empOptions = employees.map(e => ({ value: e.id, label: e.name }));
  const getEmp = (id) => employees.find(e => e.id === id);

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black">Tasks</h1>
          <p className={`text-sm mt-0.5 ${C.subtext}`}>{tasks.length} total</p>
        </div>
        <Btn onClick={openAdd}>+ New Task</Btn>
      </div>

      <div className="flex gap-2 flex-wrap">
        {["All", ...STATUSES].map(s => (
          <button key={s} onClick={() => setFilter(s)}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg border transition-colors
              ${filter === s ? "bg-emerald-600 text-white border-transparent" : `border-gray-200 dark:border-[#30363d] ${C.subtext} hover:border-emerald-400`}`}>
            {s}
          </button>
        ))}
      </div>

      <div className={`${C.card} overflow-hidden`}>
        <table className="w-full">
          <thead>
            <tr className={`border-b ${C.divider}`}>
              {["Task","Assigned To","Priority","Status","Due Date",""].map(h => (
                <th key={h} className={`text-left text-xs font-semibold px-4 py-3 ${C.subtext}`}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map(task => {
              const emp = getEmp(task.assignedTo);
              return (
                <tr key={task.id} className={`border-b ${C.divider} ${C.rowHover} last:border-0`}>
                  <td className="px-4 py-3">
                    <p className="text-sm font-medium">{task.title}</p>
                    <p className={`text-xs mt-0.5 ${C.muted} truncate max-w-[200px]`}>{task.description}</p>
                  </td>
                  <td className="px-4 py-3">
                    {emp ? (
                      <div className="flex items-center gap-2">
                        <Avatar name={emp.name} color={emp.avatarColor} size="sm" />
                        <span className={`text-sm ${C.subtext}`}>{emp.name}</span>
                      </div>
                    ) : <span className={`text-sm ${C.muted}`}>Unassigned</span>}
                  </td>
                  <td className="px-4 py-3"><Badge className={PRIORITY_COLOR[task.priority]}>{task.priority}</Badge></td>
                  <td className="px-4 py-3"><Badge className={STATUS_COLOR[task.status]}>{task.status}</Badge></td>
                  <td className="px-4 py-3"><p className={`text-sm ${C.subtext}`}>{task.dueDate}</p></td>
                  <td className="px-4 py-3">
                    <div className="flex gap-1">
                      <Btn size="sm" variant="ghost" onClick={() => openEdit(task)}>Edit</Btn>
                      <Btn size="sm" variant="danger" onClick={() => { deleteTask(task.id); toast("Task deleted", "error"); }}>✕</Btn>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {filtered.length === 0 && <p className={`text-sm text-center py-10 ${C.muted}`}>No tasks found.</p>}
      </div>

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={editing ? "Edit Task" : "New Task"}>
        <form onSubmit={handleSubmit} className="space-y-3">
          <Input label="Title" value={form.title} onChange={e => f("title", e.target.value)} required />
          <Textarea label="Description" value={form.description} onChange={e => f("description", e.target.value)} />
          <Select label="Assigned To" value={form.assignedTo} onChange={v => f("assignedTo", v)} options={empOptions} />
          <div className="grid grid-cols-2 gap-3">
            <Select label="Priority" value={form.priority} onChange={v => f("priority", v)} options={PRIORITIES} />
            <Select label="Status" value={form.status} onChange={v => f("status", v)} options={STATUSES} />
          </div>
          <Input label="Due Date" type="date" value={form.dueDate} onChange={e => f("dueDate", e.target.value)} required />
          <div className="flex gap-2 justify-end mt-2">
            <Btn variant="outline" onClick={() => setModalOpen(false)}>Cancel</Btn>
            <Btn type="submit">{editing ? "Save Changes" : "Create Task"}</Btn>
          </div>
        </form>
      </Modal>
    </div>
  );
}

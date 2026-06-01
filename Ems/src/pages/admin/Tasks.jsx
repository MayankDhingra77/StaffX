import { useState } from 'react';
import { useData } from '../../contexts/DataContext';
import { Input, Btn, Modal, Avatar, Badge, Select, Textarea, EmptyState, PageHeader, C } from '../../components/UI';
import { MdAdd } from 'react-icons/md';

const PRIORITIES = ["Low","Medium","High","Critical"];
const STATUSES = ["Pending","In Progress","Completed","Cancelled"];

const PRIORITY_COLOR = {
  Low:      "bg-gray-100 dark:bg-[#1a1f2c] text-gray-500 dark:text-gray-500 border border-gray-200 dark:border-[#252b38]",
  Medium:   "bg-blue-50 dark:bg-blue-950/30 text-blue-600 dark:text-blue-400 border border-blue-100 dark:border-blue-900/40",
  High:     "bg-amber-50 dark:bg-amber-950/30 text-amber-600 dark:text-amber-400 border border-amber-100 dark:border-amber-900/40",
  Critical: "bg-red-50 dark:bg-red-950/30 text-red-600 dark:text-red-400 border border-red-100 dark:border-red-900/40",
};
const STATUS_COLOR = {
  Pending:      "bg-gray-100 dark:bg-[#1a1f2c] text-gray-500 dark:text-gray-400 border border-gray-200 dark:border-[#252b38]",
  "In Progress":"bg-blue-50 dark:bg-blue-950/30 text-blue-600 dark:text-blue-400 border border-blue-100 dark:border-blue-900/40",
  Completed:    "bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400 border border-emerald-100 dark:border-emerald-900/40",
  Cancelled:    "bg-red-50 dark:bg-red-950/30 text-red-600 dark:text-red-400 border border-red-100 dark:border-red-900/40",
};
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

  const counts = {
    All: tasks.length,
    ...Object.fromEntries(STATUSES.map(s => [s, tasks.filter(t => t.status === s).length]))
  };

  return (
    <div className="space-y-4 animate-fade-in-up">
      <PageHeader
        title="Tasks"
        subtitle={`${tasks.length} total tasks`}
        action={<Btn onClick={openAdd}><MdAdd size={15} /> New Task</Btn>}
      />

      {/* Filter tabs */}
      <div className="flex gap-1.5 flex-wrap">
        {["All", ...STATUSES].map(s => (
          <button key={s} onClick={() => setFilter(s)}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-all
              ${filter === s
                ? "bg-emerald-600 text-white border-emerald-600 shadow-sm shadow-emerald-900/20"
                : "border-gray-200 dark:border-[#1e2432] text-gray-500 dark:text-gray-500 hover:border-gray-300 dark:hover:border-[#252b38] hover:text-gray-700 dark:hover:text-gray-300 bg-white dark:bg-[#111318]"}`}>
            {s}
            <span className={`ml-1.5 text-[10px] ${filter === s ? "text-white/70" : "text-gray-400 dark:text-gray-600"}`}>
              {counts[s]}
            </span>
          </button>
        ))}
      </div>

      <div className={`${C.card} overflow-hidden`}>
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-100 dark:border-[#1a1f2c] bg-gray-50/50 dark:bg-[#0d1017]">
              {["Task","Assigned To","Priority","Status","Due Date",""].map(h => (
                <th key={h} className="text-left text-[11px] font-semibold px-4 py-3 text-gray-400 dark:text-gray-600 uppercase tracking-wide">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map(task => {
              const emp = getEmp(task.assignedTo);
              const isOverdue = task.status !== "Completed" && task.dueDate < new Date().toISOString().split("T")[0];
              return (
                <tr key={task.id} className={`border-b border-gray-50 dark:border-[#1a1f2c] ${C.rowHover} last:border-0`}>
                  <td className="px-4 py-3">
                    <p className="text-sm font-medium leading-tight">{task.title}</p>
                    <p className="text-[11px] mt-0.5 text-gray-400 dark:text-gray-600 truncate max-w-[200px]">{task.description}</p>
                  </td>
                  <td className="px-4 py-3">
                    {emp ? (
                      <div className="flex items-center gap-2">
                        <Avatar name={emp.name} color={emp.avatarColor} size="sm" />
                        <span className="text-sm text-gray-600 dark:text-gray-400">{emp.name}</span>
                      </div>
                    ) : <span className="text-sm text-gray-400 dark:text-gray-600">Unassigned</span>}
                  </td>
                  <td className="px-4 py-3"><Badge className={PRIORITY_COLOR[task.priority]}>{task.priority}</Badge></td>
                  <td className="px-4 py-3"><Badge className={STATUS_COLOR[task.status]}>{task.status}</Badge></td>
                  <td className="px-4 py-3">
                    <p className={`text-sm ${isOverdue ? "text-red-500 dark:text-red-400 font-medium" : "text-gray-500 dark:text-gray-400"}`}>
                      {task.dueDate}
                    </p>
                    {isOverdue && <p className="text-[10px] text-red-400 dark:text-red-500">Overdue</p>}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-1 justify-end">
                      <Btn size="sm" variant="ghost" onClick={() => openEdit(task)}>Edit</Btn>
                      <Btn size="sm" variant="danger" onClick={() => { deleteTask(task.id); toast("Task deleted", "error"); }}>✕</Btn>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {filtered.length === 0 && <EmptyState icon="✅" title="No tasks found" description="Change the filter or create a new task" />}
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
          <div className="flex gap-2 justify-end pt-1 border-t border-gray-100 dark:border-[#1a1f2c]">
            <Btn variant="outline" onClick={() => setModalOpen(false)}>Cancel</Btn>
            <Btn type="submit">{editing ? "Save Changes" : "Create Task"}</Btn>
          </div>
        </form>
      </Modal>
    </div>
  );
}

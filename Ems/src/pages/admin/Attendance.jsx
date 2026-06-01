import { useState } from 'react';
import { useData } from '../../contexts/DataContext';
import { Btn, Badge, Avatar, StatCard, PageHeader, C } from '../../components/UI';
import { MdSave } from 'react-icons/md';

const STATUS_OPTS = ["Present", "Absent", "Half Day", "WFH"];
const STATUS_COLOR = {
  Present:   "bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400 border border-emerald-100 dark:border-emerald-900/40",
  Absent:    "bg-red-50 dark:bg-red-950/30 text-red-600 dark:text-red-400 border border-red-100 dark:border-red-900/40",
  "Half Day":"bg-amber-50 dark:bg-amber-950/30 text-amber-600 dark:text-amber-400 border border-amber-100 dark:border-amber-900/40",
  WFH:       "bg-blue-50 dark:bg-blue-950/30 text-blue-600 dark:text-blue-400 border border-blue-100 dark:border-blue-900/40",
};

const BTN_ACTIVE = {
  Present:    "bg-emerald-600 text-white border-transparent shadow-sm",
  Absent:     "bg-red-600 text-white border-transparent shadow-sm",
  "Half Day": "bg-amber-500 text-white border-transparent shadow-sm",
  WFH:        "bg-blue-600 text-white border-transparent shadow-sm",
};

export function AttendancePage({ toast }) {
  const { employees, attendance, markAttendance } = useData();
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [records, setRecords] = useState({});

  const todayRecords = attendance.filter(a => a.date === date);
  const getStatus = (empId) => records[empId] ?? todayRecords.find(a => a.employeeId === empId)?.status ?? "Present";

  function setStatus(empId, status) { setRecords(r => ({ ...r, [empId]: status })); }
  function markAll(status) { const r = {}; employees.forEach(e => r[e.id] = status); setRecords(r); }

  function handleSave() {
    const recs = employees.map(e => ({ employeeId: e.id, status: getStatus(e.id) }));
    markAttendance(date, recs);
    setRecords({});
    toast("Attendance saved for " + date);
  }

  const activeEmps = employees.filter(e => e.status === "Active");
  const counts = STATUS_OPTS.map(s => activeEmps.filter(e => getStatus(e.id) === s).length);

  return (
    <div className="space-y-4 animate-fade-in-up">
      <PageHeader
        title="Attendance"
        subtitle={`${activeEmps.length} active employees`}
        action={
          <div className="flex items-center gap-2 flex-wrap">
            <input type="date" value={date} onChange={e => { setDate(e.target.value); setRecords({}); }}
              className="px-3 py-1.5 text-sm bg-white dark:bg-[#111318] border border-gray-200 dark:border-[#1e2432] rounded-lg outline-none focus:border-emerald-500 text-gray-700 dark:text-gray-300 transition-colors" />
            <Btn variant="outline" size="sm" onClick={() => markAll("Present")}>All Present</Btn>
            <Btn variant="outline" size="sm" onClick={() => markAll("Absent")}>All Absent</Btn>
            <Btn onClick={handleSave} size="sm"><MdSave size={13} /> Save</Btn>
          </div>
        }
      />

      {/* Summary */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {STATUS_OPTS.map((s, i) => (
          <StatCard key={s} label={s} value={counts[i]}
            color={s === "Present" ? "text-emerald-600 dark:text-emerald-400" :
                   s === "Absent"  ? "text-red-600 dark:text-red-400" :
                   s === "Half Day"? "text-amber-600 dark:text-amber-400" :
                                     "text-blue-600 dark:text-blue-400"} />
        ))}
      </div>

      <div className={`${C.card} overflow-hidden`}>
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-100 dark:border-[#1a1f2c] bg-gray-50/50 dark:bg-[#0d1017]">
              {["Employee","Department","Status","Mark Attendance"].map(h => (
                <th key={h} className="text-left text-[11px] font-semibold px-4 py-3 text-gray-400 dark:text-gray-600 uppercase tracking-wide">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {activeEmps.map(emp => {
              const st = getStatus(emp.id);
              return (
                <tr key={emp.id} className={`border-b border-gray-50 dark:border-[#1a1f2c] ${C.rowHover} last:border-0`}>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2.5">
                      <Avatar name={emp.name} color={emp.avatarColor} size="sm" />
                      <div>
                        <p className="text-sm font-medium">{emp.name}</p>
                        <p className="text-[11px] text-gray-400 dark:text-gray-600">{emp.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <p className="text-sm text-gray-500 dark:text-gray-400">{emp.department}</p>
                  </td>
                  <td className="px-4 py-3">
                    <Badge className={STATUS_COLOR[st]}>
                      <span className={`w-1.5 h-1.5 rounded-full ${
                        st === "Present" ? "bg-emerald-500" :
                        st === "Absent" ? "bg-red-500" :
                        st === "Half Day" ? "bg-amber-500" : "bg-blue-500"
                      }`} />
                      {st}
                    </Badge>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-1 flex-wrap">
                      {STATUS_OPTS.map(s => (
                        <button key={s} onClick={() => setStatus(emp.id, s)}
                          className={`text-xs px-2.5 py-1 rounded-md border transition-all font-medium
                            ${st === s
                              ? BTN_ACTIVE[s]
                              : "border-gray-200 dark:border-[#252b38] text-gray-500 dark:text-gray-500 hover:border-gray-300 dark:hover:border-[#30363d] hover:bg-gray-50 dark:hover:bg-[#161a22]"}`}>
                          {s}
                        </button>
                      ))}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

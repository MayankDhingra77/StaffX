import { useState } from 'react';
import { useData } from '../../contexts/DataContext';
import { Btn, Badge, C } from '../../components/UI';
import { Avatar } from '../../components/UI';

const STATUS_OPTS = ["Present", "Absent", "Half Day", "WFH"];
const STATUS_COLOR = { Present: "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400", Absent: "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400", "Half Day": "bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400", WFH: "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400" };

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
  const presentCount = activeEmps.filter(e => getStatus(e.id) === "Present").length;
  const absentCount  = activeEmps.filter(e => getStatus(e.id) === "Absent").length;

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl font-black">Attendance</h1>
          <p className={`text-sm mt-0.5 ${C.subtext}`}>{activeEmps.length} active employees</p>
        </div>
        <div className="flex items-center gap-3 flex-wrap">
          <input type="date" value={date} onChange={e => { setDate(e.target.value); setRecords({}); }}
            className={`${C.card} px-3 py-2 text-sm outline-none focus:border-emerald-500`} />
          <Btn variant="outline" size="sm" onClick={() => markAll("Present")}>All Present</Btn>
          <Btn variant="outline" size="sm" onClick={() => markAll("Absent")}>All Absent</Btn>
          <Btn onClick={handleSave}>Save Attendance</Btn>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-3">
        {[["Present", presentCount, "text-emerald-500"], ["Absent", absentCount, "text-red-500"],
          ["Half Day", activeEmps.filter(e => getStatus(e.id) === "Half Day").length, "text-amber-500"],
          ["WFH", activeEmps.filter(e => getStatus(e.id) === "WFH").length, "text-blue-500"]].map(([l, v, c]) => (
          <div key={l} className={`${C.card} p-4`}>
            <p className={`text-xs ${C.subtext}`}>{l}</p>
            <p className={`text-2xl font-black mt-1 ${c}`}>{v}</p>
          </div>
        ))}
      </div>

      <div className={`${C.card} overflow-hidden`}>
        <table className="w-full">
          <thead>
            <tr className={`border-b ${C.divider}`}>
              {["Employee","Department","Status","Quick Set"].map(h => (
                <th key={h} className={`text-left text-xs font-semibold px-4 py-3 ${C.subtext}`}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {activeEmps.map(emp => {
              const st = getStatus(emp.id);
              return (
                <tr key={emp.id} className={`border-b ${C.divider} ${C.rowHover} last:border-0`}>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2.5">
                      <Avatar name={emp.name} color={emp.avatarColor} size="sm" />
                      <div>
                        <p className="text-sm font-medium">{emp.name}</p>
                        <p className={`text-xs ${C.muted}`}>{emp.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3"><p className={`text-sm ${C.subtext}`}>{emp.department}</p></td>
                  <td className="px-4 py-3"><Badge className={STATUS_COLOR[st]}>{st}</Badge></td>
                  <td className="px-4 py-3">
                    <div className="flex gap-1 flex-wrap">
                      {STATUS_OPTS.map(s => (
                        <button key={s} onClick={() => setStatus(emp.id, s)}
                          className={`text-xs px-2 py-1 rounded-lg border transition-colors ${st === s ? STATUS_COLOR[s] + " border-transparent" : "border-gray-200 dark:border-[#30363d] text-gray-500 hover:border-emerald-400"}`}>
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

import { useData } from '../../contexts/DataContext';
import { C } from '../../components/UI';

export function ActivityLogsPage() {
  const { activityLogs } = useData();
  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-black">Activity Logs</h1>
        <p className={`text-sm mt-0.5 ${C.subtext}`}>{activityLogs.length} entries</p>
      </div>
      <div className={`${C.card} overflow-hidden`}>
        <table className="w-full">
          <thead>
            <tr className={`border-b ${C.divider}`}>
              {["#","Action","Timestamp"].map(h => (
                <th key={h} className={`text-left text-xs font-semibold px-4 py-3 ${C.subtext}`}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {activityLogs.map((log, i) => (
              <tr key={log.id} className={`border-b ${C.divider} ${C.rowHover} last:border-0`}>
                <td className={`px-4 py-3 text-xs font-mono ${C.muted}`}>{i + 1}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                    <p className={`text-sm ${C.subtext}`}>{log.action}</p>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <p className={`text-sm ${C.subtext}`}>{new Date(log.timestamp).toLocaleDateString("en-IN", { day:"numeric", month:"short", year:"numeric" })}</p>
                  <p className={`text-xs ${C.muted}`}>{new Date(log.timestamp).toLocaleTimeString("en-IN", { hour:"2-digit", minute:"2-digit" })}</p>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

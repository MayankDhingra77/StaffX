import { useData } from '../../contexts/DataContext';
import { Badge, EmptyState, PageHeader, C } from '../../components/UI';

const TYPE_COLOR = {
  Create:     'bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400 border border-emerald-100 dark:border-emerald-900/40',
  Update:     'bg-blue-50 dark:bg-blue-950/30 text-blue-600 dark:text-blue-400 border border-blue-100 dark:border-blue-900/40',
  Delete:     'bg-red-50 dark:bg-red-950/30 text-red-600 dark:text-red-400 border border-red-100 dark:border-red-900/40',
  Attendance: 'bg-violet-50 dark:bg-violet-950/30 text-violet-600 dark:text-violet-400 border border-violet-100 dark:border-violet-900/40',
  Login:      'bg-amber-50 dark:bg-amber-950/30 text-amber-600 dark:text-amber-400 border border-amber-100 dark:border-amber-900/40',
  System:     'bg-gray-100 dark:bg-[#1a1f2c] text-gray-500 dark:text-gray-400 border border-gray-200 dark:border-[#252b38]',
};

function getTimeAgo(timestamp) {
  const diff = Date.now() - new Date(timestamp).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1)  return 'just now';
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24)  return `${hrs}h ago`;
  return `${Math.floor(hrs / 24)}d ago`;
}

export function ActivityLogsPage() {
  const { activityLogs } = useData();

  return (
    <div className="space-y-4 animate-fade-in-up">
      <PageHeader title="Activity Logs" subtitle={`${activityLogs.length} recent actions`} />

      <div className={`${C.card} overflow-hidden`}>
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-100 dark:border-[#1a1f2c] bg-gray-50/50 dark:bg-[#0d1017]">
              {['#','Action','Type','Timestamp'].map(h => (
                <th key={h} className="text-left text-[11px] font-semibold px-4 py-3 text-gray-400 dark:text-gray-600 uppercase tracking-wide">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {activityLogs.map((log, i) => (
              <tr key={log.id || i} className={`border-b border-gray-50 dark:border-[#1a1f2c] ${C.rowHover} last:border-0`}>
                <td className="px-4 py-3 text-[11px] text-gray-300 dark:text-gray-700 font-mono">
                  {String(i + 1).padStart(3, '0')}
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 flex-shrink-0" />
                    <p className="text-sm text-gray-700 dark:text-gray-300">{log.action}</p>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <Badge className={TYPE_COLOR[log.type] || TYPE_COLOR.System}>{log.type}</Badge>
                </td>
                <td className="px-4 py-3">
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {new Date(log.timestamp).toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' })}
                  </p>
                  <p className="text-[11px] mt-0.5 text-gray-400 dark:text-gray-600">{getTimeAgo(log.timestamp)}</p>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {activityLogs.length === 0 && <EmptyState icon="📝" title="No activity logs" description="Actions will appear here as they occur" />}
      </div>
    </div>
  );
}

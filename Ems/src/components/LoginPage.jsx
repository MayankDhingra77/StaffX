import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import { Input, Btn, Avatar } from './UI';
import { MdWbSunny, MdNightlight, MdShield, MdPerson } from 'react-icons/md';

const DEMO_EMPLOYEES = [
  { name: 'Aman Gupta',    email: 'aman@staffx.io',    avatarColor: '#7c3aed' },
  { name: 'Rohit Sharma',  email: 'rohit@staffx.io',   avatarColor: '#2563eb' },
  { name: 'Rahul Singh',   email: 'rahul@staffx.io',   avatarColor: '#059669' },
];

export function LoginPage() {
  const { login } = useAuth();
  const { dark, toggle } = useTheme();
  const [tab, setTab] = useState('admin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleLogin(e) {
    e.preventDefault();
    setError(''); setLoading(true);
    const result = await login(email, password);
    if (!result.success) {
      setError(result.message);
    }
    setLoading(false);
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0a0c10] flex items-center justify-center p-4 transition-colors">
      <button onClick={toggle}
        className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-200 dark:hover:bg-[#1a1f2c] text-gray-500 dark:text-gray-500 transition-colors">
        {dark ? <MdWbSunny size={16} /> : <MdNightlight size={16} />}
      </button>

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/3 w-80 h-80 bg-emerald-200/20 dark:bg-emerald-900/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/3 w-64 h-64 bg-teal-200/15 dark:bg-teal-900/8 rounded-full blur-3xl" />
      </div>

      <div className="w-full max-w-[380px] relative z-10 animate-fade-in-up">
        <div className="text-center mb-7">
          <div className="w-12 h-12 rounded-xl bg-emerald-600 flex items-center justify-center mx-auto mb-4 shadow-lg shadow-emerald-900/30">
            <span className="text-white font-bold text-base tracking-wider">SX</span>
          </div>
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white tracking-tight">StaffX</h1>
          <p className="text-sm text-gray-400 dark:text-gray-600 mt-1">HR Management System</p>
        </div>

        <div className="flex bg-gray-100/80 dark:bg-[#111318] border border-gray-200 dark:border-[#1e2432] rounded-xl p-1 gap-1 mb-5">
          {['admin','employee'].map(t => (
            <button key={t} onClick={() => { setTab(t); setEmail(''); setPassword(''); setError(''); }}
              className={`flex-1 flex items-center justify-center gap-2 py-2 text-sm font-medium rounded-lg transition-all
                ${tab === t
                  ? 'bg-white dark:bg-[#1a1f2c] text-gray-900 dark:text-gray-200 shadow-sm border border-gray-200 dark:border-[#252b38]'
                  : 'text-gray-500 dark:text-gray-600 hover:text-gray-700 dark:hover:text-gray-400'}`}>
              {t === 'admin' ? <MdShield size={14} /> : <MdPerson size={14} />}
              {t === 'admin' ? 'Admin' : 'Employee'}
            </button>
          ))}
        </div>

        <div className="bg-white dark:bg-[#111318] border border-gray-200 dark:border-[#1e2432] rounded-xl shadow-xl dark:shadow-2xl overflow-hidden">
          <div className="p-6">
            <form onSubmit={handleLogin} className="flex flex-col gap-3.5">
              <Input label="Email" type="email" value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder={tab === 'admin' ? 'admin@staffx.io' : 'aman@staffx.io'} required />
              <Input label="Password" type="password" value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder={tab === 'admin' ? 'admin123' : '123'} required />
              {error && (
                <div className="bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900/40 rounded-lg px-3 py-2 text-xs text-red-600 dark:text-red-400">
                  {error}
                </div>
              )}
              <Btn type="submit" size="lg" className="w-full mt-0.5" disabled={loading}>
                {loading ? 'Signing in…' : 'Sign In'}
              </Btn>
            </form>
          </div>

          <div className="px-6 pb-5 pt-3 border-t border-gray-100 dark:border-[#1a1f2c]">
            <p className="text-[11px] font-medium text-gray-400 dark:text-gray-600 uppercase tracking-wider mb-3">Demo Credentials</p>
            {tab === 'admin' ? (
              <div className="flex items-center justify-between bg-gray-50 dark:bg-[#0d1017] border border-gray-100 dark:border-[#1a1f2c] rounded-lg px-3 py-2.5">
                <span className="text-xs text-gray-500 dark:text-gray-400 font-mono">admin@staffx.io</span>
                <span className="text-xs text-emerald-600 dark:text-emerald-500 font-mono">admin123</span>
              </div>
            ) : (
              <div className="flex flex-col gap-1">
                {DEMO_EMPLOYEES.map(emp => (
                  <button key={emp.email}
                    onClick={() => { setEmail(emp.email); setPassword('123'); }}
                    className="flex items-center gap-2.5 px-3 py-2 rounded-lg hover:bg-gray-50 dark:hover:bg-[#161a22] text-left transition-colors group border border-transparent hover:border-gray-100 dark:hover:border-[#1e2432]">
                    <Avatar name={emp.name} color={emp.avatarColor} size="sm" />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium text-gray-600 dark:text-gray-400 group-hover:text-gray-800 dark:group-hover:text-gray-200 truncate">{emp.name}</p>
                      <p className="text-[11px] text-gray-400 dark:text-gray-600 truncate">{emp.email}</p>
                    </div>
                    <span className="text-[10px] text-gray-300 dark:text-gray-700 group-hover:text-gray-400 dark:group-hover:text-gray-500">Click to fill</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

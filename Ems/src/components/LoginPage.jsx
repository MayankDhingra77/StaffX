import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useData } from '../contexts/DataContext';
import { useTheme } from '../contexts/ThemeContext';
import { ADMIN_CREDENTIALS } from '../utils/data';
import { Input, Btn, Avatar } from './UI';
import { MdWbSunny, MdNightlight, MdShield, MdPerson } from 'react-icons/md';

export function LoginPage() {
  const { login } = useAuth();
  const { employees } = useData();
  const { dark, toggle } = useTheme();
  const [tab, setTab] = useState("admin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function handleLogin(e) {
    e.preventDefault();
    setError(""); setLoading(true);
    setTimeout(() => {
      if (tab === "admin") {
        if (email === ADMIN_CREDENTIALS.email && password === ADMIN_CREDENTIALS.password) login("admin", { name: "Admin", email });
        else setError("Invalid credentials. Try admin@staffx.io / admin123");
      } else {
        const emp = employees.find(em => em.email === email && em.password === password);
        if (emp) login("employee", { name: emp.name, email: emp.email, employeeId: emp.id });
        else setError("Invalid credentials. Email: name@staffx.io, Password: 123");
      }
      setLoading(false);
    }, 400);
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0d1117] flex items-center justify-center p-4 transition-colors">
      <button onClick={toggle} className="absolute top-4 right-4 p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-[#21262d] text-gray-500 transition-colors">
        {dark ? <MdWbSunny size={20} /> : <MdNightlight size={20} />}
      </button>
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-200/30 dark:bg-emerald-900/15 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-teal-200/20 dark:bg-teal-800/10 rounded-full blur-3xl" />
      </div>

      <div className="w-full max-w-md relative z-10">
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-2xl bg-emerald-600 flex items-center justify-center mx-auto mb-4 shadow-lg shadow-emerald-200 dark:shadow-emerald-900/50">
            <span className="text-white font-black text-2xl">SX</span>
          </div>
          <h1 className="text-3xl font-black text-gray-900 dark:text-white tracking-tight">StaffX</h1>
          <p className="text-gray-400 text-sm mt-1">HR Management System</p>
        </div>

        <div className="flex bg-gray-100 dark:bg-[#161b22] border border-gray-200 dark:border-[#21262d] rounded-xl p-1 gap-1 mb-6">
          {["admin","employee"].map(t => (
            <button key={t} onClick={() => { setTab(t); setEmail(""); setPassword(""); setError(""); }}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 text-sm font-semibold rounded-lg transition-all capitalize
                ${tab === t ? "bg-emerald-600 text-white shadow-md" : "text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"}`}>
              {t === "admin" ? <MdShield size={15} /> : <MdPerson size={15} />}
              {t === "admin" ? "Admin" : "Employee"}
            </button>
          ))}
        </div>

        <div className="bg-white dark:bg-[#161b22] border border-gray-200 dark:border-[#21262d] rounded-2xl p-7 shadow-xl dark:shadow-2xl">
          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            <Input label="Email" type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder={tab === "admin" ? "admin@staffx.io" : "aman@staffx.io"} required />
            <Input label="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder={tab === "admin" ? "admin123" : "123"} required />
            {error && <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800/50 rounded-lg px-3 py-2.5 text-xs text-red-600 dark:text-red-400">{error}</div>}
            <Btn type="submit" size="lg" className="w-full mt-1" disabled={loading}>
              {loading ? "Signing in…" : "Sign In"}
            </Btn>
          </form>

          <div className="mt-5 pt-5 border-t border-gray-100 dark:border-[#21262d]">
            <p className="text-xs text-gray-400 text-center mb-3">Demo Credentials</p>
            {tab === "admin" ? (
              <div className="bg-gray-50 dark:bg-[#0d1117] rounded-lg p-3 text-xs text-gray-500 font-mono flex justify-between">
                <span>admin@staffx.io</span><span className="text-emerald-600 dark:text-emerald-500">admin123</span>
              </div>
            ) : (
              <div className="flex flex-col gap-1.5">
                {employees.slice(0, 3).map(emp => (
                  <button key={emp.id} onClick={() => { setEmail(emp.email); setPassword("123"); }}
                    className="flex items-center gap-2.5 px-3 py-2 rounded-lg hover:bg-gray-50 dark:hover:bg-[#21262d] text-left transition-colors group">
                    <Avatar name={emp.name} color={emp.avatarColor} size="sm" />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium text-gray-600 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-gray-200 truncate">{emp.name}</p>
                      <p className="text-xs text-gray-400 dark:text-gray-600 truncate">{emp.email}</p>
                    </div>
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

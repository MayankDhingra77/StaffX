import { useState, useCallback } from 'react';
import { MdClose, MdCheckCircle, MdError, MdInfo } from 'react-icons/md';

export const C = {
  page:    "bg-slate-50 dark:bg-[#161b22] text-gray-900 dark:text-gray-100",
  sidebar: "bg-white dark:bg-[#0d1117] border-gray-200 dark:border-[#21262d]",
  card:    "bg-white dark:bg-[#1c2128] border border-gray-200 dark:border-[#30363d] rounded-xl",
  input:   "bg-gray-50 dark:bg-[#161b22] border border-gray-300 dark:border-[#30363d] focus:border-emerald-500 outline-none rounded-lg px-3 py-2 text-sm text-gray-800 dark:text-gray-200 placeholder:text-gray-400 dark:placeholder:text-gray-600 transition-colors w-full",
  subtext: "text-gray-500 dark:text-gray-400",
  muted:   "text-gray-400 dark:text-gray-600",
  divider: "border-gray-100 dark:border-[#21262d]",
  rowHover:"hover:bg-gray-50 dark:hover:bg-[#21262d]",
};

export function Avatar({ name = "", color = "#7c3aed", size = "md" }) {
  const initials = name.split(" ").map(n => n[0]).join("").slice(0, 2).toUpperCase();
  const sizes = { sm: "w-7 h-7 text-xs", md: "w-9 h-9 text-sm", lg: "w-14 h-14 text-xl" };
  return (
    <div className={`${sizes[size]} rounded-full flex items-center justify-center font-bold text-white shrink-0`} style={{ backgroundColor: color }}>
      {initials}
    </div>
  );
}

export function Badge({ children, className = "" }) {
  return <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${className}`}>{children}</span>;
}

export function Btn({ children, onClick, variant = "primary", size = "md", disabled = false, className = "", type = "button" }) {
  const base = "inline-flex items-center justify-center gap-1.5 font-semibold rounded-lg transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-emerald-500/40 disabled:opacity-50 disabled:pointer-events-none";
  const variants = {
    primary: "bg-emerald-600 hover:bg-emerald-700 text-white",
    outline: "border border-gray-300 dark:border-[#30363d] hover:border-emerald-500 hover:bg-gray-50 dark:hover:bg-[#21262d] text-gray-700 dark:text-gray-300",
    ghost:   "hover:bg-gray-100 dark:hover:bg-[#21262d] text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200",
    danger:  "bg-red-50 dark:bg-red-900/20 hover:bg-red-100 dark:hover:bg-red-900/30 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-800/50",
  };
  const sizes = { sm: "h-7 px-2.5 text-xs", md: "h-9 px-4 text-sm", lg: "h-11 px-6 text-base", icon: "h-8 w-8 text-sm" };
  return (
    <button type={type} onClick={onClick} disabled={disabled} className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}>
      {children}
    </button>
  );
}

export function Input({ label, type = "text", value, onChange, placeholder, required, className = "", error }) {
  return (
    <div className="flex flex-col gap-1">
      {label && <label className="text-xs text-gray-500 dark:text-gray-400 font-medium">{label}{required && <span className="text-emerald-500 ml-0.5">*</span>}</label>}
      <input type={type} value={value} onChange={onChange} placeholder={placeholder} required={required}
        className={`${C.input} ${error ? "border-red-400" : ""} ${className}`} />
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
}

export function Textarea({ label, value, onChange, placeholder, rows = 3 }) {
  return (
    <div className="flex flex-col gap-1">
      {label && <label className="text-xs text-gray-500 dark:text-gray-400 font-medium">{label}</label>}
      <textarea value={value} onChange={onChange} placeholder={placeholder} rows={rows}
        className={`${C.input} resize-none`} />
    </div>
  );
}

export function Select({ label, value, onChange, options }) {
  return (
    <div className="flex flex-col gap-1">
      {label && <label className="text-xs text-gray-500 dark:text-gray-400 font-medium">{label}</label>}
      <select value={value} onChange={e => onChange(e.target.value)} className={C.input}>
        {options.map(o => <option key={o.value ?? o} value={o.value ?? o}>{o.label ?? o}</option>)}
      </select>
    </div>
  );
}

export function Modal({ open, onClose, title, children, maxWidth = "max-w-lg" }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className={`${C.card} shadow-2xl w-full ${maxWidth} max-h-[90vh] overflow-y-auto`}>
        <div className={`flex items-center justify-between p-5 border-b ${C.divider}`}>
          <h3 className="font-bold text-base">{title}</h3>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-[#21262d] text-gray-400 transition-colors">
            <MdClose size={16} />
          </button>
        </div>
        <div className="p-5">{children}</div>
      </div>
    </div>
  );
}

export function Toast({ toasts, removeToast }) {
  return (
    <div className="fixed bottom-5 right-5 z-[100] flex flex-col gap-2">
      {toasts.map(t => (
        <div key={t.id} className={`flex items-center gap-3 px-4 py-3 rounded-xl shadow-2xl text-sm font-medium border transition-all
          ${t.type === "success" ? "bg-emerald-50 dark:bg-emerald-900/80 border-emerald-200 dark:border-emerald-700 text-emerald-800 dark:text-emerald-200"
          : t.type === "error"   ? "bg-red-50 dark:bg-red-900/80 border-red-200 dark:border-red-700 text-red-800 dark:text-red-200"
          : "bg-white dark:bg-[#1c2128] border-gray-200 dark:border-[#30363d] text-gray-700 dark:text-gray-300"}`}>
          {t.type === "success" ? <MdCheckCircle size={16} /> : t.type === "error" ? <MdError size={16} /> : <MdInfo size={16} />}
          {t.message}
          <button onClick={() => removeToast(t.id)} className="ml-1 opacity-60 hover:opacity-100"><MdClose size={14} /></button>
        </div>
      ))}
    </div>
  );
}

export function useToast() {
  const [toasts, setToasts] = useState([]);
  const toast = useCallback((message, type = "success") => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 3500);
  }, []);
  return { toasts, toast, removeToast: (id) => setToasts(prev => prev.filter(t => t.id !== id)) };
}

export function StatCard({ label, value, color = "text-emerald-500", sub }) {
  return (
    <div className={`${C.card} p-4`}>
      <p className="text-xs text-gray-500 dark:text-gray-400">{label}</p>
      <p className={`text-2xl font-black mt-1 ${color}`}>{value}</p>
      {sub && <p className={`text-xs mt-0.5 ${C.muted}`}>{sub}</p>}
    </div>
  );
}

export function StarRating({ value = 0, onChange, readOnly = false }) {
  return (
    <div className="flex gap-1">
      {[1,2,3,4,5].map(s => (
        <button key={s} type="button" onClick={() => !readOnly && onChange && onChange(s)}
          className={`text-xl transition-transform ${readOnly ? "cursor-default" : "hover:scale-110 cursor-pointer"} ${s <= value ? "text-amber-400" : "text-gray-300 dark:text-gray-600"}`}>
          ★
        </button>
      ))}
    </div>
  );
}

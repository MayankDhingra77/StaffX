import { useState, useCallback } from 'react';
import { MdClose, MdCheckCircle, MdError, MdInfo } from 'react-icons/md';

// ─── Design Tokens ───────────────────────────────────────────────────────────
export const C = {
  page:     "bg-slate-50 dark:bg-[#0a0c10] text-gray-900 dark:text-gray-100",
  sidebar:  "bg-white dark:bg-[#0d1017] border-gray-200 dark:border-[#1e2432]",
  card:     "bg-white dark:bg-[#111318] border border-gray-200/80 dark:border-[#1e2432] rounded-xl shadow-sm dark:shadow-none",
  cardHover:"bg-white dark:bg-[#111318] border border-gray-200/80 dark:border-[#1e2432] rounded-xl shadow-sm dark:shadow-none hover:border-gray-300 dark:hover:border-[#252b38] transition-colors",
  input:    "bg-gray-50 dark:bg-[#0d1017] border border-gray-200 dark:border-[#1e2432] focus:border-emerald-500 dark:focus:border-emerald-500/70 focus:ring-1 focus:ring-emerald-500/20 outline-none rounded-lg px-3 py-2 text-sm text-gray-800 dark:text-gray-200 placeholder:text-gray-400 dark:placeholder:text-gray-600 transition-all w-full",
  subtext:  "text-gray-500 dark:text-gray-400",
  muted:    "text-gray-400 dark:text-gray-600",
  divider:  "border-gray-100 dark:border-[#1a1f2c]",
  rowHover: "hover:bg-gray-50/80 dark:hover:bg-[#13161e] transition-colors",
  iconBtn:  "w-7 h-7 flex items-center justify-center rounded-md hover:bg-gray-100 dark:hover:bg-[#1a1f2c] text-gray-400 dark:text-gray-600 hover:text-gray-600 dark:hover:text-gray-300 transition-colors",
};

// ─── Avatar ───────────────────────────────────────────────────────────────────
export function Avatar({ name = "", color = "#7c3aed", size = "md" }) {
  const initials = name.split(" ").map(n => n[0]).join("").slice(0, 2).toUpperCase();
  const sizes = {
    sm:  "w-7 h-7 text-[11px]",
    md:  "w-9 h-9 text-sm",
    lg:  "w-12 h-12 text-lg",
    xl:  "w-16 h-16 text-xl"
  };
  return (
    <div
      className={`${sizes[size]} rounded-full flex items-center justify-center font-semibold text-white shrink-0 ring-2 ring-white/10`}
      style={{ backgroundColor: color }}
    >
      {initials}
    </div>
  );
}

// ─── Badge ────────────────────────────────────────────────────────────────────
export function Badge({ children, className = "" }) {
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-xs font-medium tracking-wide ${className}`}>
      {children}
    </span>
  );
}

// ─── Button ───────────────────────────────────────────────────────────────────
export function Btn({ children, onClick, variant = "primary", size = "md", disabled = false, className = "", type = "button" }) {
  const base = "inline-flex items-center justify-center gap-1.5 font-medium rounded-lg transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-offset-1 dark:focus:ring-offset-[#0a0c10] focus:ring-emerald-500/30 disabled:opacity-50 disabled:pointer-events-none select-none";
  const variants = {
    primary: "bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white shadow-sm shadow-emerald-900/20",
    outline: "border border-gray-200 dark:border-[#1e2432] hover:border-gray-300 dark:hover:border-[#252b38] hover:bg-gray-50 dark:hover:bg-[#161a22] text-gray-600 dark:text-gray-300",
    ghost:   "hover:bg-gray-100 dark:hover:bg-[#161a22] text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200",
    danger:  "bg-red-50 dark:bg-red-950/30 hover:bg-red-100 dark:hover:bg-red-950/50 text-red-600 dark:text-red-400 border border-red-200/80 dark:border-red-900/40",
  };
  const sizes = {
    sm:   "h-7 px-2.5 text-xs",
    md:   "h-8 px-3.5 text-sm",
    lg:   "h-10 px-5 text-sm",
    icon: "h-8 w-8 text-sm"
  };
  return (
    <button type={type} onClick={onClick} disabled={disabled}
      className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}>
      {children}
    </button>
  );
}

// ─── Input ────────────────────────────────────────────────────────────────────
export function Input({ label, type = "text", value, onChange, placeholder, required, className = "", error }) {
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label className="text-xs font-medium text-gray-500 dark:text-gray-400">
          {label}{required && <span className="text-emerald-500 ml-0.5">*</span>}
        </label>
      )}
      <input type={type} value={value} onChange={onChange} placeholder={placeholder} required={required}
        className={`${C.input} ${error ? "border-red-400 dark:border-red-800" : ""} ${className}`} />
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
}

// ─── Textarea ─────────────────────────────────────────────────────────────────
export function Textarea({ label, value, onChange, placeholder, rows = 3 }) {
  return (
    <div className="flex flex-col gap-1.5">
      {label && <label className="text-xs font-medium text-gray-500 dark:text-gray-400">{label}</label>}
      <textarea value={value} onChange={onChange} placeholder={placeholder} rows={rows}
        className={`${C.input} resize-none`} />
    </div>
  );
}

// ─── Select ───────────────────────────────────────────────────────────────────
export function Select({ label, value, onChange, options }) {
  return (
    <div className="flex flex-col gap-1.5">
      {label && <label className="text-xs font-medium text-gray-500 dark:text-gray-400">{label}</label>}
      <select value={value} onChange={e => onChange(e.target.value)}
        className={`${C.input} cursor-pointer`}>
        {options.map(o => <option key={o.value ?? o} value={o.value ?? o}>{o.label ?? o}</option>)}
      </select>
    </div>
  );
}

// ─── Modal ────────────────────────────────────────────────────────────────────
// On mobile: slides up from bottom as a sheet; on larger screens: centered dialog
export function Modal({ open, onClose, title, children, maxWidth = "max-w-lg" }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center sm:p-4"
      style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)' }}>
      {/* Click-outside to close */}
      <div className="absolute inset-0" onClick={onClose} />
      <div className={`
        relative ${C.card} shadow-2xl w-full ${maxWidth}
        max-h-[92vh] sm:max-h-[90vh] overflow-y-auto animate-fade-in-up
        rounded-b-none sm:rounded-xl
      `}>
        <div className={`flex items-center justify-between px-5 py-4 border-b ${C.divider} sticky top-0 bg-white dark:bg-[#111318] z-10`}>
          <h3 className="font-semibold text-sm">{title}</h3>
          <button onClick={onClose}
            className="w-7 h-7 flex items-center justify-center rounded-md hover:bg-gray-100 dark:hover:bg-[#1e2432] text-gray-400 transition-colors">
            <MdClose size={15} />
          </button>
        </div>
        <div className="p-5">{children}</div>
      </div>
    </div>
  );
}

// ─── Toast ────────────────────────────────────────────────────────────────────
export function Toast({ toasts, removeToast }) {
  return (
    // On mobile: toasts appear at top center; on desktop: bottom right
    <div className="fixed top-4 left-1/2 -translate-x-1/2 sm:translate-x-0 sm:left-auto sm:top-auto sm:bottom-5 sm:right-5 z-[100] flex flex-col gap-2 pointer-events-none w-[calc(100vw-2rem)] sm:w-auto max-w-sm sm:max-w-none">
      {toasts.map(t => (
        <div key={t.id}
          className={`pointer-events-auto flex items-center gap-2.5 pl-3.5 pr-2 py-2.5 rounded-xl shadow-2xl text-sm font-medium border backdrop-blur-sm animate-fade-in-up
            ${t.type === "success"
              ? "bg-white dark:bg-[#111318] border-emerald-200 dark:border-emerald-900/60 text-gray-800 dark:text-gray-200"
              : t.type === "error"
              ? "bg-white dark:bg-[#111318] border-red-200 dark:border-red-900/60 text-gray-800 dark:text-gray-200"
              : "bg-white dark:bg-[#111318] border-gray-200 dark:border-[#1e2432] text-gray-700 dark:text-gray-300"}`}>
          {t.type === "success"
            ? <MdCheckCircle size={16} className="text-emerald-500 shrink-0" />
            : t.type === "error"
            ? <MdError size={16} className="text-red-500 shrink-0" />
            : <MdInfo size={16} className="text-blue-500 shrink-0" />}
          <span className="flex-1">{t.message}</span>
          <button onClick={() => removeToast(t.id)}
            className="ml-1 w-6 h-6 flex items-center justify-center rounded-md hover:bg-gray-100 dark:hover:bg-[#1e2432] text-gray-400 transition-colors">
            <MdClose size={13} />
          </button>
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

// ─── StatCard ─────────────────────────────────────────────────────────────────
export function StatCard({ label, value, color = "text-emerald-500", sub, icon }) {
  return (
    <div className={`${C.card} p-4 flex flex-col gap-3`}>
      <div className="flex items-center justify-between">
        <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide leading-tight">{label}</p>
        {icon && (
          <div className="w-7 h-7 rounded-lg bg-gray-100 dark:bg-[#1a1f2c] flex items-center justify-center text-gray-400 dark:text-gray-500 shrink-0">
            {icon}
          </div>
        )}
      </div>
      <div>
        <p className={`text-2xl font-bold tracking-tight ${color}`}>{value}</p>
        {sub && <p className="text-xs mt-0.5 text-gray-400 dark:text-gray-600">{sub}</p>}
      </div>
    </div>
  );
}

// ─── StarRating ───────────────────────────────────────────────────────────────
export function StarRating({ value = 0, onChange, readOnly = false }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map(s => (
        <button key={s} type="button" onClick={() => !readOnly && onChange && onChange(s)}
          className={`text-base leading-none transition-all duration-100
            ${readOnly ? "cursor-default" : "hover:scale-125 cursor-pointer"}
            ${s <= value ? "text-amber-400" : "text-gray-200 dark:text-gray-700"}`}>
          ★
        </button>
      ))}
    </div>
  );
}

// ─── Empty State ──────────────────────────────────────────────────────────────
export function EmptyState({ icon, title, description }) {
  return (
    <div className="flex flex-col items-center justify-center py-14 px-4 text-center">
      {icon && <div className="text-3xl mb-3 opacity-30">{icon}</div>}
      <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{title}</p>
      {description && <p className="text-xs mt-1 text-gray-400 dark:text-gray-600">{description}</p>}
    </div>
  );
}

// ─── PageHeader ───────────────────────────────────────────────────────────────
// Stacks title/action vertically on small screens
export function PageHeader({ title, subtitle, action }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 pb-1">
      <div>
        <h1 className="text-xl font-semibold tracking-tight">{title}</h1>
        {subtitle && <p className={`text-sm mt-0.5 ${C.subtext}`}>{subtitle}</p>}
      </div>
      {action && <div className="flex flex-wrap gap-2">{action}</div>}
    </div>
  );
}

// ─── ConfirmDialog ─────────────────────────────────────────────────────────────
export function ConfirmDialog({ open, onClose, title, message, confirmLabel = 'Confirm', confirmVariant = 'danger', onConfirm, loading }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white dark:bg-[#111318] border border-gray-200 dark:border-[#1e2432] rounded-xl shadow-2xl w-full max-w-sm p-5 animate-fade-in-up">
        <h3 className="text-base font-semibold mb-1">{title}</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-5">{message}</p>
        <div className="flex gap-2 justify-end">
          <button onClick={onClose}
            className="px-3 py-1.5 text-sm font-medium rounded-lg border border-gray-200 dark:border-[#252b38] hover:bg-gray-50 dark:hover:bg-[#1a1f2c] transition-colors">
            Cancel
          </button>
          <button onClick={onConfirm} disabled={loading}
            className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-colors disabled:opacity-50 ${
              confirmVariant === 'danger'
                ? 'bg-red-600 hover:bg-red-700 text-white'
                : 'bg-emerald-600 hover:bg-emerald-700 text-white'
            }`}>
            {loading ? 'Processing…' : confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
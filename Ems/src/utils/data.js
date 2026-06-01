// Utility helpers — static mock data removed; API handles all data

export function formatCurrency(n) {
  if (!n && n !== 0) return '—';
  return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(n);
}

export function generateId(prefix = 'ID') {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2,6).toUpperCase()}`;
}

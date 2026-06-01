import api from './client';

export const attendanceAPI = {
  getAll: () => api.get('/attendance/all'),
  getDaily: (date) => api.get('/attendance/daily', { params: { date } }),
  getMonthly: (month) => api.get('/attendance/monthly', { params: { month } }),
  getByEmployee: (id, month) => api.get(`/attendance/employee/${id}`, { params: { month } }),
  bulkMark: (date, records) => api.post('/attendance/bulk', { date, records }),
};

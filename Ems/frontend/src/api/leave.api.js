import api from './client';

export const leaveAPI = {
  getAll: (params = {}) => api.get('/leaves', { params }),
  getMy: () => api.get('/leaves/my'),
  apply: (data) => api.post('/leaves', data),
  updateStatus: (id, status, reviewNote = '') => api.put(`/leaves/${id}/status`, { status, reviewNote }),
  cancel: (id) => api.delete(`/leaves/${id}`),
};

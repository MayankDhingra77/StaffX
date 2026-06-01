import api from './client';

export const taskAPI = {
  getAll: (params = {}) => api.get('/tasks', { params }),
  getMy: () => api.get('/tasks/my'),
  getById: (id) => api.get(`/tasks/${id}`),
  create: (data) => api.post('/tasks', data),
  update: (id, data) => api.put(`/tasks/${id}`, data),
  updateStatus: (id, status) => api.patch(`/tasks/${id}/status`, { status }),
  delete: (id) => api.delete(`/tasks/${id}`),
};

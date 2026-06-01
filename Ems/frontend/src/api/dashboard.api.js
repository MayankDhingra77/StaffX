import api from './client';

export const activityAPI = {
  getAll: (params = {}) => api.get('/activities', { params }),
};

export const dashboardAPI = {
  getStats: () => api.get('/dashboard'),
};

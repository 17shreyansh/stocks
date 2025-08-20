import api from './api';

export const adminAPI = {
    // Document management
    getAdminDocuments: (params) => api.get('/admin/documents', { params }),
    getAdminDocument: (id) => api.get(`/admin/documents/${id}`),
    updateDocumentStatus: (id, isActive) => api.put(`/admin/documents/${id}/status`, { isActive }),
    deleteDocument: (id) => api.delete(`/admin/documents/${id}`),
    
    // Policy management
    getAdminPolicies: () => api.get('/admin/policies'),
    updatePolicies: (content) => api.put('/admin/policies', { content }),
    
    // Dashboard
    getDashboardStats: () => api.get('/admin/dashboard/stats'),
    getAnalytics: (period) => api.get('/admin/analytics', { params: { period } })
};

import api from './api';

  export const createDepartment = (departmentData) => api.post('/departments', departmentData);
  export const getAllDepartments = () => api.get('/departments');
  export const getDepartmentById = (id) => api.get(`/departments/${id}`);
  export const updateDepartment = (id, departmentData) => api.put(`/departments/${id}`, departmentData);
  export const deleteDepartment = (id) => api.delete(`/departments/${id}`);
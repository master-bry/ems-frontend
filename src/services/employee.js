import api from './api';

  export const createEmployee = (employeeData) => api.post('/employees', employeeData);
  export const getAllEmployees = () => api.get('/employees');
  export const getEmployeeById = (id) => api.get(`/employees/${id}`);
  export const updateEmployee = (id, employeeData) => api.put(`/employees/${id}`, employeeData);
  export const deleteEmployee = (id) => api.delete(`/employees/${id}`);
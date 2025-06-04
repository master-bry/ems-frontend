import axios from 'axios';

  const api = axios.create({
    baseURL: '/api', // Relative to the backend context when served from Spring Boot
    withCredentials: true,
  });

  api.interceptors.request.use(
    (config) => {
      const username = localStorage.getItem('username') || 'testuser';
      const password = localStorage.getItem('password') || 'password123';
      if (username && password) {
        const basicAuth = btoa(`${username}:${password}`);
        config.headers.Authorization = `Basic ${basicAuth}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  api.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response?.status === 401) {
        localStorage.removeItem('username');
        localStorage.removeItem('password');
        window.location.href = '/login';
      }
      return Promise.reject(error);
    }
  );

  export default api;
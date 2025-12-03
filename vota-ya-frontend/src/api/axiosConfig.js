import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080', 
    'Content-Type': 'application/json',
  },
});

// INTERCEPTOR 1: Inyectar Token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// INTERCEPTOR 2: Manejar Expulsión (Token Vencido)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Si el backend dice "No autorizado", limpiamos todo y redirigimos
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;

import api from '../api/axiosConfig';

export const authService = {
  // Conecta con @PostMapping("/login") del backend
  login: async (dni, contrasena) => {
    const response = await api.post('/api/auth/login', { dni, contrasena });
    return response.data; 
  },

  // Conecta con @PostMapping("/registro") del backend
  registro: async (datosUsuario) => {
    const response = await api.post('/api/auth/registro', datosUsuario);
    return response.data;
  },

  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/login';
  }
};

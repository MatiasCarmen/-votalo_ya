import api from '../api/axiosConfig';

export const eventoService = {
  // Crear un nuevo evento
  crear: async (data) => {
    const response = await api.post('/api/admin/eventos', data);
    return response.data;
  },

  // Listar eventos activos (para el dashboard)
  listarActivos: async () => {
    const response = await api.get('/api/admin/eventos');
    return response.data;
  },

  // Listar todos (historial)
  listarTodos: async () => {
    const response = await api.get('/api/admin/eventos/todos');
    return response.data;
  },
  
  // Obtener estadísticas (usaremos esto luego)
  obtenerResultados: async (id) => {
    const response = await api.get(`/api/admin/eventos/${id}/resultados`);
    return response.data;
  }
};

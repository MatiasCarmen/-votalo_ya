import api from '../api/axiosConfig';

export const candidatoService = {
  // Registrar un nuevo candidato
  crear: async (data) => {
    // Data debe incluir: nombre, descripcion, partido, avatarUrl, eventoId
    const response = await api.post('/api/admin/candidatos', data);
    return response.data;
  },

  // Listar candidatos de un evento específico
  listarPorEvento: async (eventoId) => {
    const response = await api.get(`/api/admin/candidatos/evento/${eventoId}`);
    return response.data;
  },

  // Eliminar candidato
  eliminar: async (id) => {
    await api.delete(`/api/admin/candidatos/${id}`);
  },
  
  // Editar candidato
  editar: async (id, data) => {
    const response = await api.put(`/api/admin/candidatos/${id}`, data);
    return response.data;
  }
};

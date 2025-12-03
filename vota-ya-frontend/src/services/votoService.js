import api from '../api/axiosConfig';

export const votoService = {
  // Emitir un voto (Ruta protegida)
  votar: async (candidatoId) => {
    const response = await api.post('/api/votar', { candidatoId });
    return response.data;
  },

  // Listar eventos disponibles (Ruta protegida)
  listarEventosDisponibles: async () => {
    const response = await api.get('/api/votar/eventos');
    return response.data;
  },

  // Obtener detalles del evento (Ruta pública)
  obtenerEvento: async (id) => {
    const response = await api.get(`/api/publico/eventos/${id}`);
    return response.data;
  },

  // Obtener candidatos del evento (Ruta pública)
  listarCandidatos: async (id) => {
    const response = await api.get(`/api/publico/eventos/${id}/candidatos`);
    return response.data;
  }
};

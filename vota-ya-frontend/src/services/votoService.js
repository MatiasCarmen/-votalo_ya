import api from '../api/axiosConfig';

export const votoService = {
  // Emitir un voto
  votar: async (candidatoId) => {
    const response = await api.post('/api/votar', { candidatoId });
    return response.data;
  },

  // Obtener eventos disponibles para votar
  listarEventosDisponibles: async () => {
    const response = await api.get('/api/votar/eventos'); 
    return response.data;
  }
};

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Users, Calendar } from 'lucide-react';
import { eventoService } from '../../services/eventoService';
import { candidatoService } from '../../services/candidatoService';
import toast from 'react-hot-toast';

export const CandidatosPage = () => {
  const [eventos, setEventos] = useState([]);
  const [selectedEvento, setSelectedEvento] = useState(null);
  const [candidatos, setCandidatos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingCandidatos, setLoadingCandidatos] = useState(false);

  useEffect(() => {
    loadEventos();
  }, []);

  const loadEventos = async () => {
    try {
      setLoading(true);
      const data = await eventoService.listarTodos();
      setEventos(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error cargando eventos:', error);
      toast.error('Error al cargar eventos');
      setEventos([]);
    } finally {
      setLoading(false);
    }
  };

  const loadCandidatos = async (eventoId) => {
    try {
      setLoadingCandidatos(true);
      const data = await candidatoService.listarPorEvento(eventoId);
      setCandidatos(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error cargando candidatos:', error);
      toast.error('Error al cargar candidatos');
      setCandidatos([]);
    } finally {
      setLoadingCandidatos(false);
    }
  };

  const handleSelectEvento = (evento) => {
    setSelectedEvento(evento);
    loadCandidatos(evento.id);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="font-display text-4xl font-bold mb-2">Gestión de Candidatos</h1>
        <p className="text-slate-400">Visualiza candidatos por evento</p>
      </div>

      {loading ? (
        <div className="text-center py-20 text-slate-400">Cargando...</div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Panel Izquierdo: Lista de Eventos */}
          <div className="lg:col-span-1">
            <div className="glass-panel-dark p-6 rounded-2xl">
              <h3 className="font-bold text-white mb-4 flex items-center gap-2">
                <Calendar size={20} className="text-cyan-400" />
                Eventos
              </h3>
              <div className="space-y-2 max-h-[600px] overflow-y-auto">
                {eventos.length === 0 ? (
                  <p className="text-slate-500 text-sm text-center py-8">
                    No hay eventos disponibles
                  </p>
                ) : (
                  eventos.map((evento) => (
                    <button
                      key={evento.id}
                      onClick={() => handleSelectEvento(evento)}
                      className={`w-full text-left p-4 rounded-xl transition-all ${
                        selectedEvento?.id === evento.id
                          ? 'bg-cyan-500/20 border-2 border-cyan-500/50'
                          : 'bg-white/5 hover:bg-white/10 border-2 border-transparent'
                      }`}
                    >
                      <h4 className="font-semibold text-white text-sm mb-1">
                        {evento.nombre}
                      </h4>
                      <p className="text-xs text-slate-400">
                        {evento.activo ? '🟢 Activo' : '⚫ Inactivo'}
                      </p>
                    </button>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* Panel Derecho: Candidatos del Evento Seleccionado */}
          <div className="lg:col-span-2">
            {!selectedEvento ? (
              <div className="glass-panel-dark p-12 rounded-2xl text-center">
                <Users size={64} className="mx-auto text-slate-600 mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">
                  Selecciona un evento
                </h3>
                <p className="text-slate-400">
                  Elige un evento de la izquierda para ver sus candidatos
                </p>
              </div>
            ) : (
              <div className="glass-panel-dark p-6 rounded-2xl">
                <div className="mb-6">
                  <h3 className="font-bold text-white text-xl mb-1">
                    {selectedEvento.nombre}
                  </h3>
                  <p className="text-slate-400 text-sm">
                    {candidatos.length} candidato{candidatos.length !== 1 ? 's' : ''} registrado{candidatos.length !== 1 ? 's' : ''}
                  </p>
                </div>

                {loadingCandidatos ? (
                  <div className="text-center py-12 text-slate-400">
                    Cargando candidatos...
                  </div>
                ) : candidatos.length === 0 ? (
                  <div className="text-center py-12">
                    <Users size={48} className="mx-auto text-slate-600 mb-3" />
                    <p className="text-slate-400">
                      No hay candidatos en este evento
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {candidatos.map((candidato) => (
                      <motion.div
                        key={candidato.id}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-white/5 p-4 rounded-xl border border-white/10 hover:border-cyan-500/30 transition-all"
                      >
                        <div className="flex items-center gap-4 mb-3">
                          <div className="w-16 h-16 rounded-full bg-slate-800 overflow-hidden ring-2 ring-slate-700">
                            {candidato.avatarUrl ? (
                              <img
                                src={candidato.avatarUrl}
                                alt={candidato.nombre}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-slate-600">
                                <Users size={24} />
                              </div>
                            )}
                          </div>
                          <div className="flex-1">
                            <h4 className="font-bold text-white">
                              {candidato.nombre}
                            </h4>
                            {candidato.partido && (
                              <p className="text-xs text-cyan-400 font-semibold">
                                {candidato.partido}
                              </p>
                            )}
                          </div>
                        </div>
                        {candidato.descripcion && (
                          <p className="text-sm text-slate-400 line-clamp-2">
                            {candidato.descripcion}
                          </p>
                        )}
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

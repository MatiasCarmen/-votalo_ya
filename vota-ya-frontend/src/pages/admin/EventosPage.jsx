/**
 * VotaloYa - Gestión de Eventos
 * @author Matias Carmen - Ingeniero de Sistemas
 * @description Lista completa de eventos del sistema
 */

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, Plus, Eye, Trash2, Edit } from 'lucide-react';
import { eventoService } from '../../services/eventoService';
import { CreateEventModal } from '../../components/admin/CreateEventModal';
import { Button } from '../../components/ui/Button';
import toast from 'react-hot-toast';

export const EventosPage = () => {
  const navigate = useNavigate();
  const [eventos, setEventos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

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

  useEffect(() => {
    loadEventos();
  }, []);

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('es-ES', { 
      day: 'numeric', 
      month: 'short', 
      year: 'numeric',
      hour: '2-digit', 
      minute: '2-digit' 
    }).format(date);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-4xl font-bold mb-2">Gestión de Eventos</h1>
          <p className="text-slate-400">Administra todos los eventos de votación</p>
        </div>
        <Button onClick={() => setIsCreateModalOpen(true)}>
          <Plus size={20} />
          Crear Evento
        </Button>
      </div>

      {/* Grid de Eventos */}
      {loading ? (
        <div className="text-center py-20 text-slate-400">Cargando eventos...</div>
      ) : eventos.length === 0 ? (
        <div className="glass-panel-dark p-12 rounded-3xl text-center">
          <Calendar size={64} className="mx-auto text-slate-600 mb-4" />
          <h3 className="text-xl font-bold text-white mb-2">No hay eventos registrados</h3>
          <p className="text-slate-400 mb-6">Crea tu primer evento para comenzar</p>
          <Button onClick={() => setIsCreateModalOpen(true)}>
            <Plus size={20} />
            Crear Primer Evento
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {eventos.map((evento) => (
            <motion.div
              key={evento.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass-panel-dark p-6 rounded-2xl hover:border-cyan-500/30 transition-all"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="font-display text-xl font-bold text-white mb-2">
                    {evento.nombre}
                  </h3>
                  <p className="text-slate-400 text-sm line-clamp-2">
                    {evento.descripcion}
                  </p>
                </div>
                <div className={`px-3 py-1 rounded-full text-xs font-bold ${
                  evento.activo 
                    ? 'bg-green-500/10 text-green-400 border border-green-500/20' 
                    : 'bg-slate-500/10 text-slate-400 border border-slate-500/20'
                }`}>
                  {evento.activo ? 'Activo' : 'Inactivo'}
                </div>
              </div>

              <div className="space-y-2 mb-4 text-sm text-slate-400">
                <div className="flex items-center gap-2">
                  <Calendar size={16} />
                  <span>Inicio: {formatDate(evento.fechaInicio)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar size={16} />
                  <span>Fin: {formatDate(evento.fechaFin)}</span>
                </div>
              </div>

              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={() => navigate(`/admin/eventos/${evento.id}`)}
                  className="flex-1"
                >
                  <Eye size={18} />
                  Ver Detalles
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      <CreateEventModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onEventCreated={loadEventos}
      />
    </div>
  );
};

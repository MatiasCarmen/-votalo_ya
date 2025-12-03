import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, Users, TrendingUp, Activity, Vote, Clock } from 'lucide-react';
import { eventoService } from '../../services/eventoService';
import { CreateEventModal } from '../../components/admin/CreateEventModal';
import toast from 'react-hot-toast';

// Componente de Tarjeta Estadística (Sin cambios, solo reutilizado)
const StatCard = ({ title, value, label, icon: IconComponent, color, delay }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: delay }}
    className="p-6 rounded-3xl glass-panel-dark relative overflow-hidden group hover:-translate-y-1 transition-transform duration-300"
  >
    <div className={`absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity ${color}`}>
      <IconComponent size={80} />
    </div>
    
    <div className="relative z-10">
      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-4 ${color} bg-opacity-20`}>
        <IconComponent size={24} className="text-white" />
      </div>
      <h3 className="text-slate-400 text-sm font-medium mb-1">{title}</h3>
      <p className="font-display text-4xl font-bold text-white mb-2">{value}</p>
      <p className="text-xs text-slate-500 bg-white/5 px-2 py-1 rounded-lg inline-block">
        {label}
      </p>
    </div>
  </motion.div>
);

export const AdminDashboard = () => {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  
  // Estadísticas (por ahora solo activamos la de eventos, las demás vendran luego)
  const [stats, setStats] = useState({
    activeEvents: 0,
    totalVotes: 0,
    candidates: 0
  });

  // Función para cargar datos frescos del Backend
  const loadDashboardData = async () => {
    try {
      setLoading(true);
      // 1. Obtener eventos activos
      const activeEventsData = await eventoService.listarActivos();
      setEvents(activeEventsData);
      
      // 2. Actualizar contadores
      setStats(prev => ({
        ...prev,
        activeEvents: activeEventsData.length
      }));

    } catch (error) {
      console.error("Error cargando dashboard:", error);
      toast.error('No se pudo actualizar el panel');
    } finally {
      setLoading(false);
    }
  };

  // Cargar al iniciar
  useEffect(() => {
    loadDashboardData();
  }, []);

  // Formateador de fechas para mostrar "15 Dic 2024"
  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('es-ES', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' }).format(date);
  };

  return (
    <div className="space-y-8">
      {/* --- STATS GRID --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Eventos Activos" 
          value={loading ? "..." : stats.activeEvents} 
          label="En curso ahora" 
          icon={Calendar} 
          color="bg-primary-500" 
          delay={0.1} 
        />
        {/* Placeholder stats por ahora */}
        <StatCard title="Votos Totales" value="0" label="Esperando votación" icon={TrendingUp} color="bg-cyan-500" delay={0.2} />
        <StatCard title="Candidatos" value="0" label="Registrados" icon={Users} color="bg-purple-500" delay={0.3} />
        <StatCard title="Participación" value="0%" label="Promedio global" icon={Activity} color="bg-emerald-500" delay={0.4} />
      </div>

      {/* --- ACTIVIDAD RECIENTE (EVENTOS REALES) --- */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          className="lg:col-span-2 glass-panel-dark rounded-3xl p-8"
        >
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-display text-xl font-bold flex items-center gap-2">
              <Clock size={20} className="text-cyan-400" /> Eventos Recientes
            </h3>
            <button onClick={loadDashboardData} className="text-xs text-primary-400 hover:text-primary-300 transition-colors">
              Actualizar
            </button>
          </div>
          
          <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
            {loading ? (
              <div className="text-center py-10 text-slate-500">Cargando eventos...</div>
            ) : events.length === 0 ? (
              <div className="text-center py-10 text-slate-500 bg-white/5 rounded-2xl border border-white/5">
                <p>No hay eventos activos.</p>
                <p className="text-xs mt-1">¡Crea uno nuevo para empezar!</p>
              </div>
            ) : (
              events.map((event) => (
                <div 
                  key={event.id} 
                  onClick={() => navigate(`/admin/eventos/${event.id}`)}
                  className="flex items-center p-4 rounded-2xl bg-white/5 hover:bg-white/10 transition-colors border border-white/5 group cursor-pointer"
                >
                  {/* Icono de Calendario con día */}
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-slate-800 to-slate-700 flex flex-col items-center justify-center border border-white/10 group-hover:border-primary-500/30 transition-colors">
                    <span className="text-xs text-slate-400 uppercase">{new Date(event.fechaInicio).toLocaleString('es-ES', { month: 'short' })}</span>
                    <span className="font-bold text-white text-lg">{new Date(event.fechaInicio).getDate()}</span>
                  </div>
                  
                  <div className="ml-4 flex-1">
                    <h4 className="font-bold text-slate-200 group-hover:text-cyan-400 transition-colors">{event.nombre}</h4>
                    <p className="text-xs text-slate-500 mt-1 line-clamp-1">{event.descripcion}</p>
                    <div className="flex items-center gap-3 mt-2 text-xs text-slate-400">
                      <span>Inicio: {formatDate(event.fechaInicio)}</span>
                      <span>•</span>
                      <span>Fin: {formatDate(event.fechaFin)}</span>
                    </div>
                  </div>
                  
                  <div className="hidden sm:block px-3 py-1 rounded-full text-xs font-bold bg-green-500/10 text-green-400 border border-green-500/20 shadow-[0_0_10px_rgba(74,222,128,0.1)]">
                    Activo
                  </div>
                </div>
              ))
            )}
          </div>
        </motion.div>

        {/* --- CREAR NUEVO (CTA) --- */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6 }}
          className="glass-panel-dark rounded-3xl p-8 flex flex-col justify-center items-center text-center relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-primary-500/10 to-transparent pointer-events-none" />
          <div className="w-20 h-20 rounded-full bg-primary-500/20 flex items-center justify-center mb-4 animate-pulse-slow ring-1 ring-primary-500/30">
            <Vote size={32} className="text-primary-400" />
          </div>
          <h3 className="font-display text-xl font-bold mb-2">Crear Nuevo Evento</h3>
          <p className="text-slate-400 text-sm mb-6 max-w-[200px]">Configura una nueva votación y permite que los usuarios participen.</p>
          <button 
            onClick={() => setIsCreateModalOpen(true)}
            className="w-full py-3 px-6 rounded-xl bg-gradient-to-r from-primary-600 to-cyan-600 hover:from-primary-500 hover:to-cyan-500 text-white font-bold shadow-lg shadow-primary-900/20 transition-all transform hover:-translate-y-1"
          >
            Comenzar
          </button>
        </motion.div>
      </div>

      {/* MODAL DE CREACIÓN */}
      <CreateEventModal 
        isOpen={isCreateModalOpen} 
        onClose={() => setIsCreateModalOpen(false)}
        onEventCreated={() => {
           loadDashboardData(); // Recarga la lista automáticamente al crear
        }} 
      />
    </div>
  );
};

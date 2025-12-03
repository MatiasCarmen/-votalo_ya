/**
 * VotaloYa - Dashboard de Votante
 * @author Matias Carmen - Ingeniero de Sistemas
 * @description Panel principal para usuarios votantes
 */

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, ChevronRight, Clock } from 'lucide-react';
import { votoService } from '../../services/votoService';
import toast from 'react-hot-toast';

export const VoterDashboard = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const loadEvents = async () => {
      try {
        const data = await votoService.listarEventosDisponibles();
        setEvents(data);
      } catch (error) {
        console.error(error);
        toast.error('Error al cargar eventos');
      } finally {
        setLoading(false);
      }
    };
    loadEvents();
  }, []);

  const formatDate = (date) => new Date(date).toLocaleDateString('es-ES', { 
    day: 'numeric', month: 'long', year: 'numeric' 
  });

  return (
    <div className="space-y-8">
      <div className="text-center space-y-2 mb-12">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-display text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400"
        >
          Eventos Disponibles
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-slate-400 max-w-2xl mx-auto"
        >
          Selecciona un evento activo para ejercer tu derecho al voto. Recuerda que tu elección es definitiva.
        </motion.p>
      </div>

      {loading ? (
        <div className="text-center py-20 text-slate-500 animate-pulse">Buscando urnas...</div>
      ) : events.length === 0 ? (
        <div className="text-center py-20 glass-panel-dark rounded-3xl">
          <Calendar size={48} className="mx-auto text-slate-600 mb-4" />
          <h3 className="text-xl font-bold text-white">No hay eventos activos</h3>
          <p className="text-slate-400 mt-2">Vuelve más tarde para participar.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event, index) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              onClick={() => navigate(`/votar/evento/${event.id}`)}
              className="glass-panel-dark rounded-3xl p-6 cursor-pointer group border border-white/5 hover:border-primary-500/30 transition-all relative overflow-hidden"
            >
              {/* Indicador de Estado */}
              <div className="absolute top-4 right-4 flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-500/10 text-green-400 text-xs font-bold border border-green-500/20">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
                Abierto
              </div>

              <div className="mb-6">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 border border-white/10">
                  <VoteIcon size={24} className="text-primary-400" />
                </div>
                <h3 className="font-display text-xl font-bold text-white mb-2 leading-tight group-hover:text-primary-400 transition-colors">
                  {event.nombre}
                </h3>
                <p className="text-sm text-slate-400 line-clamp-2">
                  {event.descripcion || "Sin descripción disponible."}
                </p>
              </div>

              <div className="flex items-center justify-between pt-6 border-t border-white/5">
                <div className="text-xs text-slate-500 flex items-center gap-2">
                  <Clock size={14} /> Cierra: {formatDate(event.fechaFin)}
                </div>
                <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-slate-400 group-hover:bg-primary-500 group-hover:text-white transition-all">
                  <ChevronRight size={18} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

// Icono personalizado para variar
const VoteIcon = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 12 2 2 4-4"/><path d="M5 7c0-1.1.9-2 2-2h10a2 2 0 0 1 2 2v12H5V7Z"/><path d="M22 19H2"/></svg>
);

/**
 * VotaloYa - Detalles de Evento
 * @author Matias Carmen - Ingeniero de Sistemas
 * @description Vista detallada de evento con gestión de candidatos
 */

import { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Plus, Trash2, Calendar, Users, Trophy } from 'lucide-react';
import { candidatoService } from '../../services/candidatoService';
import { CreateCandidateModal } from '../../components/admin/CreateCandidateModal';
import { Button } from '../../components/ui/Button';
import toast from 'react-hot-toast';

export const EventDetailsPage = () => {
  const { id } = useParams(); // Obtiene el ID de la URL
  const navigate = useNavigate();
  
  const [candidatos, setCandidatos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Cargar candidatos
  const loadCandidatos = useCallback(async () => {
    try {
      setLoading(true);
      const dataCandidatos = await candidatoService.listarPorEvento(id);
      setCandidatos(dataCandidatos);
    } catch (error) {
      console.error("Error cargando candidatos:", error);
      toast.error('No se pudieron cargar los candidatos');
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    loadCandidatos();
  }, [loadCandidatos]);

  const handleDelete = async (candidateId) => {
    if(!window.confirm('¿Seguro que deseas eliminar este candidato?')) return;
    try {
      await candidatoService.eliminar(candidateId);
      toast.success('Candidato eliminado');
      loadCandidatos(); // Recargar
    } catch (error) {
      console.error(error);
      toast.error('No se pudo eliminar');
    }
  };

  return (
    <div className="space-y-8 animate-fade-in-up">
      {/* Header con Navegación */}
      <div className="flex items-center justify-between">
        <button 
          onClick={() => navigate('/admin')}
          className="flex items-center text-slate-400 hover:text-white transition-colors gap-2"
        >
          <ArrowLeft size={20} /> Volver al Panel
        </button>
        <div className="flex gap-3">
          <Button variant="outline" onClick={() => navigate(`/admin/eventos/${id}/resultados`)}>
            <Trophy size={18} /> Resultados
          </Button>
          <Button onClick={() => setIsModalOpen(true)}>
            <Plus size={18} /> Agregar Candidato
          </Button>
        </div>
      </div>

      {/* Info del Evento */}
      <div className="glass-panel-dark p-8 rounded-3xl relative overflow-hidden">
        <div className="absolute top-0 right-0 p-10 opacity-5">
          <Calendar size={200} />
        </div>
        <h1 className="font-display text-4xl font-bold mb-2">Gestión de Candidatos</h1>
        <p className="text-slate-400">Evento ID: #{id} • Configura los participantes de esta votación.</p>
      </div>

      {/* Grid de Candidatos */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          <div className="col-span-full text-center py-12">
            <p className="text-slate-500">Cargando contendientes...</p>
          </div>
        ) : candidatos.length === 0 ? (
          <div className="col-span-full py-12 text-center border border-dashed border-slate-700 rounded-3xl">
            <Users size={48} className="mx-auto text-slate-600 mb-4" />
            <p className="text-slate-400">No hay candidatos registrados aún.</p>
            <button 
              onClick={() => setIsModalOpen(true)} 
              className="text-cyan-400 font-bold mt-2 hover:underline"
            >
              Agregar el primero
            </button>
          </div>
        ) : (
          candidatos.map((candidato) => (
            <motion.div 
              key={candidato.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="glass-panel-dark p-6 rounded-2xl flex flex-col items-center text-center group border border-white/5 hover:border-cyan-500/30 transition-all"
            >
              <div className="w-24 h-24 rounded-full bg-slate-800 mb-4 overflow-hidden ring-4 ring-slate-900 shadow-xl">
                {candidato.avatarUrl ? (
                  <img 
                    src={candidato.avatarUrl} 
                    alt={candidato.nombre} 
                    className="w-full h-full object-cover" 
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-slate-600">
                    <Users size={32} />
                  </div>
                )}
              </div>
              <h3 className="font-display text-xl font-bold text-white">{candidato.nombre}</h3>
              {candidato.partido && (
                <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider mb-2">
                  {candidato.partido}
                </span>
              )}
              {candidato.descripcion && (
                <p className="text-sm text-slate-400 line-clamp-2 mb-6">{candidato.descripcion}</p>
              )}
              
              <button 
                onClick={() => handleDelete(candidato.id)}
                className="mt-auto p-2 text-red-400 hover:bg-red-500/10 rounded-lg transition-colors w-full flex justify-center gap-2 items-center text-sm"
              >
                <Trash2 size={16} /> Eliminar
              </button>
            </motion.div>
          ))
        )}
      </div>

      <CreateCandidateModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        eventoId={parseInt(id)}
        onCandidateCreated={loadCandidatos}
      />
    </div>
  );
};

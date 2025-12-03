import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, User, CheckCircle2, AlertCircle } from 'lucide-react';
import { votoService } from '../../services/votoService';
import { Modal } from '../../components/ui/Modal';
import { Button } from '../../components/ui/Button';
import toast from 'react-hot-toast';

export const VotingRoom = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [event, setEvent] = useState(null);
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Estado para la selección
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [isVoting, setIsVoting] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [eventData, candidatesData] = await Promise.all([
          votoService.obtenerEvento(id),
          votoService.listarCandidatos(id)
        ]);
        setEvent(eventData);
        setCandidates(candidatesData);
      } catch (error) {
        toast.error('Error cargando la sala de votación');
        navigate('/votar');
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [id, navigate]);

  const handleSelect = (candidate) => {
    setSelectedCandidate(candidate);
    setIsConfirmOpen(true);
  };

  const handleVote = async () => {
    if (!selectedCandidate) return;
    setIsVoting(true);
    try {
      await votoService.votar(selectedCandidate.id);
      
      // Éxito con estilo
      toast.custom((t) => (
        <div className="bg-green-500 text-white p-4 rounded-xl shadow-lg flex items-center gap-3">
          <CheckCircle2 size={24} />
          <div>
            <h3 className="font-bold">¡Voto Registrado!</h3>
            <p className="text-sm">Gracias por participar.</p>
          </div>
        </div>
      ), { duration: 3000 });

      navigate('/votar'); // Volver al dashboard
    } catch (error) {
      const msg = error.response?.data?.message || error.response?.data || "No se pudo registrar el voto";
      toast.error(msg);
    } finally {
      setIsVoting(false);
      setIsConfirmOpen(false);
    }
  };

  if (loading) return <div className="text-center py-20 text-slate-500">Cargando papeleta...</div>;

  return (
    <div className="space-y-8 animate-fade-in-up">
      {/* Header del Evento */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <button 
          onClick={() => navigate('/votar')}
          className="flex items-center text-slate-400 hover:text-white transition-colors gap-2 group"
        >
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" /> 
          Cancelar y Salir
        </button>
        <div className="text-right hidden md:block">
          <h2 className="text-slate-500 text-xs uppercase tracking-widest">Estás votando en</h2>
          <h1 className="text-2xl font-display font-bold text-white">{event?.nombre}</h1>
        </div>
      </div>

      {/* Título móvil */}
      <div className="md:hidden">
        <h1 className="text-2xl font-display font-bold text-white mb-1">{event?.nombre}</h1>
        <p className="text-slate-400 text-sm">{event?.descripcion}</p>
      </div>

      {/* Grid de Candidatos */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {candidates.map((candidate) => (
          <motion.div
            key={candidate.id}
            layoutId={candidate.id}
            onClick={() => handleSelect(candidate)}
            whileHover={{ y: -5, borderColor: 'rgba(34, 211, 238, 0.5)' }}
            className="glass-panel-dark p-6 rounded-3xl cursor-pointer border border-white/5 hover:bg-white/5 transition-all group relative overflow-hidden"
          >
            {/* Efecto de selección (si estuviera seleccionado en una lista, aquí es hover) */}
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/0 to-cyan-500/0 group-hover:from-cyan-500/5 group-hover:to-purple-500/5 transition-all duration-500" />

            <div className="relative z-10 flex flex-col items-center text-center">
              <div className="w-28 h-28 rounded-full bg-slate-800 mb-4 overflow-hidden ring-4 ring-slate-900 shadow-xl group-hover:ring-cyan-500/50 transition-all">
                {candidate.avatarUrl ? (
                  <img src={candidate.avatarUrl} alt={candidate.nombre} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-slate-600">
                    <User size={40} />
                  </div>
                )}
              </div>
              
              <h3 className="font-display text-xl font-bold text-white mb-1">{candidate.nombre}</h3>
              <span className="text-xs font-bold px-3 py-1 rounded-full bg-white/10 text-cyan-300 border border-white/10 mb-4">
                {candidate.partido || "Independiente"}
              </span>
              
              <p className="text-sm text-slate-400 line-clamp-3 mb-6">
                {candidate.descripcion || "Sin propuestas registradas."}
              </p>

              <button className="w-full py-2.5 rounded-xl bg-white/5 text-white font-medium group-hover:bg-cyan-500 group-hover:text-black transition-all">
                Seleccionar
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Modal de Confirmación */}
      <Modal 
        isOpen={isConfirmOpen} 
        onClose={() => setIsConfirmOpen(false)} 
        title="Confirmar Voto"
      >
        <div className="text-center space-y-6">
          <div className="w-24 h-24 mx-auto rounded-full overflow-hidden ring-4 ring-cyan-500 shadow-xl">
             {selectedCandidate?.avatarUrl ? (
                <img src={selectedCandidate.avatarUrl} alt={selectedCandidate.nombre} className="w-full h-full object-cover" />
             ) : (
                <div className="w-full h-full bg-slate-800 flex items-center justify-center"><User size={32} className="text-slate-600" /></div>
             )}
          </div>
          
          <div>
            <p className="text-slate-400 text-sm">Estás a punto de votar por:</p>
            <h3 className="text-2xl font-display font-bold text-white mt-1">{selectedCandidate?.nombre}</h3>
            <p className="text-cyan-400 font-medium">{selectedCandidate?.partido}</p>
          </div>

          <div className="bg-yellow-500/10 border border-yellow-500/20 p-4 rounded-xl flex items-start gap-3 text-left">
            <AlertCircle className="text-yellow-500 shrink-0" size={20} />
            <p className="text-xs text-yellow-200/80">
              Esta acción es definitiva. Una vez emitido el voto, no podrás cambiarlo ni votar nuevamente en este evento.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 pt-2">
            <Button variant="outline" onClick={() => setIsConfirmOpen(false)} disabled={isVoting}>
              Cancelar
            </Button>
            <Button 
              onClick={handleVote} 
              isLoading={isVoting}
              className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-400 hover:to-emerald-500 border-none"
            >
              ¡VOTAR AHORA!
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

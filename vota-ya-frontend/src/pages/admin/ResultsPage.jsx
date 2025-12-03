/**
 * VotaloYa - Resultados de Votación
 * @author Matias Carmen - Ingeniero de Sistemas
 * @description Podio olímpico con confeti y exportación PDF/CSV
 */

import { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import ReactCanvasConfetti from 'react-canvas-confetti';
import { ArrowLeft, Trophy, Download, FileText, Crown, Medal } from 'lucide-react';
import { eventoService } from '../../services/eventoService';
import { Button } from '../../components/ui/Button';
import toast from 'react-hot-toast';

export const ResultsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Instancia del controlador de confeti
  const [confettiInstance, setConfettiInstance] = useState(null);

  const getInstance = useCallback((instance) => {
    setConfettiInstance(instance);
  }, []);

  // Función para disparar confeti
  const fireConfetti = useCallback(() => {
    if (confettiInstance) {
      confettiInstance({
        spread: 70,
        startVelocity: 55,
        particleCount: 150,
        origin: { y: 0.6 }
      });
    }
  }, [confettiInstance]);

  useEffect(() => {
    const loadResults = async () => {
      try {
        setLoading(true);
        const data = await eventoService.obtenerResultados(id);
        setResults(data);
        
        // Si hay resultados y ganador, disparar confeti al cargar
        if (data.length > 0) {
          setTimeout(fireConfetti, 500);
        }
      } catch (error) {
        console.error(error);
        toast.error('Error al cargar resultados');
      } finally {
        setLoading(false);
      }
    };
    loadResults();
  }, [id, fireConfetti]);

  // Manejo de Descargas
  const handleDownload = async (type) => {
    try {
      toast.loading(`Generando ${type}...`);
      const blob = type === 'PDF' 
        ? await eventoService.exportarPDF(id)
        : await eventoService.exportarCSV(id);
      
      // Crear URL temporal y forzar descarga
      const url = window.URL.createObjectURL(new Blob([blob]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `resultados_evento_${id}.${type.toLowerCase()}`);
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
      
      toast.dismiss();
      toast.success(`${type} descargado exitosamente`);
    } catch (error) {
      toast.dismiss();
      toast.error(`Error al exportar ${type}`);
    }
  };

  // Asignar colores/medallas según posición
  const getPositionStyle = (index) => {
    if (index === 0) return { 
      color: 'text-yellow-400', 
      bg: 'bg-gradient-to-r from-yellow-400 to-yellow-600',
      shadow: 'shadow-yellow-500/50',
      icon: <Crown className="w-8 h-8 text-yellow-200 animate-bounce" />
    };
    if (index === 1) return { 
      color: 'text-slate-300', 
      bg: 'bg-gradient-to-r from-slate-300 to-slate-500',
      shadow: 'shadow-slate-400/50',
      icon: <Medal className="w-6 h-6 text-slate-200" />
    };
    if (index === 2) return { 
      color: 'text-amber-600', 
      bg: 'bg-gradient-to-r from-amber-600 to-amber-800',
      shadow: 'shadow-amber-600/50',
      icon: <Medal className="w-6 h-6 text-amber-200" />
    };
    return { 
      color: 'text-cyan-400', 
      bg: 'bg-slate-700',
      shadow: 'shadow-none',
      icon: <span className="text-slate-500 font-bold text-lg">#{index + 1}</span>
    };
  };

  if (loading) return <div className="text-center py-20 text-slate-500">Calculando resultados...</div>;

  const winner = results[0];
  const totalVotosEmitidos = results.reduce((acc, curr) => acc + curr.totalVotos, 0);

  return (
    <div className="space-y-8 animate-fade-in-up relative">
      {/* Componente de Confeti (Invisible hasta activarse) */}
      <ReactCanvasConfetti
        refConfetti={getInstance}
        style={{
          position: 'fixed',
          pointerEvents: 'none',
          width: '100%',
          height: '100%',
          top: 0,
          left: 0,
          zIndex: 100
        }}
      />

      {/* Header con acciones */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <button 
          onClick={() => navigate('/admin')}
          className="flex items-center text-slate-400 hover:text-white transition-colors gap-2"
        >
          <ArrowLeft size={20} /> Volver al Panel
        </button>
        
        <div className="flex gap-3">
          <Button variant="outline" onClick={() => handleDownload('CSV')}>
            <FileText size={18} /> CSV
          </Button>
          <Button onClick={() => handleDownload('PDF')}>
            <Download size={18} /> Exportar PDF
          </Button>
        </div>
      </div>

      {/* --- PODIO DEL GANADOR --- */}
      {winner && (
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="glass-panel-dark p-8 rounded-3xl text-center relative overflow-hidden border border-yellow-500/30"
        >
          {/* Fondo resplandeciente */}
          <div className="absolute top-[-50%] left-[-20%] w-[150%] h-[200%] bg-gradient-to-b from-yellow-500/10 via-transparent to-transparent animate-pulse-slow pointer-events-none" />
          
          <div className="relative z-10 flex flex-col items-center">
            <div className="mb-4 relative">
              <Crown size={64} className="text-yellow-400 drop-shadow-lg" />
              <div className="absolute inset-0 bg-yellow-400 blur-2xl opacity-20 animate-pulse" />
            </div>
            
            <h2 className="text-slate-400 uppercase tracking-widest text-sm font-bold mb-2">Ganador Electo</h2>
            <h1 className="font-display text-5xl md:text-6xl font-bold text-white mb-2">
              {winner.nombreCandidato}
            </h1>
            <p className="text-xl text-yellow-400 font-medium mb-6">
              {winner.partido}
            </p>

            <div className="flex gap-8 text-center">
              <div>
                <p className="text-3xl font-bold text-white">{winner.totalVotos}</p>
                <p className="text-xs text-slate-500 uppercase">Votos</p>
              </div>
              <div className="w-px bg-white/10" />
              <div>
                <p className="text-3xl font-bold text-white">{winner.porcentaje}%</p>
                <p className="text-xs text-slate-500 uppercase">Preferencia</p>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* --- TABLA GRÁFICA DE RESULTADOS --- */}
      <div className="glass-panel-dark p-8 rounded-3xl">
        <h3 className="font-display text-xl font-bold mb-6 flex items-center gap-2">
          <Trophy size={20} className="text-cyan-400" /> Tabla de Posiciones
        </h3>

        <div className="space-y-6">
          {results.map((candidato, index) => {
            const style = getPositionStyle(index);
            return (
              <motion.div 
                key={candidato.candidatoId}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="relative"
              >
                {/* Info Candidato */}
                <div className="flex justify-between items-end mb-2 relative z-10">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-8">
                        {style.icon}
                    </div>
                    <div>
                      <h4 className={`font-bold text-lg ${index === 0 ? 'text-white' : 'text-slate-200'}`}>
                        {candidato.nombreCandidato}
                      </h4>
                      <p className="text-xs text-slate-500">{candidato.partido}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="font-bold text-white">{candidato.porcentaje}%</span>
                    <span className="text-xs text-slate-500 ml-2">({candidato.totalVotos} votos)</span>
                  </div>
                </div>

                {/* Barra de Progreso */}
                <div className="h-4 bg-slate-800 rounded-full overflow-hidden relative">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${candidato.porcentaje}%` }}
                    transition={{ duration: 1, ease: "easeOut", delay: 0.5 }}
                    className={`h-full rounded-full ${style.bg} ${style.shadow} shadow-lg relative`}
                  >
                    {/* Efecto de brillo en la barra */}
                    <div className="absolute top-0 right-0 bottom-0 w-1 bg-white/50" />
                  </motion.div>
                </div>
              </motion.div>
            );
          })}
        </div>

        <div className="mt-8 pt-6 border-t border-white/5 text-right text-slate-500 text-sm">
          Total de votos contabilizados: <span className="text-white font-bold">{totalVotosEmitidos}</span>
        </div>
      </div>
    </div>
  );
};

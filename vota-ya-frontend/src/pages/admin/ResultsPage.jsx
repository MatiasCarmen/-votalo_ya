import { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Trophy, Download, FileText, BarChart3, Users, TrendingUp, ArrowLeft } from 'lucide-react';
import { eventoService } from '../../services/eventoService';
import { Button } from '../../components/Button';
import ReactCanvasConfetti from 'react-canvas-confetti';
import toast from 'react-hot-toast';

export const ResultsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [evento, setEvento] = useState(null);
  const [resultados, setResultados] = useState([]);
  const [loading, setLoading] = useState(true);
  const [confettiInstance, setConfettiInstance] = useState(null);

  // Cargar datos
  const loadData = useCallback(async () => {
    setLoading(true);
    try {
      const [eventoData, resultadosData] = await Promise.all([
        eventoService.obtenerEvento(id),
        eventoService.obtenerResultados(id)
      ]);
      setEvento(eventoData);
      setResultados(resultadosData);
    } catch (error) {
      console.error('Error cargando resultados:', error);
      toast.error('No se pudieron cargar los resultados');
      navigate('/admin');
    } finally {
      setLoading(false);
    }
  }, [id, navigate]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  // Confetti para el ganador
  const makeConfetti = useCallback(() => {
    if (confettiInstance) {
      confettiInstance({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
  }, [confettiInstance]);

  useEffect(() => {
    if (resultados.length > 0 && confettiInstance) {
      const timer = setTimeout(makeConfetti, 500);
      return () => clearTimeout(timer);
    }
  }, [resultados, confettiInstance, makeConfetti]);

  // Exportar CSV
  const handleExportCSV = async () => {
    try {
      const blob = await eventoService.exportarCSV(id);
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `resultados_${evento?.nombre || id}.csv`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
      toast.success('CSV descargado exitosamente');
    } catch (error) {
      toast.error('Error al exportar CSV');
      console.error(error);
    }
  };

  // Exportar PDF
  const handleExportPDF = async () => {
    try {
      const blob = await eventoService.exportarPDF(id);
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `resultados_${evento?.nombre || id}.pdf`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
      toast.success('PDF descargado exitosamente');
    } catch (error) {
      toast.error('Error al exportar PDF');
      console.error(error);
    }
  };

  // Calcular estadísticas
  const totalVotos = resultados.reduce((sum, r) => sum + r.totalVotos, 0);
  const ganador = resultados[0];

  // Colores para las barras
  const barColors = [
    'from-yellow-400 to-yellow-600', // Oro para el 1ro
    'from-slate-300 to-slate-500',   // Plata para el 2do
    'from-amber-600 to-amber-800',   // Bronce para el 3ro
    'from-cyan-500 to-cyan-700',     // Cyan para el resto
    'from-violet-500 to-violet-700',
    'from-pink-500 to-pink-700',
    'from-blue-500 to-blue-700',
    'from-green-500 to-green-700'
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6 lg:p-8">
      <ReactCanvasConfetti
        refConfetti={setConfettiInstance}
        style={{
          position: 'fixed',
          pointerEvents: 'none',
          width: '100%',
          height: '100%',
          top: 0,
          left: 0,
          zIndex: 50
        }}
      />

      {/* Header */}
      <div className="max-w-7xl mx-auto mb-8">
        <Button
          variant="outline"
          onClick={() => navigate(`/admin/eventos/${id}`)}
          className="mb-4"
        >
          <ArrowLeft size={18} />
          Volver al Evento
        </Button>

        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-panel-dark p-6 rounded-2xl"
        >
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <h1 className="text-3xl lg:text-4xl font-display font-bold text-white flex items-center gap-3">
                <Trophy className="text-yellow-400" size={36} />
                Resultados Oficiales
              </h1>
              <p className="text-slate-300 mt-2 text-lg">{evento?.nombre}</p>
            </div>

            {/* Botones de Exportación */}
            <div className="flex gap-3">
              <Button
                onClick={handleExportCSV}
                variant="outline"
                className="flex items-center gap-2"
              >
                <FileText size={18} />
                CSV
              </Button>
              <Button
                onClick={handleExportPDF}
                className="flex items-center gap-2 bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600"
              >
                <Download size={18} />
                PDF
              </Button>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Stats Cards */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass-panel-dark p-6 rounded-2xl"
        >
          <div className="flex items-center gap-4">
            <div className="p-3 bg-cyan-500/20 rounded-xl">
              <Users className="text-cyan-400" size={28} />
            </div>
            <div>
              <p className="text-slate-400 text-sm uppercase tracking-wider">Total Votos</p>
              <p className="text-3xl font-bold text-white">{totalVotos}</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-panel-dark p-6 rounded-2xl"
        >
          <div className="flex items-center gap-4">
            <div className="p-3 bg-violet-500/20 rounded-xl">
              <BarChart3 className="text-violet-400" size={28} />
            </div>
            <div>
              <p className="text-slate-400 text-sm uppercase tracking-wider">Candidatos</p>
              <p className="text-3xl font-bold text-white">{resultados.length}</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="glass-panel-dark p-6 rounded-2xl"
        >
          <div className="flex items-center gap-4">
            <div className="p-3 bg-yellow-500/20 rounded-xl">
              <TrendingUp className="text-yellow-400" size={28} />
            </div>
            <div>
              <p className="text-slate-400 text-sm uppercase tracking-wider">Participación</p>
              <p className="text-3xl font-bold text-white">{totalVotos > 0 ? '100%' : '0%'}</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Podio del Ganador */}
      {ganador && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
          className="max-w-7xl mx-auto mb-8"
        >
          <div className="glass-panel-dark p-8 rounded-2xl border-2 border-yellow-500/50 relative overflow-hidden">
            {/* Brillo de fondo */}
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/10 via-transparent to-yellow-500/10 animate-pulse"></div>
            
            <div className="relative flex flex-col md:flex-row items-center justify-center gap-6">
              <div className="p-4 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full">
                <Trophy size={48} className="text-white" />
              </div>
              
              <div className="text-center md:text-left">
                <p className="text-yellow-400 text-sm uppercase tracking-widest font-semibold mb-1">
                  🏆 Ganador 🏆
                </p>
                <h2 className="text-4xl font-display font-bold text-white mb-2">
                  {ganador.nombreCandidato}
                </h2>
                {ganador.partido && (
                  <p className="text-slate-300 text-lg mb-3">
                    Partido: <span className="font-semibold text-cyan-400">{ganador.partido}</span>
                  </p>
                )}
                <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4">
                  <div className="bg-white/10 px-6 py-3 rounded-xl backdrop-blur-sm">
                    <p className="text-3xl font-bold text-white">{ganador.totalVotos}</p>
                    <p className="text-slate-300 text-sm">votos</p>
                  </div>
                  <div className="bg-white/10 px-6 py-3 rounded-xl backdrop-blur-sm">
                    <p className="text-3xl font-bold text-yellow-400">{ganador.porcentaje.toFixed(2)}%</p>
                    <p className="text-slate-300 text-sm">del total</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Gráfico de Barras con Todos los Resultados */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="max-w-7xl mx-auto"
      >
        <div className="glass-panel-dark p-6 lg:p-8 rounded-2xl">
          <h3 className="text-2xl font-display font-bold text-white mb-6 flex items-center gap-3">
            <BarChart3 className="text-cyan-400" size={28} />
            Distribución de Votos
          </h3>

          <div className="space-y-6">
            {resultados.map((resultado, index) => {
              const maxVotos = resultados[0]?.totalVotos || 1;
              const percentage = (resultado.totalVotos / maxVotos) * 100;
              const colorClass = barColors[index] || barColors[barColors.length - 1];

              return (
                <motion.div
                  key={resultado.candidatoId}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                  className="space-y-2"
                >
                  {/* Nombre y Stats */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl font-bold text-slate-400">#{index + 1}</span>
                      <div>
                        <p className="text-white font-semibold text-lg">
                          {resultado.nombreCandidato}
                        </p>
                        {resultado.partido && (
                          <p className="text-slate-400 text-sm">{resultado.partido}</p>
                        )}
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-white">{resultado.totalVotos}</p>
                      <p className="text-cyan-400 text-sm font-semibold">
                        {resultado.porcentaje.toFixed(2)}%
                      </p>
                    </div>
                  </div>

                  {/* Barra de Progreso */}
                  <div className="relative h-8 bg-slate-800/50 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${percentage}%` }}
                      transition={{ duration: 1, delay: 0.6 + index * 0.1 }}
                      className={`h-full bg-gradient-to-r ${colorClass} rounded-full shadow-lg`}
                    >
                      <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
                    </motion.div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Mensaje si no hay votos */}
          {totalVotos === 0 && (
            <div className="text-center py-12">
              <p className="text-slate-400 text-lg">
                Aún no se han registrado votos en este evento.
              </p>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

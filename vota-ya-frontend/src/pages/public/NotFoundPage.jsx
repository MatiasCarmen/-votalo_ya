/**
 * VotaloYa - Página 404
 * @author Matias Carmen - Ingeniero de Sistemas
 * @description Página de error para rutas no encontradas
 */

import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, ArrowLeft, Search } from 'lucide-react';
import { Button } from '../../components/ui/Button';

export const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-950 text-white relative overflow-hidden flex flex-col items-center justify-center px-4">
      
      {/* Fondo Aurora */}
      <div className="absolute inset-0 w-full h-full pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-red-500/10 rounded-full blur-[120px] animate-pulse-slow" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center relative z-10 max-w-2xl"
      >
        {/* Icono de búsqueda flotante */}
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="mb-8 inline-block"
        >
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-red-500/20 to-orange-500/20 flex items-center justify-center border border-red-500/20">
            <Search size={48} className="text-red-400" />
          </div>
        </motion.div>

        <h1 className="font-display text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-orange-400 mb-4">
          404
        </h1>
        
        <h2 className="font-display text-3xl font-bold mb-4">
          Página No Encontrada
        </h2>
        
        <p className="text-slate-400 text-lg mb-8 max-w-md mx-auto">
          Lo sentimos, la página que buscas no existe o ha sido movida. Verifica la URL o regresa al inicio.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            onClick={() => navigate(-1)}
            variant="outline"
            className="border-white/20 hover:bg-white/5"
          >
            <ArrowLeft size={18} /> Volver Atrás
          </Button>
          <Button 
            onClick={() => navigate('/')}
            className="bg-gradient-to-r from-cyan-500 to-primary-600 hover:from-cyan-400 hover:to-primary-500"
          >
            <Home size={18} /> Ir al Inicio
          </Button>
        </div>
      </motion.div>

      {/* Detalles decorativos */}
      <div className="absolute bottom-8 text-center text-slate-600 text-sm">
        <p>VotaloYa © 2024 - Sistema de Votación Digital</p>
        <p className="text-xs mt-1">Desarrollado por <span className="text-cyan-500 font-semibold">Matias Carmen</span> - Ingeniero de Sistemas</p>
      </div>
    </div>
  );
};

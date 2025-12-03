/**
 * VotaloYa - Landing Page
 * @author Matias Carmen - Ingeniero de Sistemas
 * @description Página principal del sistema de votación digital
 */

import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, ShieldCheck, Globe, Zap } from 'lucide-react';
import { Button } from '../../components/ui/Button';

export const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-950 text-white relative overflow-hidden flex flex-col">
      
      {/* Navbar Simple */}
      <nav className="relative z-20 p-6 flex justify-between items-center max-w-7xl mx-auto w-full">
        <div className="font-display font-bold text-2xl tracking-wide">
          Votalo<span className="text-cyan-400">Ya</span>
        </div>
        <div className="flex gap-4">
          <button onClick={() => navigate('/login')} className="text-sm font-medium text-slate-300 hover:text-white transition-colors">
            Login
          </button>
          <button onClick={() => navigate('/registro')} className="text-sm font-medium bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg transition-colors">
            Registrarse
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="flex-1 flex flex-col items-center justify-center text-center px-4 relative z-10 mt-[-80px]">
        {/* Orbe de fondo */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary-600/20 rounded-full blur-[120px] pointer-events-none" />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto space-y-8"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 text-xs font-bold border border-cyan-500/20 mb-4">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
            </span>
            Sistema de Votación 2024
          </div>

          <h1 className="font-display text-5xl md:text-7xl font-bold leading-tight">
            Democracia Digital <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-primary-500">
              Segura y Transparente
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
            La plataforma moderna para gestionar elecciones estudiantiles, corporativas y organizacionales con integridad criptográfica y resultados en tiempo real.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Button 
              onClick={() => navigate('/registro')}
              className="h-14 px-8 text-lg bg-white text-slate-900 hover:bg-slate-200 hover:scale-105 shadow-xl shadow-white/10"
            >
              Comenzar Ahora <ArrowRight className="ml-2" />
            </Button>
            <Button 
              onClick={() => navigate('/login')}
              variant="outline"
              className="h-14 px-8 text-lg border-white/20 hover:bg-white/5"
            >
              Ya tengo cuenta
            </Button>
          </div>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto mt-24 text-left">
          <FeatureCard 
            icon={ShieldCheck} 
            title="100% Seguro" 
            desc="Cada voto es único y verificado mediante tokens encriptados." 
          />
          <FeatureCard 
            icon={Globe} 
            title="Acceso Remoto" 
            desc="Vota desde cualquier lugar y dispositivo con conexión a internet." 
          />
          <FeatureCard 
            icon={Zap} 
            title="Tiempo Real" 
            desc="Resultados y estadísticas actualizadas al instante al cerrar la votación." 
          />
        </div>
      </main>

      {/* Footer con firma */}
      <footer className="relative z-20 py-6 border-t border-white/5 text-center text-slate-500 text-sm">
        <p>VotaloYa © 2024 - Democracia Digital Segura y Transparente</p>
        <p className="mt-1">Desarrollado con ❤️ por <span className="text-cyan-400 font-semibold">Matias Carmen</span> - Ingeniero de Sistemas</p>
      </footer>
    </div>
  );
};

const FeatureCard = ({ icon: Icon, title, desc }) => (
  <motion.div 
    whileHover={{ y: -5 }}
    className="p-6 rounded-2xl bg-white/5 border border-white/5 hover:border-cyan-500/30 transition-colors"
  >
    <div className="w-12 h-12 rounded-xl bg-slate-800 flex items-center justify-center mb-4 text-cyan-400">
      <Icon size={24} />
    </div>
    <h3 className="font-display font-bold text-xl mb-2">{title}</h3>
    <p className="text-slate-400 text-sm">{desc}</p>
  </motion.div>
);

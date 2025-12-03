/**
 * VotaloYa - Layout de Votante
 * @author Matias Carmen - Ingeniero de Sistemas
 * @description Layout principal para usuarios votantes
 */

import { Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LogOut, User } from 'lucide-react';

export const VoterLayout = () => {
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans selection:bg-primary-500/30 overflow-x-hidden">
      
      {/* Fondo Aurora (Más sutil para no distraer) */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-20%] left-[20%] w-[800px] h-[800px] bg-primary-900/10 rounded-full blur-[120px] animate-pulse-slow" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-cyan-900/10 rounded-full blur-[100px]" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-5 mix-blend-overlay"></div>
      </div>

      {/* Navbar Flotante */}
      <nav className="fixed top-0 left-0 right-0 z-50 p-4">
        <div className="max-w-6xl mx-auto glass-panel-dark rounded-2xl px-6 py-3 flex justify-between items-center shadow-lg shadow-black/20">
          
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate('/votar')}>
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-500 to-cyan-400 flex items-center justify-center font-bold text-white shadow-lg shadow-primary-500/20">
              V
            </div>
            <span className="font-display font-bold text-lg tracking-wide hidden sm:block">
              Votalo<span className="text-cyan-400">Ya</span>
            </span>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/5">
              <User size={16} className="text-primary-400" />
              <span className="text-sm text-slate-300">{user?.nombre}</span>
            </div>
            
            <button 
              onClick={logout}
              className="p-2 hover:bg-red-500/10 text-slate-400 hover:text-red-400 rounded-lg transition-colors"
              title="Cerrar Sesión"
            >
              <LogOut size={20} />
            </button>
          </div>
        </div>
      </nav>

      {/* Contenido Principal */}
      <main className="relative z-10 pt-28 pb-10 px-4 max-w-6xl mx-auto min-h-screen">
        <Outlet />
      </main>

      {/* Footer Simple */}
      <footer className="relative z-10 text-center py-6 text-slate-600 text-xs">
        &copy; 2024 Votalo Ya. Sistema de Votación Seguro.
      </footer>
    </div>
  );
};

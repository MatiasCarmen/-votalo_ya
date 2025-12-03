import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { User, Lock, ArrowRight, Fingerprint, Sparkles } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import toast from 'react-hot-toast';

export const LoginPage = () => {
  const [formData, setFormData] = useState({ dni: '', contrasena: '' });
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    if (formData.dni.length !== 8) {
      toast.error('El DNI debe tener 8 dígitos exactos');
      setIsLoading(false);
      return;
    }

    const success = await login(formData.dni, formData.contrasena);
    if (success) {
        const role = localStorage.getItem('userRole');
        navigate(role === 'ADMINISTRADOR' ? '/admin' : '/votar');
    }
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center relative overflow-hidden bg-slate-950 text-white selection:bg-primary-500/30">
      
      {/* --- FONDO DINÁMICO (AURORA) --- */}
      <div className="absolute inset-0 w-full h-full">
        {/* Orbe Violeta Gigante */}
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-primary-600/30 rounded-full blur-[120px] animate-pulse-slow" />
        {/* Orbe Cyan Gigante */}
        <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-cyan-500/20 rounded-full blur-[120px] animate-pulse-slow" style={{ animationDelay: '2s' }} />
        {/* Malla de ruido sutil para textura */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 mix-blend-overlay"></div>
      </div>

      {/* --- CONTENEDOR PRINCIPAL --- */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, type: "spring" }}
        className="relative z-10 w-full max-w-5xl h-auto md:h-[600px] grid grid-cols-1 md:grid-cols-2 gap-0 rounded-3xl overflow-hidden shadow-2xl shadow-black/80 border border-white/10 glass-panel-dark mx-4"
      >
        
        {/* --- COLUMNA IZQUIERDA: VISUAL --- */}
        <div className="relative hidden md:flex flex-col justify-center p-12 bg-gradient-to-br from-primary-900/50 to-slate-900/50">
           <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
             <div className="absolute top-10 left-10 w-20 h-20 border border-white/10 rounded-full" />
             <div className="absolute bottom-20 right-20 w-32 h-32 border border-white/5 rounded-full" />
           </div>

           <motion.div 
             initial={{ x: -20, opacity: 0 }}
             animate={{ x: 0, opacity: 1 }}
             transition={{ delay: 0.3 }}
             className="z-10"
           >
             <div className="w-16 h-16 bg-gradient-to-tr from-primary-500 to-cyan-400 rounded-2xl flex items-center justify-center mb-8 shadow-lg shadow-primary-500/30">
                <Fingerprint className="text-white w-8 h-8" />
             </div>
             <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-black mb-6 leading-[1.1] tracking-tight">
               <span className="text-white block">Tu voz es</span>
               <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 via-cyan-400 to-primary-300 text-glow animate-pulse-slow block">
                 el poder
               </span>
             </h1>
             <p className="text-slate-300 text-base md:text-lg max-w-md leading-relaxed font-light">
               Bienvenido a la plataforma de votación más segura y moderna. Tu participación define el futuro.
             </p>
           </motion.div>
        </div>

        {/* --- COLUMNA DERECHA: FORMULARIO --- */}
        <div className="flex flex-col justify-center p-8 md:p-12 bg-slate-950/50 backdrop-blur-xl">
          <div className="text-center md:text-left mb-10">
            <h2 className="text-3xl font-black text-white mb-3 flex items-center gap-2 justify-center md:justify-start">
              Iniciar Sesión 
              <Sparkles className="w-6 h-6 text-cyan-400 animate-pulse" />
            </h2>
            <p className="text-slate-400 text-sm">Ingresa tus credenciales para acceder al sistema de votación.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Input DNI Personalizado Dark */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-cyan-400 uppercase tracking-wider ml-1">DNI</label>
              <div className="relative group">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-cyan-400 transition-all duration-300">
                  <User size={20} />
                </div>
                <input 
                  type="text"
                  maxLength={8}
                  placeholder="12345678"
                  value={formData.dni}
                  onChange={(e) => setFormData({...formData, dni: e.target.value})}
                  className="w-full bg-slate-900/60 border border-slate-700/50 rounded-xl py-4 pl-12 pr-4 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/30 transition-all duration-300 font-medium tracking-wide hover:bg-slate-900/80"
                />
              </div>
            </div>

            {/* Input Password Personalizado Dark */}
            <div className="space-y-2">
               <div className="flex justify-between items-center ml-1">
                 <label className="text-xs font-bold text-cyan-400 uppercase tracking-wider">Contraseña</label>
               </div>
              <div className="relative group">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-cyan-400 transition-all duration-300">
                  <Lock size={20} />
                </div>
                <input 
                  type="password"
                  placeholder="••••••••"
                  value={formData.contrasena}
                  onChange={(e) => setFormData({...formData, contrasena: e.target.value})}
                  className="w-full bg-slate-900/60 border border-slate-700/50 rounded-xl py-4 pl-12 pr-4 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/30 transition-all duration-300 font-medium hover:bg-slate-900/80"
                />
              </div>
              <div className="text-right mt-2">
                 <a href="#" className="text-xs text-slate-500 hover:text-cyan-400 transition-colors font-medium">¿Olvidaste tu contraseña?</a>
              </div>
            </div>

            <Button 
              type="submit" 
              isLoading={isLoading} 
              className="w-full bg-gradient-to-r from-primary-600 via-primary-500 to-cyan-600 hover:from-primary-500 hover:via-cyan-500 hover:to-primary-600 text-white py-4 rounded-xl font-black text-base shadow-xl shadow-primary-900/40 border-none transform hover:-translate-y-1 hover:shadow-2xl hover:shadow-cyan-500/30 transition-all duration-300 uppercase tracking-wide"
            >
              Acceder al Sistema <ArrowRight size={20} className="ml-2" />
            </Button>
          </form>

          <div className="mt-8 pt-6 border-t border-white/5 text-center text-sm text-slate-400">
            ¿Aún no tienes cuenta?{' '}
            <Link to="/registro" className="text-cyan-400 font-black hover:text-cyan-300 hover:underline transition-all duration-300">
              Regístrate ahora
            </Link>
          </div>
        </div>
      </motion.div>

      {/* Footer minimalista */}
      <div className="absolute bottom-4 text-center w-full text-slate-500 text-xs font-medium">
        &copy; 2025 Votalo Ya • Sistema Seguro de Votación
      </div>
    </div>
  );
};

import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { User, Lock, ArrowRight } from 'lucide-react';
import { Input } from '../../components/ui/Input';
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
    
    // Validación básica antes de enviar
    if (formData.dni.length !== 8) {
      toast.error('El DNI debe tener 8 dígitos');
      setIsLoading(false);
      return;
    }

    const success = await login(formData.dni, formData.contrasena);
    if (success) {
        // Redirigir según rol (lo mejoraremos luego en las rutas)
        const role = localStorage.getItem('userRole');
        navigate(role === 'ADMINISTRADOR' ? '/admin' : '/votar');
    }
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      {/* Elementos decorativos de fondo (burbujas flotantes) */}
      <div className="absolute top-20 left-20 w-72 h-72 bg-primary-400/20 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-accent-400/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="glass-panel p-8 rounded-3xl relative overflow-hidden">
          {/* Cabecera del Formulario */}
          <div className="text-center mb-8 relative z-10">
            <h1 className="font-display text-4xl font-bold bg-gradient-to-r from-primary-600 to-accent-500 bg-clip-text text-transparent mb-2">
              Votalo Ya
            </h1>
            <p className="text-slate-500">Tu voz cuenta, úsala.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
            <Input 
              icon={User}
              label="DNI"
              placeholder="Ingresa tu DNI"
              value={formData.dni}
              onChange={(e) => setFormData({...formData, dni: e.target.value})}
              maxLength={8}
            />
            
            <div className="space-y-1">
              <Input 
                icon={Lock}
                type="password"
                label="Contraseña"
                placeholder="••••••••"
                value={formData.contrasena}
                onChange={(e) => setFormData({...formData, contrasena: e.target.value})}
              />
              <div className="text-right">
                <a href="#" className="text-xs text-primary-600 hover:text-primary-700 font-medium">
                  ¿Olvidaste tu contraseña?
                </a>
              </div>
            </div>

            <Button type="submit" isLoading={isLoading} className="mt-2">
              Iniciar Sesión <ArrowRight size={18} />
            </Button>
          </form>

          {/* Footer del Formulario */}
          <div className="mt-8 text-center text-sm text-slate-500 relative z-10">
            ¿No tienes cuenta?{' '}
            <Link to="/registro" className="text-primary-600 font-bold hover:underline">
              Regístrate aquí
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

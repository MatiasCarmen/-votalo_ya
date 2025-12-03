/**
 * VotaloYa - Página de Registro
 * @author Matias Carmen - Ingeniero de Sistemas
 * @description Formulario de registro de nuevos votantes
 */

import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { User, Mail, Phone, Lock, Fingerprint, CheckCircle2 } from 'lucide-react';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { authService } from '../../services/authService';
import toast from 'react-hot-toast';

export const RegisterPage = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    nombres: '',
    apellidos: '',
    dni: '',
    numeroTelefono: '',
    correo: '',
    contrasena: '',
    rol: 'VOTANTE' // Por defecto
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    // Validar solo números para DNI y Teléfono
    if ((name === 'dni' || name === 'numeroTelefono') && !/^\d*$/.test(value)) return;
    
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validaciones rápidas
    if (formData.dni.length !== 8) return toast.error('El DNI debe tener 8 dígitos');
    if (formData.numeroTelefono.length !== 9) return toast.error('El teléfono debe tener 9 dígitos');
    if (formData.contrasena.length < 6) return toast.error('La contraseña es muy corta (min 6)');

    setIsLoading(true);
    try {
      await authService.registro(formData);
      toast.success('¡Cuenta creada con éxito! Por favor inicia sesión.');
      navigate('/login');
    } catch (error) {
      console.error(error);
      const msg = error.response?.data?.message || 'Error al registrarse';
      toast.error(msg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-slate-950 text-white relative overflow-hidden py-10 px-4">
      
      {/* Fondo Aurora */}
      <div className="absolute inset-0 w-full h-full pointer-events-none">
        <div className="absolute top-[-10%] right-[20%] w-[600px] h-[600px] bg-primary-600/20 rounded-full blur-[120px] animate-pulse-slow" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[120px]" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-2xl relative z-10"
      >
        <div className="text-center mb-8">
          <h1 className="font-display text-4xl font-bold mb-2">Únete a <span className="text-cyan-400">VotaloYa</span></h1>
          <p className="text-slate-400">Crea tu cuenta y ejerce tu derecho al voto digital.</p>
        </div>

        <div className="glass-panel-dark p-8 rounded-3xl border border-white/10 shadow-2xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Grid de Nombres */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input 
                icon={User}
                label="Nombres"
                name="nombres"
                placeholder="Ej: Juan Carlos"
                value={formData.nombres}
                onChange={handleChange}
                required
              />
              <Input 
                icon={User}
                label="Apellidos"
                name="apellidos"
                placeholder="Ej: Pérez García"
                value={formData.apellidos}
                onChange={handleChange}
                required
              />
            </div>

            {/* Grid de Identificación */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input 
                icon={Fingerprint}
                label="DNI"
                name="dni"
                placeholder="8 dígitos"
                value={formData.dni}
                onChange={handleChange}
                maxLength={8}
                required
              />
              <Input 
                icon={Phone}
                label="Celular"
                name="numeroTelefono"
                placeholder="9 dígitos"
                value={formData.numeroTelefono}
                onChange={handleChange}
                maxLength={9}
                required
              />
            </div>

            <Input 
              icon={Mail}
              type="email"
              label="Correo Electrónico"
              name="correo"
              placeholder="juan@ejemplo.com"
              value={formData.correo}
              onChange={handleChange}
              required
            />

            <Input 
              icon={Lock}
              type="password"
              label="Contraseña"
              name="contrasena"
              placeholder="Mínimo 6 caracteres"
              value={formData.contrasena}
              onChange={handleChange}
              required
            />

            <Button 
              type="submit" 
              isLoading={isLoading}
              className="w-full bg-gradient-to-r from-cyan-500 to-primary-600 hover:from-cyan-400 hover:to-primary-500 text-white font-bold py-3 shadow-lg shadow-cyan-500/20"
            >
              Crear Cuenta <CheckCircle2 size={20} />
            </Button>
          </form>

          <div className="mt-6 text-center text-sm text-slate-500">
            ¿Ya tienes una cuenta?{' '}
            <Link to="/login" className="text-cyan-400 font-bold hover:underline transition-colors">
              Inicia Sesión aquí
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

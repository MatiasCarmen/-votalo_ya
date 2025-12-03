import { useState } from 'react';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { Calendar, FileText, Type } from 'lucide-react';
import { eventoService } from '../../services/eventoService';
import toast from 'react-hot-toast';

export const CreateEventModal = ({ isOpen, onClose, onEventCreated }) => {
  const [formData, setFormData] = useState({
    nombre: '',
    descripcion: '',
    fechaInicio: '',
    fechaFin: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Validación simple de fechas
    if (new Date(formData.fechaInicio) >= new Date(formData.fechaFin)) {
      toast.error('La fecha de fin debe ser posterior a la de inicio');
      setIsLoading(false);
      return;
    }

    try {
      await eventoService.crear(formData);
      toast.success('¡Evento creado exitosamente!');
      onEventCreated?.(); // Callback para recargar la lista si es necesario
      onClose();
      // Reset del form
      setFormData({ nombre: '', descripcion: '', fechaInicio: '', fechaFin: '' });
    } catch (error) {
      console.error(error);
      toast.error('Error al crear el evento');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Crear Nuevo Evento">
      <form onSubmit={handleSubmit} className="space-y-4">
        
        {/* Nombre */}
        <div className="space-y-2">
          <label className="text-xs font-semibold text-primary-300 uppercase tracking-wider ml-1">Nombre del Evento</label>
          <div className="relative group">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-cyan-400 transition-colors">
              <Type size={20} />
            </div>
            <input 
              required
              type="text"
              placeholder="Ej: Elecciones 2025"
              value={formData.nombre}
              onChange={(e) => setFormData({...formData, nombre: e.target.value})}
              className="w-full bg-slate-900/50 border border-slate-700 rounded-xl py-3 pl-12 pr-4 text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/50 transition-all"
            />
          </div>
        </div>

        {/* Descripción */}
        <div className="space-y-2">
          <label className="text-xs font-semibold text-primary-300 uppercase tracking-wider ml-1">Descripción</label>
          <div className="relative group">
            <div className="absolute left-4 top-4 text-slate-500 group-focus-within:text-cyan-400 transition-colors">
              <FileText size={20} />
            </div>
            <textarea 
              rows="3"
              placeholder="Describe el propósito de la votación..."
              value={formData.descripcion}
              onChange={(e) => setFormData({...formData, descripcion: e.target.value})}
              className="w-full bg-slate-900/50 border border-slate-700 rounded-xl py-3 pl-12 pr-4 text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/50 transition-all resize-none"
            />
          </div>
        </div>

        {/* Fechas (Grid de 2 columnas) */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-xs font-semibold text-primary-300 uppercase tracking-wider ml-1">Inicio</label>
            <div className="relative group">
               {/* Icono decorativo, el input date tiene su propio picker */}
               <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-cyan-400 transition-colors pointer-events-none">
                  <Calendar size={18} />
               </div>
               <input 
                required
                type="datetime-local"
                value={formData.fechaInicio}
                onChange={(e) => setFormData({...formData, fechaInicio: e.target.value})}
                className="w-full bg-slate-900/50 border border-slate-700 rounded-xl py-3 pl-10 pr-2 text-white text-sm focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/50 transition-all"
                style={{ colorScheme: 'dark' }} // Truco para que el calendario del navegador sea oscuro
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-semibold text-primary-300 uppercase tracking-wider ml-1">Fin</label>
            <div className="relative group">
               <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-cyan-400 transition-colors pointer-events-none">
                  <Calendar size={18} />
               </div>
               <input 
                required
                type="datetime-local"
                value={formData.fechaFin}
                onChange={(e) => setFormData({...formData, fechaFin: e.target.value})}
                className="w-full bg-slate-900/50 border border-slate-700 rounded-xl py-3 pl-10 pr-2 text-white text-sm focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/50 transition-all"
                style={{ colorScheme: 'dark' }}
              />
            </div>
          </div>
        </div>

        <div className="pt-4">
          <Button 
            type="submit" 
            isLoading={isLoading}
            className="w-full bg-gradient-to-r from-primary-600 to-cyan-600 hover:from-primary-500 hover:to-cyan-500 text-white shadow-lg shadow-primary-900/20"
          >
            Guardar Evento
          </Button>
        </div>
      </form>
    </Modal>
  );
};

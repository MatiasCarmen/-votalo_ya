import { useState } from 'react';
import { Modal } from '../ui/Modal';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { User, FileText, Flag, Image as ImageIcon } from 'lucide-react';
import { candidatoService } from '../../services/candidatoService';
import toast from 'react-hot-toast';

export const CreateCandidateModal = ({ isOpen, onClose, eventoId, onCandidateCreated }) => {
  const [formData, setFormData] = useState({
    nombre: '',
    partido: '',
    descripcion: '',
    avatarUrl: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Enviamos el eventoId junto con los datos del form
      await candidatoService.crear({ ...formData, eventoId });
      toast.success('¡Candidato registrado exitosamente!');
      onCandidateCreated?.(); // Recargar la lista
      onClose();
      setFormData({ nombre: '', partido: '', descripcion: '', avatarUrl: '' });
    } catch (error) {
      console.error(error);
      toast.error('Error al registrar candidato');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Registrar Nuevo Candidato">
      <form onSubmit={handleSubmit} className="space-y-4">
        
        <Input 
          icon={User}
          label="Nombre Completo"
          placeholder="Ej: Ana María Torres"
          required
          value={formData.nombre}
          onChange={(e) => setFormData({...formData, nombre: e.target.value})}
        />

        <div className="grid grid-cols-2 gap-4">
          <Input 
            icon={Flag}
            label="Partido / Movimiento"
            placeholder="Ej: Frente Unido"
            value={formData.partido}
            onChange={(e) => setFormData({...formData, partido: e.target.value})}
          />
          <Input 
            icon={ImageIcon}
            label="URL Foto (Opcional)"
            placeholder="https://..."
            value={formData.avatarUrl}
            onChange={(e) => setFormData({...formData, avatarUrl: e.target.value})}
          />
        </div>

        <div className="space-y-2">
          <label className="text-xs font-semibold text-primary-300 uppercase tracking-wider ml-1">Propuesta / Descripción</label>
          <div className="relative group">
            <div className="absolute left-4 top-4 text-slate-500 group-focus-within:text-cyan-400 transition-colors">
              <FileText size={20} />
            </div>
            <textarea 
              rows="3"
              className="w-full bg-slate-900/50 border border-slate-700 rounded-xl py-3 pl-12 pr-4 text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/50 transition-all resize-none text-sm"
              placeholder="Breve descripción de sus propuestas..."
              value={formData.descripcion}
              onChange={(e) => setFormData({...formData, descripcion: e.target.value})}
            />
          </div>
        </div>

        <div className="pt-2">
          <Button type="submit" isLoading={isLoading}>
            Guardar Candidato
          </Button>
        </div>
      </form>
    </Modal>
  );
};

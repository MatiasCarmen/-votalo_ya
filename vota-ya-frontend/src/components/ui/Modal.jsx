import { AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { useEffect } from 'react';

export const Modal = ({ isOpen, onClose, title, children }) => {
  // Cerrar al presionar ESC
  useEffect(() => {
    const handleEsc = (e) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop Oscuro */}
          <div
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 transition-colors animate-in fade-in duration-200"
          />
          
          {/* Contenido del Modal */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
            <div
              className="w-full max-w-lg glass-panel-dark rounded-3xl overflow-hidden pointer-events-auto shadow-2xl shadow-primary-900/20 animate-in zoom-in-95 fade-in duration-200"
            >
              {/* Header */}
              <div className="flex justify-between items-center p-6 border-b border-white/5">
                <h3 className="font-display text-xl font-bold text-white">{title}</h3>
                <button 
                  onClick={onClose}
                  className="p-2 hover:bg-white/10 rounded-full transition-colors text-slate-400 hover:text-white"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Body */}
              <div className="p-6">
                {children}
              </div>
            </div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};

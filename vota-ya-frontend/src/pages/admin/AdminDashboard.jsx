import { useState } from 'react';
import { Calendar, Users, TrendingUp, Activity, Vote } from 'lucide-react';
import { CreateEventModal } from '../../components/admin/CreateEventModal';

const StatCard = ({ title, value, label, icon: IconComponent, color, delay }) => (
  <div 
    style={{ 
      opacity: 0,
      transform: 'translateY(20px)',
      animation: `fadeInUp 0.5s ease-out ${delay}s forwards`
    }}
    className="p-6 rounded-3xl glass-panel-dark relative overflow-hidden group hover:-translate-y-1 transition-transform duration-300"
  >
    <div className={`absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity ${color}`}>
      <IconComponent size={80} />
    </div>
    
    <div className="relative z-10">
      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-4 ${color} bg-opacity-20`}>
        <IconComponent size={24} className="text-white" />
      </div>
      <h3 className="text-slate-400 text-sm font-medium mb-1">{title}</h3>
      <p className="font-display text-4xl font-bold text-white mb-2">{value}</p>
      <p className="text-xs text-slate-500 bg-white/5 px-2 py-1 rounded-lg inline-block">
        {label}
      </p>
    </div>
  </div>
);

export const AdminDashboard = () => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  return (
    <div className="space-y-8">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Eventos Activos" 
          value="3" 
          label="+1 esta semana" 
          icon={Calendar} 
          color="bg-primary-500" 
          delay={0.1} 
        />
        <StatCard 
          title="Votos Totales" 
          value="1,240" 
          label="Actualizado hace 1m" 
          icon={TrendingUp} 
          color="bg-cyan-500" 
          delay={0.2} 
        />
        <StatCard 
          title="Candidatos" 
          value="12" 
          label="En 3 categorías" 
          icon={Users} 
          color="bg-purple-500" 
          delay={0.3} 
        />
        <StatCard 
          title="Participación" 
          value="85%" 
          label="Alta actividad" 
          icon={Activity} 
          color="bg-emerald-500" 
          delay={0.4} 
        />
      </div>

      {/* Sección de Actividad Reciente (Placeholder Estilizado) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div 
          style={{ 
            opacity: 0,
            transform: 'translateX(-20px)',
            animation: 'fadeInLeft 0.5s ease-out 0.5s forwards'
          }}
          className="lg:col-span-2 glass-panel-dark rounded-3xl p-8"
        >
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-display text-xl font-bold">Eventos Recientes</h3>
            <button className="text-sm text-cyan-400 hover:text-cyan-300 transition-colors">Ver todos</button>
          </div>
          
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center p-4 rounded-2xl bg-white/5 hover:bg-white/10 transition-colors border border-white/5 group cursor-pointer">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-slate-800 to-slate-700 flex items-center justify-center font-bold text-slate-400 group-hover:text-white transition-colors">
                  {i}
                </div>
                <div className="ml-4 flex-1">
                  <h4 className="font-bold text-slate-200">Elecciones Estudiantiles 2024</h4>
                  <p className="text-sm text-slate-500">Inicia: 15 Dic - Finaliza: 15 Dic</p>
                </div>
                <div className="px-3 py-1 rounded-full text-xs font-bold bg-green-500/20 text-green-400 border border-green-500/20">
                  Activo
                </div>
              </div>
            ))}
          </div>
        </div>

        <div 
          style={{ 
            opacity: 0,
            transform: 'translateX(20px)',
            animation: 'fadeInRight 0.5s ease-out 0.6s forwards'
          }}
          className="glass-panel-dark rounded-3xl p-8 flex flex-col justify-center items-center text-center relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-primary-500/10 to-transparent pointer-events-none" />
          <div className="w-20 h-20 rounded-full bg-primary-500/20 flex items-center justify-center mb-4 animate-pulse">
            <Vote size={32} className="text-primary-400" />
          </div>
          <h3 className="font-display text-xl font-bold mb-2">Crear Nuevo Evento</h3>
          <p className="text-slate-400 text-sm mb-6">Configura una nueva votación en minutos.</p>
          <button 
            onClick={() => setIsCreateModalOpen(true)}
            className="w-full py-3 px-6 rounded-xl bg-gradient-to-r from-primary-600 to-cyan-600 hover:from-primary-500 hover:to-cyan-500 text-white font-bold shadow-lg shadow-primary-900/20 transition-all"
          >
            Comenzar
          </button>
        </div>
      </div>

      {/* MODAL DE CREACIÓN */}
      <CreateEventModal 
        isOpen={isCreateModalOpen} 
        onClose={() => setIsCreateModalOpen(false)}
        onEventCreated={() => {
           // Aquí recargaremos los datos más tarde
           console.log("Evento creado, recargar lista...");
        }} 
      />
    </div>
  );
};

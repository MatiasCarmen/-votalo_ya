import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  LayoutDashboard, 
  Vote, 
  Users, 
  LogOut
} from 'lucide-react';

export const AdminLayout = () => {
  const { logout, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { icon: LayoutDashboard, label: 'Panel General', path: '/admin' },
    { icon: Vote, label: 'Gestión de Eventos', path: '/admin/eventos' },
    { icon: Users, label: 'Candidatos', path: '/admin/candidatos' },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans selection:bg-cyan-500/30 overflow-hidden flex">
      
      {/* --- FONDO BACKGROUND (Persistente) --- */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-primary-900/20 rounded-full blur-[120px] animate-pulse-slow" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-cyan-900/20 rounded-full blur-[100px] animate-pulse-slow" style={{ animationDelay: '3s' }} />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay"></div>
      </div>

      {/* --- SIDEBAR DE CRISTAL --- */}
      <aside className="w-20 lg:w-72 h-screen fixed left-0 top-0 z-50 border-r border-white/5 bg-slate-900/60 backdrop-blur-xl flex flex-col transition-all duration-300">
        {/* Logo Area */}
        <div className="h-24 flex items-center justify-center lg:justify-start lg:px-8 border-b border-white/5">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-cyan-400 flex items-center justify-center shadow-lg shadow-primary-500/20">
            <span className="font-display font-bold text-xl">V</span>
          </div>
          <span className="hidden lg:block ml-4 font-display font-bold text-xl tracking-wide">
            Votalo<span className="text-cyan-400">Ya</span>
          </span>
        </div>

        {/* Menu Items */}
        <nav className="flex-1 py-8 px-4 space-y-2">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className={`w-full flex items-center justify-center lg:justify-start p-4 rounded-xl transition-all duration-300 group relative overflow-hidden ${
                  isActive 
                    ? 'bg-primary-600/20 text-white shadow-lg shadow-primary-900/20 border border-primary-500/30' 
                    : 'text-slate-400 hover:bg-white/5 hover:text-white'
                }`}
              >
                <item.icon size={24} className={`transition-transform duration-300 ${isActive ? 'scale-110' : 'group-hover:scale-110'}`} />
                <span className="hidden lg:block ml-4 font-medium">{item.label}</span>
                {isActive && (
                  <div className="absolute left-0 top-0 w-1 h-full bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.5)]" />
                )}
              </button>
            );
          })}
        </nav>

        {/* User & Logout */}
        <div className="p-4 border-t border-white/5">
          <button 
            onClick={logout}
            className="w-full flex items-center justify-center lg:justify-start p-4 rounded-xl text-red-400 hover:bg-red-500/10 transition-all group"
          >
            <LogOut size={24} className="group-hover:-translate-x-1 transition-transform" />
            <span className="hidden lg:block ml-4 font-medium">Cerrar Sesión</span>
          </button>
        </div>
      </aside>

      {/* --- MAIN CONTENT AREA --- */}
      <main className="flex-1 ml-20 lg:ml-72 relative z-10 p-8 overflow-y-auto min-h-screen">
        <header className="flex justify-between items-center mb-10">
          <div>
            <h2 className="text-sm font-medium text-cyan-400 uppercase tracking-wider mb-1">Panel de Control</h2>
            <h1 className="font-display text-3xl font-bold">Hola, {user?.nombre?.split(' ')[0]} 👋</h1>
          </div>
          <div className="hidden md:flex items-center gap-4 px-4 py-2 rounded-full glass-panel-dark">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
            <span className="text-xs font-medium text-slate-300">Sistema Operativo</span>
          </div>
        </header>

        {/* Aquí se renderizan las páginas hijas (Dashboard, Eventos, etc.) */}
        <Outlet />
      </main>
    </div>
  );
};

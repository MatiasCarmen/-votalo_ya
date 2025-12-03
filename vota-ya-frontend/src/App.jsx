import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import { LoginPage } from './pages/auth/LoginPage';
import { ProtectedRoute } from './components/layout/ProtectedRoute';

// --- PLACEHOLDERS TEMPORALES (Para probar que el router funciona) ---
const AdminDashboard = () => <div className="p-10 text-2xl font-bold text-primary-700">🏆 Panel de Administrador (Próximamente)</div>;
const VoterHome = () => <div className="p-10 text-2xl font-bold text-accent-600">🗳️ Vista de Votación (Próximamente)</div>;
// -------------------------------------------------------------------

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        {/* Configuración de las notificaciones Toast */}
        <Toaster 
          position="top-right"
          toastOptions={{
            className: 'glass-panel',
            style: {
              background: 'rgba(255, 255, 255, 0.8)',
              backdropFilter: 'blur(10px)',
              color: '#1e293b',
            },
          }}
        />
        
        <Routes>
          {/* Ruta Pública */}
          <Route path="/login" element={<LoginPage />} />
          
          {/* Redirección por defecto */}
          <Route path="/" element={<Navigate to="/login" replace />} />

          {/* 🛡️ Rutas Protegidas de ADMINISTRADOR */}
          <Route element={<ProtectedRoute allowedRoles={['ADMINISTRADOR']} />}>
            <Route path="/admin" element={<AdminDashboard />} />
          </Route>

          {/* 🛡️ Rutas Protegidas de VOTANTE */}
          <Route element={<ProtectedRoute allowedRoles={['VOTANTE']} />}>
            <Route path="/votar" element={<VoterHome />} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;

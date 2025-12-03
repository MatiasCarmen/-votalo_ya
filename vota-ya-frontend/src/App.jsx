/**
 * VotaloYa - Sistema de Votación Digital
 * Desarrollado por: Matias Carmen
 * Ingeniero de Sistemas - CICLO 8
 * @author Matias Carmen
 * @description Router principal de la aplicación
 */

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import { LoginPage } from './pages/auth/LoginPage';
import { RegisterPage } from './pages/auth/RegisterPage';
import { LandingPage } from './pages/public/LandingPage';
import { NotFoundPage } from './pages/public/NotFoundPage';
import { ProtectedRoute } from './components/layout/ProtectedRoute';
import { AdminLayout } from './layouts/AdminLayout';
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { EventosPage } from './pages/admin/EventosPage';
import { CandidatosPage } from './pages/admin/CandidatosPage';
import { EventDetailsPage } from './pages/admin/EventDetailsPage';
import { ResultsPage } from './pages/admin/ResultsPage';
import { VoterLayout } from './layouts/VoterLayout';
import { VoterDashboard } from './pages/voter/VoterDashboard';
import { VotingRoom } from './pages/voter/VotingRoom';

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
              background: 'rgba(30, 41, 59, 0.9)', // Fondo oscuro para los toasts
              backdropFilter: 'blur(10px)',
              color: '#fff',
              border: '1px solid rgba(255,255,255,0.1)'
            },
          }}
        />
        
        <Routes>
          {/* 🏠 Ruta Raíz - Landing Page */}
          <Route path="/" element={<LandingPage />} />
          
          {/* 🔓 Rutas Públicas de Autenticación */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/registro" element={<RegisterPage />} />

          {/* 🛡️ Rutas Protegidas de ADMINISTRADOR con Layout */}
          <Route element={<ProtectedRoute allowedRoles={['ADMINISTRADOR']} />}>
            <Route element={<AdminLayout />}>
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/admin/eventos" element={<EventosPage />} />
              <Route path="/admin/eventos/:id" element={<EventDetailsPage />} />
              <Route path="/admin/eventos/:id/resultados" element={<ResultsPage />} />
              <Route path="/admin/candidatos" element={<CandidatosPage />} />
            </Route>
          </Route>

          {/* 🛡️ Rutas Protegidas de VOTANTE */}
          <Route element={<ProtectedRoute allowedRoles={['VOTANTE']} />}>
            <Route element={<VoterLayout />}>
              <Route path="/votar" element={<VoterDashboard />} />
              <Route path="/votar/evento/:id" element={<VotingRoom />} />
            </Route>
          </Route>

          {/* 🚫 Página 404 - Catch All */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;

/**
 * VotaloYa - Ruta Protegida
 * @author Matias Carmen - Ingeniero de Sistemas
 * @description HOC para protección de rutas por rol
 */

import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export const ProtectedRoute = ({ allowedRoles }) => {
  const { user, isAuthenticated, loading } = useAuth();

  if (loading) return null; // O podrías poner un spinner de carga aquí

  // Si no está autenticado -> Al Login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Si tiene rol pero no es el permitido -> Al Login (o a una página 403)
  if (allowedRoles && !allowedRoles.includes(user.rol)) {
    return <Navigate to="/login" replace />;
  }

  // Si todo bien -> Muestra la página hija
  return <Outlet />;
};

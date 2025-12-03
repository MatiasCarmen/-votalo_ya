import { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../services/authService';
import { toast } from 'react-hot-toast';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth debe usarse dentro de un AuthProvider');
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  // Al cargar la app, verificamos si ya había sesión guardada
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    
    if (storedUser && token) {
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    }
    setLoading(false);
  }, []);

  const login = async (dni, contrasena) => {
    try {
      const data = await authService.login(dni, contrasena);
      
      // Guardamos la sesión
      localStorage.setItem('token', data.token);
      // OJO: Tu backend devuelve 'nombresCompletos' en AuthResponse
      const userData = {
        dni: data.dni,
        nombre: data.nombresCompletos, 
        rol: data.rol,
        correo: data.correo
      };
      
      localStorage.setItem('user', JSON.stringify(userData));
      setUser(userData);
      setIsAuthenticated(true);
      
      toast.success(`¡Bienvenido, ${data.nombresCompletos.split(' ')[0]}!`);
      return true;
    } catch (error) {
      console.error(error);
      toast.error('Credenciales incorrectas o error de conexión');
      return false;
    }
  };

  const logout = () => {
    authService.logout();
    setUser(null);
    setIsAuthenticated(false);
    toast.success('Sesión cerrada correctamente');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

/**
 * ═══════════════════════════════════════════════════════════════
 *                    VOTALOYA - INFORMACIÓN DEL PROYECTO
 * ═══════════════════════════════════════════════════════════════
 * 
 * @project     VotaloYa - Sistema de Votación Digital
 * @author      Matias Carmen
 * @role        Ingeniero de Sistemas
 * @institution CICLO 8 - Herramientas de Desarrollo
 * @year        2024
 * @version     1.0.0
 * 
 * ═══════════════════════════════════════════════════════════════
 *                           DESCRIPCIÓN
 * ═══════════════════════════════════════════════════════════════
 * 
 * Sistema completo de votación digital que permite gestionar
 * elecciones estudiantiles, corporativas y organizacionales de
 * manera segura, transparente y en tiempo real.
 * 
 * Implementa autenticación JWT, gestión de roles (Administrador
 * y Votante), CRUD completo de eventos y candidatos, sala de
 * votación intuitiva y resultados con podio olímpico animado.
 * 
 * ═══════════════════════════════════════════════════════════════
 *                         TECNOLOGÍAS FRONTEND
 * ═══════════════════════════════════════════════════════════════
 * 
 * - React 18             → Biblioteca UI moderna
 * - Vite                 → Build tool ultrarrápido
 * - React Router v6      → Enrutamiento SPA
 * - Framer Motion        → Animaciones fluidas
 * - Tailwind CSS         → Estilos utility-first
 * - Axios                → Cliente HTTP
 * - React Hot Toast      → Notificaciones
 * - React Canvas Confetti → Efectos visuales
 * - Lucide React         → Iconografía moderna
 * 
 * ═══════════════════════════════════════════════════════════════
 *                         TECNOLOGÍAS BACKEND
 * ═══════════════════════════════════════════════════════════════
 * 
 * - Spring Boot 3        → Framework backend
 * - Spring Security      → Autenticación JWT
 * - Spring Data JPA      → ORM
 * - H2 Database          → Base de datos en memoria
 * - Lombok               → Reducción de boilerplate
 * - iText PDF            → Exportación de reportes
 * - Apache Commons CSV   → Exportación de datos
 * 
 * ═══════════════════════════════════════════════════════════════
 *                      CARACTERÍSTICAS DESTACADAS
 * ═══════════════════════════════════════════════════════════════
 * 
 * ✅ Landing Page épica con hero section
 * ✅ Sistema de autenticación JWT seguro
 * ✅ Panel de administrador con estadísticas en tiempo real
 * ✅ Gestión completa de eventos y candidatos
 * ✅ Sala de votación intuitiva y moderna
 * ✅ Resultados con podio olímpico y confeti automático
 * ✅ Exportación de resultados a PDF y CSV
 * ✅ Diseño "Dark Aurora" con glass morphism
 * ✅ Animaciones fluidas y transiciones elegantes
 * ✅ Responsive design (móvil, tablet, desktop)
 * ✅ Validación de un voto por usuario por evento
 * ✅ Protección de rutas por rol
 * 
 * ═══════════════════════════════════════════════════════════════
 *                        ESTRUCTURA DEL PROYECTO
 * ═══════════════════════════════════════════════════════════════
 * 
 * src/
 * ├── components/        # Componentes reutilizables
 * │   ├── ui/           # Botones, Inputs, Modals
 * │   └── layout/       # ProtectedRoute
 * ├── context/          # Context API (Auth)
 * ├── layouts/          # AdminLayout, VoterLayout
 * ├── pages/            # Páginas principales
 * │   ├── admin/        # Panel de administrador
 * │   ├── auth/         # Login, Registro
 * │   ├── public/       # Landing, 404
 * │   └── voter/        # Panel de votante
 * ├── services/         # API calls con Axios
 * ├── utils/            # Utilidades y helpers
 * ├── App.jsx           # Router principal
 * └── main.jsx          # Punto de entrada
 * 
 * ═══════════════════════════════════════════════════════════════
 *                          USUARIOS DE PRUEBA
 * ═══════════════════════════════════════════════════════════════
 * 
 * Administrador:
 *   DNI: 12345678
 *   Contraseña: admin123
 * 
 * Votante:
 *   DNI: 87654321
 *   Contraseña: votante123
 * 
 * ═══════════════════════════════════════════════════════════════
 *                          CÓMO EJECUTAR
 * ═══════════════════════════════════════════════════════════════
 * 
 * Backend (Puerto 8080):
 *   cd Votalo-ya
 *   ./mvnw spring-boot:run
 * 
 * Frontend (Puerto 5173):
 *   cd vota-ya-frontend
 *   npm install
 *   npm run dev
 * 
 * ═══════════════════════════════════════════════════════════════
 *                         CONTACTO DEL AUTOR
 * ═══════════════════════════════════════════════════════════════
 * 
 * 👨‍💻 Matias Carmen
 * 🎓 Ingeniero de Sistemas
 * 📚 CICLO 8 - Herramientas de Desarrollo
 * 📧 GitHub: @MatiasCarmen
 * 🌐 Repositorio: -votalo_ya
 * 
 * ═══════════════════════════════════════════════════════════════
 *                             LICENCIA
 * ═══════════════════════════════════════════════════════════════
 * 
 * Proyecto académico desarrollado para el curso de Herramientas
 * de Desarrollo - CICLO 8.
 * 
 * © 2024 Matias Carmen - Todos los derechos reservados.
 * 
 * ═══════════════════════════════════════════════════════════════
 * 
 *                "Democracia Digital Segura y Transparente"
 * 
 *          Desarrollado con ❤️ por Matias Carmen
 * 
 * ═══════════════════════════════════════════════════════════════
 */

// Este archivo sirve como documentación y firma del proyecto
export const PROJECT_INFO = {
  name: 'VotaloYa',
  version: '1.0.0',
  author: 'Matias Carmen',
  role: 'Ingeniero de Sistemas',
  institution: 'CICLO 8 - Herramientas de Desarrollo',
  year: 2024,
  description: 'Sistema de Votación Digital Seguro y Transparente',
  github: '@MatiasCarmen',
  repository: '-votalo_ya'
};

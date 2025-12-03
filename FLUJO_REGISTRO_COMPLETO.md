# 🎯 Flujo Completo del Sistema VotaloYa

**Desarrollado por:** Matias Carmen - Ingeniero de Sistemas

---

## 📋 Sistema 100% Completo

El sistema VotaloYa ahora cuenta con todas las piezas necesarias para un flujo completo de usuario:

### ✅ Componentes Implementados

1. **Landing Page** (`/`) - Página de inicio épica
2. **Registro** (`/registro`) - Formulario de alta de usuarios
3. **Login** (`/login`) - Autenticación con JWT
4. **Panel Admin** (`/admin`) - Dashboard con estadísticas
5. **Panel Votante** (`/votar`) - Interfaz para votar
6. **Resultados** - Podio olímpico con confetti
7. **404 Page** - Página de error elegante

---

## 🚀 Cómo Probar el Sistema Completo

### Paso 1: Iniciar los Servidores

**Backend (Puerto 8080):**

```powershell
cd "c:\Users\mathi\Desktop\CICLO 8\HERRAMIENTAS DE DESAROLLO\Votalo-ya\Votalo-ya"
./mvnw spring-boot:run
```

**Frontend (Puerto 5173):**

```powershell
cd "c:\Users\mathi\Desktop\CICLO 8\HERRAMIENTAS DE DESAROLLO\Votalo-ya\Votalo-ya\vota-ya-frontend"
npm run dev
```

### Paso 2: Acceder al Sistema

Abre tu navegador y ve a: **http://localhost:5173/**

---

## 🎨 Flujo de Usuario Nuevo

### 1. Landing Page

- Verás la portada épica con el título "Democracia Digital"
- Dos botones principales:
  - **"Comenzar Ahora"** → Te lleva al registro
  - **"Ya tengo cuenta"** → Te lleva al login
- Features destacados:
  - 🛡️ 100% Seguro
  - 🌐 Acceso Remoto
  - ⚡ Tiempo Real

### 2. Registro de Usuario

Al hacer clic en "Comenzar Ahora":

**Formulario de Registro:**

```
┌─────────────────────────────────────┐
│  Nombres:     [Juan Carlos        ] │
│  Apellidos:   [Pérez García       ] │
├─────────────────────────────────────┤
│  DNI:         [12345678] (8 dígitos)│
│  Celular:     [987654321] (9 díg.) │
├─────────────────────────────────────┤
│  Correo:      [juan@ejemplo.com   ] │
│  Contraseña:  [••••••] (min 6 car.) │
├─────────────────────────────────────┤
│  [Crear Cuenta]                      │
└─────────────────────────────────────┘
```

**Validaciones Frontend:**

- DNI: Exactamente 8 dígitos numéricos
- Teléfono: Exactamente 9 dígitos numéricos
- Contraseña: Mínimo 6 caracteres
- Correo: Formato email válido

**Respuesta Backend:**
Si todo es correcto:

```json
{
  "mensaje": "Usuario registrado exitosamente",
  "dni": "12345678",
  "nombreCompleto": "Juan Carlos Pérez García",
  "correo": "juan@ejemplo.com"
}
```

### 3. Login

Después del registro exitoso, serás redirigido al login:

```
┌─────────────────────────────┐
│  DNI:         [12345678    ]│
│  Contraseña:  [••••••      ]│
│  [Iniciar Sesión]           │
└─────────────────────────────┘
```

### 4. Acceso al Sistema

**Si eres VOTANTE (rol por defecto):**

- Serás redirigido a `/votar`
- Verás los eventos activos
- Podrás emitir tu voto

**Si eres ADMINISTRADOR:**

- Serás redirigido a `/admin`
- Verás estadísticas completas
- Podrás gestionar eventos y candidatos

---

## 🔐 Usuarios Predeterminados (DataInitializer)

El sistema crea automáticamente estos usuarios al iniciar:

### Administrador

```
DNI:         12345678
Contraseña:  admin123
Rol:         ADMINISTRADOR
Nombre:      Admin Sistema
```

### Votante de Prueba

```
DNI:         87654321
Contraseña:  votante123
Rol:         VOTANTE
Nombre:      María González
```

---

## 📊 Endpoints del Backend

### Autenticación

**POST** `/api/auth/registro`

```json
{
  "nombres": "Juan Carlos",
  "apellidos": "Pérez García",
  "dni": "12345678",
  "numeroTelefono": "987654321",
  "correo": "juan@ejemplo.com",
  "contrasena": "mipass123",
  "rol": "VOTANTE"
}
```

**POST** `/api/auth/login`

```json
{
  "dni": "12345678",
  "contrasena": "admin123"
}
```

**Respuesta Login:**

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "dni": "12345678",
  "nombreCompleto": "Admin Sistema",
  "correo": "admin@votaloya.com",
  "rol": "ADMINISTRADOR"
}
```

---

## 🎯 Flujo Completo de Votación

### Para un Usuario Nuevo

1. **Landing** → Clic en "Comenzar Ahora"
2. **Registro** → Llenar formulario y crear cuenta
3. **Login** → Ingresar con DNI y contraseña
4. **Dashboard Votante** → Ver eventos activos
5. **Sala de Votación** → Seleccionar candidato y votar
6. **Confirmación** → Ver mensaje de éxito

### Para un Administrador

1. **Login** → Ingresar como admin
2. **Dashboard** → Ver estadísticas generales
3. **Eventos** → Crear/editar eventos
4. **Candidatos** → Gestionar candidatos por evento
5. **Resultados** → Ver podio olímpico con confetti 🎉

---

## 🎨 Características de Diseño "Dark Aurora"

### Paleta de Colores

- **Fondo:** `slate-950` (Negro profundo)
- **Primario:** `cyan-400` / `cyan-500`
- **Secundario:** `primary-600`
- **Cristal:** Efecto glass morphism con `backdrop-blur`

### Animaciones

- **Orbes de fondo:** Blur con `animate-pulse-slow`
- **Hover effects:** Transiciones suaves
- **Motion:** Framer Motion para entradas
- **Confetti:** Celebración en resultados

### Tipografía

- **Display:** Inter (headings)
- **Body:** Sans-serif moderna
- **Tamaños:** Responsive con `text-5xl md:text-7xl`

---

## ✅ Checklist de Verificación

### Funcionalidad

- [ ] Landing Page se carga en http://localhost:5173/
- [ ] Botones de navegación funcionan
- [ ] Registro crea usuarios correctamente
- [ ] Validaciones frontend funcionan (DNI 8 díg, Tel 9 díg)
- [ ] Login genera JWT token
- [ ] Redirección según rol (Admin/Votante)
- [ ] Panel admin muestra estadísticas
- [ ] Panel votante muestra eventos
- [ ] Votación registra votos
- [ ] Resultados muestran podio con confetti

### Diseño

- [ ] Tema oscuro consistente
- [ ] Efectos aurora en backgrounds
- [ ] Animaciones suaves
- [ ] Responsive en móvil
- [ ] Iconos Lucide cargando
- [ ] Glass morphism aplicado
- [ ] Toasts con estilo oscuro

### Seguridad

- [ ] JWT token en LocalStorage
- [ ] Rutas protegidas por rol
- [ ] Contraseñas hasheadas (BCrypt)
- [ ] Validaciones backend
- [ ] CORS configurado
- [ ] Un voto por usuario por evento

---

## 🐛 Solución de Problemas Comunes

### Error: "events.map is not a function"

**Solución:** Ya resuelto con `@JsonIgnoreProperties` en entidades JPA

### Error: "Document nesting depth exceeds maximum"

**Solución:** Ya resuelto con `@JsonIgnoreProperties` en relaciones circulares

### Error: Backend no inicia

**Solución:** Verificar que el puerto 8080 esté libre:

```powershell
$process = Get-NetTCPConnection -LocalPort 8080 -ErrorAction SilentlyContinue | Select-Object -ExpandProperty OwningProcess -Unique
if ($process) { Stop-Process -Id $process -Force }
```

### Error: Frontend no carga estilos

**Solución:** Verificar que Tailwind esté compilando:

```powershell
npm run dev
```

---

## 📝 Notas de Desarrollo

### Stack Tecnológico

**Backend:**

- Spring Boot 4.0.0
- Spring Security + JWT
- Spring Data JPA
- H2 Database (in-memory)
- Java 22
- Maven

**Frontend:**

- React 18
- Vite 7.2.6
- React Router v6
- Tailwind CSS
- Framer Motion
- React Hot Toast
- React Canvas Confetti
- Lucide React (iconos)
- Axios

### Arquitectura

```
┌─────────────────┐      HTTP/REST      ┌──────────────────┐
│   React SPA     │ ←──────────────────→ │  Spring Boot API │
│  (Puerto 5173)  │      JWT Token       │   (Puerto 8080)  │
└─────────────────┘                      └──────────────────┘
        │                                          │
        │                                          │
        ▼                                          ▼
  LocalStorage                               H2 Database
  (Token + User)                            (In-Memory)
```

---

## 🎓 Propósito Académico

**Curso:** CICLO 8 - Herramientas de Desarrollo  
**Institución:** [Tu Universidad]  
**Proyecto:** Sistema de Votación Digital  
**Desarrollador:** Matias Carmen - Ingeniero de Sistemas  
**Año:** 2024-2025

---

## 📞 Contacto

**Desarrollador:** Matias Carmen  
**GitHub:** @MatiasCarmen  
**Repositorio:** -votalo_ya  
**Email:** [Tu email si deseas incluirlo]

---

## 🎉 Sistema Completo y Funcional

¡El sistema VotaloYa está 100% operativo! Todas las piezas están conectadas:

✅ Landing épica  
✅ Registro funcional  
✅ Login con JWT  
✅ Paneles diferenciados por rol  
✅ Votación segura  
✅ Resultados con confetti  
✅ Diseño Dark Aurora consistente  
✅ Firma profesional en todo el código

**¡A votar! 🗳️✨**

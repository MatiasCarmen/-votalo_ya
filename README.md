# Sistema de Votaciones Online - Votalo Ya

Sistema completo de votaciones online desarrollado con Spring Boot que cumple con todos los requerimientos funcionales especificados.

## 🚀 Tecnologías Utilizadas

- **Java 17**
- **Spring Boot 3.x**
- **Spring Security** con JWT
- **Spring Data JPA**
- **MySQL** (Base de datos)
- **Lombok**
- **iText PDF** (Exportación a PDF)
- **Apache Commons CSV** (Exportación a CSV)
- **Maven**

## 📋 Requerimientos Funcionales Implementados

### ✅ RQF01: Inicio de Sesión del Administrador
- Autenticación mediante DNI y contraseña
- Usuario administrador por defecto: **DNI: 12345678**, **Contraseña: admin123**

### ✅ RQF02: Gestión de Procesos de Votación
- Crear procesos de votación
- Editar procesos existentes
- Eliminar procesos
- Desactivar procesos

### ✅ RQF03: Gestión de Candidatos
- Registrar candidatos con nombre, avatar, partido y fecha de registro
- Editar candidatos
- Eliminar candidatos
- Múltiples candidatos por proceso

### ✅ RQF04: Configuración de Fechas
- Fecha de inicio del proceso electoral
- Fecha de fin del proceso electoral

### ✅ RQF05: Control de Acceso por Fechas
- Impide votar antes de la fecha de inicio
- Impide votar después de la fecha de cierre
- Mensajes informativos con las fechas

### ✅ RQF06: Autenticación de Votantes
- Login mediante DNI y contraseña
- Tokens JWT para sesiones seguras

### ✅ RQF07: Un Voto por Votante
- Validación mediante constraint único en base de datos
- Validación en lógica de negocio

### ✅ RQF08: Registro Automático de Fecha/Hora
- Timestamp automático al emitir el voto
- Utiliza `@PrePersist` de JPA

### ✅ RQF09: Visualización de Resultados
- Resultados públicos disponibles después del cierre
- Endpoint público sin autenticación

### ✅ RQF10: Interfaz de Resultados Completa
- Nombre del ganador
- Total de votos
- Porcentajes
- Datos comparativos

### ✅ RQF11: Exportación de Resultados
- Exportar a formato CSV
- Exportar a formato PDF
- Solo para administradores

### ✅ RQF12: Múltiples Procesos
- Soporte para procesos activos simultáneos
- Historial de procesos anteriores
- Consulta de todos los eventos

## 🗄️ Configuración de Base de Datos

### MySQL

1. **Instalar MySQL** si no lo tienes instalado

2. **Configurar las credenciales** en `application.properties`:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/votalo_ya?createDatabaseIfNotExist=true&useSSL=false&serverTimezone=UTC
spring.datasource.username=root
spring.datasource.password=tu_password
```

3. La base de datos **votalo_ya** se creará automáticamente

## 🛠️ Instalación y Ejecución

### Prerrequisitos
- Java 17 o superior
- Maven 3.6+
- MySQL 8.0+

### Pasos

1. **Clonar el repositorio**
```bash
cd Votalo-ya
```

2. **Configurar MySQL**
   - Editar `src/main/resources/application.properties`
   - Cambiar la contraseña de MySQL

3. **Compilar el proyecto**
```bash
mvnw clean install
```

4. **Ejecutar la aplicación**
```bash
mvnw spring-boot:run
```

La aplicación estará disponible en: `http://localhost:8080`

## 📡 Documentación de la API

### 🔐 Autenticación

#### Registro de Usuario
```http
POST /api/auth/registro
Content-Type: application/json

{
  "nombres": "Juan",
  "apellidos": "Pérez",
  "dni": "12345678",
  "numeroTelefono": "987654321",
  "correo": "juan@example.com",
  "contrasena": "password123",
  "rol": "VOTANTE"
}
```

#### Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "dni": "12345678",
  "contrasena": "admin123"
}

Response:
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "dni": "12345678",
  "rol": "ADMINISTRADOR"
}
```

### 👨‍💼 Endpoints de Administrador

**Nota:** Todos requieren header: `Authorization: Bearer {token}`

#### Crear Evento
```http
POST /api/admin/eventos
Content-Type: application/json

{
  "nombre": "Elecciones 2024",
  "descripcion": "Elecciones generales",
  "fechaInicio": "2024-01-15T08:00:00",
  "fechaFin": "2024-01-15T18:00:00"
}
```

#### Listar Todos los Eventos
```http
GET /api/admin/eventos/todos
```

#### Listar Eventos Activos
```http
GET /api/admin/eventos
```

#### Editar Evento
```http
PUT /api/admin/eventos/{id}
Content-Type: application/json

{
  "nombre": "Elecciones 2024 - Actualizado",
  "descripcion": "Descripción actualizada",
  "fechaInicio": "2024-01-15T08:00:00",
  "fechaFin": "2024-01-15T20:00:00"
}
```

#### Eliminar Evento
```http
DELETE /api/admin/eventos/{id}
```

#### Desactivar Evento
```http
PATCH /api/admin/eventos/{id}/desactivar
```

#### Crear Candidato
```http
POST /api/admin/candidatos
Content-Type: application/json

{
  "nombre": "Carlos Rodríguez",
  "descripcion": "Propuesta de gobierno",
  "partido": "Partido A",
  "avatarUrl": "https://example.com/avatar.jpg",
  "eventoId": 1
}
```

#### Listar Candidatos de un Evento
```http
GET /api/admin/candidatos/evento/{eventoId}
```

#### Editar Candidato
```http
PUT /api/admin/candidatos/{id}
Content-Type: application/json

{
  "nombre": "Carlos Rodríguez Actualizado",
  "descripcion": "Propuesta actualizada",
  "partido": "Partido A",
  "avatarUrl": "https://example.com/new-avatar.jpg",
  "eventoId": 1
}
```

#### Eliminar Candidato
```http
DELETE /api/admin/candidatos/{id}
```

#### Ver Resultados
```http
GET /api/admin/eventos/{id}/resultados
```

#### Exportar Resultados a CSV
```http
GET /api/admin/eventos/{id}/resultados/csv
```

#### Exportar Resultados a PDF
```http
GET /api/admin/eventos/{id}/resultados/pdf
```

### 🗳️ Endpoints de Votante

**Nota:** Requiere header: `Authorization: Bearer {token}`

#### Emitir Voto
```http
POST /api/votar
Content-Type: application/json

{
  "candidatoId": 1
}
```

### 🌐 Endpoints Públicos

**Nota:** No requieren autenticación

#### Listar Eventos Activos
```http
GET /api/publico/eventos/activos
```

#### Ver Evento
```http
GET /api/publico/eventos/{id}
```

#### Ver Candidatos de un Evento
```http
GET /api/publico/eventos/{id}/candidatos
```

#### Ver Resultados (solo después del cierre)
```http
GET /api/publico/eventos/{id}/resultados

Response:
{
  "evento": { ... },
  "resultados": [
    {
      "candidatoId": 1,
      "nombreCandidato": "Carlos Rodríguez",
      "partido": "Partido A",
      "totalVotos": 150,
      "porcentaje": 60.0
    }
  ],
  "ganador": {
    "candidatoId": 1,
    "nombreCandidato": "Carlos Rodríguez",
    "partido": "Partido A",
    "totalVotos": 150,
    "porcentaje": 60.0
  },
  "totalVotos": 250
}
```

## 👥 Usuarios por Defecto

### Administrador
- **DNI:** 12345678
- **Contraseña:** admin123
- **Email:** admin@votaloya.com

### Votantes de Ejemplo
1. **DNI:** 87654321, **Contraseña:** votante123
2. **DNI:** 11223344, **Contraseña:** votante123

## 🔒 Seguridad

- **JWT (JSON Web Tokens)** para autenticación
- **BCrypt** para encriptación de contraseñas
- **CORS** configurado
- **Roles**: ADMINISTRADOR y VOTANTE
- **Validaciones** en todos los endpoints

## 📊 Modelo de Datos

### Entidades Principales

1. **Usuario**
   - Nombres, Apellidos, DNI (único)
   - Teléfono, Correo (único)
   - Contraseña (encriptada)
   - Rol (ADMINISTRADOR/VOTANTE)

2. **Evento**
   - Nombre, Descripción
   - Fecha Inicio, Fecha Fin
   - Activo (boolean)
   - Creador (Usuario)
   - Fecha Creación

3. **Candidato**
   - Nombre, Descripción
   - Partido, Avatar URL
   - Fecha Registro
   - Evento

4. **Voto**
   - Votante (Usuario)
   - Candidato
   - Evento
   - Fecha Voto
   - **Constraint único**: (votante_id, evento_id)

## 🐛 Manejo de Errores

El sistema incluye manejo de errores para:
- Intentar votar fuera del período electoral
- Intentar votar más de una vez
- Acceso no autorizado
- Validaciones de datos
- Eventos o candidatos no encontrados

## 📝 Logs

Los logs están configurados en nivel DEBUG para:
- `com.votaloya`
- `org.springframework.security`

## 🤝 Contribución

Este es un proyecto académico. Para contribuir:
1. Fork el proyecto
2. Crea una rama para tu feature
3. Commit tus cambios
4. Push a la rama
5. Abre un Pull Request

## 📄 Licencia

Proyecto académico - Sistema de Votaciones Online

## 📞 Contacto

Para dudas o soporte, contactar al administrador del sistema.

---

**Desarrollado con ❤️ usando Spring Boot**


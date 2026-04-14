# Intranet Backend JFR 🚀

Este es el backend para el sistema de Intranet JFR, desarrollado con **NestJS**, diseñado para gestionar reuniones, tareas y usuarios de manera eficiente dentro de una organización o comunidad.

## 🛠️ Tecnologías Principales

- **Framework:** [NestJS](https://nestjs.com/) (v11+)
- **Lenguaje:** [TypeScript](https://www.typescriptlang.org/)
- **ORM:** [Prisma](https://www.prisma.io/)
- **Base de Datos:** [PostgreSQL](https://www.postgresql.org/)
- **Autenticación:** [Passport.js](https://www.passportjs.org/) & JWT
- **Seguridad:** [Bcrypt](https://github.com/kelektiv/node.bcrypt.js) para el hashing de contraseñas
- **Validación:** [class-validator](https://github.com/typestack/class-validator) & [class-transformer](https://github.com/typestack/class-transformer)

## ✨ Características

- **Autenticación y Autorización:**
  - Registro e inicio de sesión de usuarios.
  - Protección de rutas mediante JWT.
  - Sistema de roles: `ADMIN`, `VOCERO` y `HABITANTE`.
- **Gestión de Reuniones:**
  - Creación, edición y visualización de reuniones.
  - Vinculación de tareas específicas a cada reunión.
- **Gestión de Tareas:**
  - Asignación de tareas a usuarios.
  - Niveles de prioridad: `BAJA`, `MEDIA`, `ALTA`, `URGENTE`.
  - Estados de tarea: `PENDIENTE`, `EN_PROGRESO`, `COMPLETADA`, `BLOQUEADA`.
  - Fechas de vencimiento.
- **Subtareas:**
  - Desglose de tareas principales en subtareas accionables.
- **Dashboard:**
  - Módulo dedicado para visualización de estadísticas y métricas del sistema.

## 📂 Estructura del Proyecto

```text
src/
├── auth/           # Lógica de autenticación (JWT, Passport, Roles)
├── user/           # Gestión de usuarios y perfiles
├── meetings/       # Módulo de reuniones
├── tasks/          # Módulo de tareas principales
├── sub-tasks/      # Módulo de subtareas
├── dashboard/      # Estadísticas y métricas
├── prisma.service/ # Integración con Prisma ORM
├── main.ts         # Punto de entrada de la aplicación
└── app.module.ts   # Módulo raíz
```

## 🚀 Instalación y Configuración

### 1. Clonar el repositorio

```bash
git clone <url-del-repositorio>
cd intranet-backend-jfr
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Configurar variables de entorno

Crea un archivo `.env` en la raíz del proyecto y configura las siguientes variables (puedes usar el ejemplo a continuación):

```env
PORT=3000
DATABASE_URL="postgresql://USUARIO:PASSWORD@localhost:5432/intranet_jfr?schema=public"
JWT_SECRET="tu_clave_secreta_super_segura"
CORS_ORIGINS=http://localhost:5173,http://localhost:3000
```

### 4. Configurar la Base de Datos con Prisma

Genera el cliente de Prisma y sincroniza el esquema con tu base de datos PostgreSQL:

```bash
npx prisma generate
npx prisma db push
```

## 📖 Scripts Disponibles

- `npm run start`: Inicia la aplicación.
- `npm run start:dev`: Inicia en modo desarrollo con recarga automática (watch mode).
- `npm run start:prod`: Inicia la aplicación en modo producción después de construirla.
- `npm run build`: Compila el proyecto en la carpeta `dist/`.
- `npm run lint`: Ejecuta el linter para asegurar la calidad del código.
- `npm run test`: Ejecuta las pruebas unitarias.

## 📊 Modelo de Datos (Prisma)

El sistema cuenta con cuatro modelos principales:

1.  **User**: Almacena información de contacto, credenciales y roles.
2.  **Meeting**: Define las reuniones grupales.
3.  **Task**: Tareas asociadas a reuniones y asignadas a usuarios.
4.  **SubTask**: Pasos detallados dentro de una tarea.

## 🔒 Seguridad y CORS

La API está configurada con CORS habilitado para los dominios especificados en el archivo `.env`. Todas las entradas son validadas globalmente mediante `ValidationPipe` de NestJS, asegurando que los datos recibidos cumplan con los DTOs definidos.

---

# Doonamis Frontend

Aplicación web desarrollada con Vue 3 y TypeScript para la gestión de usuarios de Doonamis.

## Tecnologías

- **Vue 3** - Framework de JavaScript progresivo
- **TypeScript** - Tipado estático para JavaScript
- **Vite** - Herramienta de construcción rápida
- **Vue Router** - Enrutamiento oficial de Vue
- **Axios** - Cliente HTTP para peticiones API
- **SCSS** - Preprocesador CSS
- **ESLint** - Linter para JavaScript/TypeScript

## Prerrequisitos

- Node.js (versión 22 o superior)
- npm o yarn

## ⚙️ Configuración Inicial

### 1. Instalar dependencias
```bash
npm install
```

### 2. Configurar variables de entorno
Crear un archivo `.env` en la raíz del proyecto:
```env
VITE_API_URL=http://localhost:8000
```

### 3. Ejecutar en modo desarrollo
```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:5173`

## 📁 Estructura del Proyecto

```
src/
├── components/          # Componentes reutilizables
│   ├── AddUsersFromCsvInput.vue
│   └── UsersTable.vue
├── views/              # Vistas/páginas
│   ├── HomeView.vue
│   └── LoginView.vue
├── services/           # Servicios API
│   ├── api.service.ts
│   ├── auth.service.ts
│   └── users.service.ts
├── dtos/              # Data Transfer Objects
│   ├── auth.dto.ts
│   └── user.dto.ts
├── router/            # Configuración de rutas
│   └── index.ts
└── assets/            # Recursos estáticos
```

## Autenticación

El sistema utiliza JWT (JSON Web Tokens) para la autenticación:

- Los tokens se almacenan en `localStorage`
- Se incluyen automáticamente en las cabeceras de las peticiones API
- Protección de rutas con guardias de navegación

## Gestión de Usuarios

### Funcionalidades implementadas:

1. **Listado de usuarios**: Tabla con información completa
2. **Eliminación de usuarios**: Botón de eliminar por usuario
3. **Importación masiva**: Carga de usuarios desde archivo CSV
4. **Actualización automática**: La tabla se actualiza automáticamente tras operaciones

### Formato del archivo CSV:
```csv
name,last_name,email,password,phone,address
Juan,Pérez,juan@email.com,12345,123456789,Calle Principal 123
María,García,maria@email.com,12345,987654321,Avenida Central 456
```
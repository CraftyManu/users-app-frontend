# Aplicación de Gestión de Usuarios (Frontend)

Versión actual: `0.0.1`

Esta aplicación frontend está diseñada para administrar usuarios desde una interfaz moderna con React, TypeScript y Vite. Incluye rutas de login, listado de usuarios, creación y edición de perfiles.

---

## Características principales

- Interfaz moderna y responsiva para la gestión de usuarios.
- Inicio de sesión con flujo de autenticación básico.
- Vista de usuarios con opciones para crear, editar y eliminar perfiles.
- Panel de estadísticas y visualización de datos relacionados con los usuarios.
- Arquitectura modular basada en componentes reutilizables y estilos encapsulados.

---

## Tecnologías principales

| Tecnología                                     | Uso                                   |
| ---------------------------------------------- | ------------------------------------- |
| [React 19](https://react.dev/)                 | Librería de interfaz de usuario       |
| [Vite](https://vitejs.dev/)                    | Construcción y servidor de desarrollo |
| [TanStack Router](https://tanstack.com/router) | Enrutamiento con tipado completo      |
| CSS Modules                                    | Estilos encapsulados por componente   |
| TypeScript                                     | Tipado estático                       |

---

## Ejecución local

```bash
# 1. Clonar el repositorio
git clone <URL_DEL_REPOSITORIO>
cd users-app-frontend

# 2. Instalar dependencias
npm install

# 3. Iniciar el servidor de desarrollo
npm run dev
```

La aplicación estará disponible en `http://localhost:5173`.

### Scripts disponibles

| Comando           | Descripción                           |
| ----------------- | ------------------------------------- |
| `npm run dev`     | Inicia el servidor de desarrollo      |
| `npm run build`   | Compila la aplicación para producción |
| `npm run preview` | Previsualiza el build de producción   |

---

## Estructura principal del proyecto

```
users-app-frontend/
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
└── src/
    ├── main.tsx
    ├── App.tsx
    ├── router.tsx
    ├── api/
    ├── assets/
    ├── components/
    ├── config/
    ├── hooks/
    ├── pages/
    ├── styles/
    ├── theme/
    ├── types/
    └── utils/
```

### Estructura detallada del proyecto

```
src/
├── api/
│   ├── api.ts
│   ├── authStorage.ts
│   ├── createUser.ts
│   ├── deleteUser.ts
│   ├── getUsers.ts
│   ├── login.ts
│   ├── updateUser.ts
│   └── types.ts
├── assets/
│   ├── fonts/
│   │   ├── Inter/
│   │   │   ├── OFL.txt
│   │   │   └── README.txt
│   │   ├── Space_Grotesk/
│   │   │   ├── OFL.txt
│   │   │   └── README.txt
│   │   └── Yuyu/
│   │       └── OFL.txt
│   ├── images/
│   │   └── examples/
│   └── videos/
├── components/
│   ├── blocks/
│   │   ├── CreateUser/
│   │   │   ├── CreateForm/
│   │   │   └── RightSide/
│   │   ├── Dashboard/
│   │   │   ├── ChartCard.module.css
│   │   │   ├── ChartCard.tsx
│   │   │   ├── Dashboard.module.css
│   │   │   ├── Dashboard.tsx
│   │   │   ├── DashboardCard.module.css
│   │   │   ├── DashboardCard.tsx
│   │   │   ├── dashboardUtils.ts
│   │   │   ├── index.ts
│   │   │   ├── types.ts
│   │   │   ├── useDashboardStats.ts
│   │   │   └── charts/
│   │   ├── Login/
│   │   │   ├── LoginForm/
│   │   │   └── RightSide/
│   │   ├── Modal/
│   │   │   ├── Modal.module.css
│   │   │   └── Modal.tsx
│   │   └── Navigation/
│   │       ├── Navigation.module.css
│   │       └── Navigation.tsx
│   └── ui/
│       ├── Avatar/
│       │   ├── Avatar.module.css
│       │   └── Avatar.tsx
│       ├── Button/
│       │   ├── Button.module.css
│       │   └── Button.tsx
│       ├── DemoUsers/
│       │   ├── DemoUsers.module.css
│       │   └── DemoUsers.tsx
│       ├── Footer/
│       │   ├── Footer.module.css
│       │   └── Footer.tsx
│       ├── GenderIcon/
│       │   └── GenderIcon.tsx
│       ├── GoogleMap/
│       │   ├── GoogleMap.module.css
│       │   └── GoogleMap.tsx
│       ├── Logo/
│       │   ├── Logo.module.css
│       │   └── Logo.tsx
│       ├── MapOnHover/
│       │   ├── MapOnHover.module.css
│       │   └── MapOnHover.tsx
│       ├── Subtitle/
│       │   ├── Subtitle.module.css
│       │   └── Subtitle.tsx
│       ├── Title/
│       │   ├── Title.module.css
│       │   └── Title.tsx
│       ├── UserCards/
│       │   ├── UserCards.module.css
│       │   └── UserCards.tsx
│       ├── UserDetails/
│       │   ├── UserDetails.module.css
│       │   └── UserDetails.tsx
│       ├── UserEditForm/
│       └── UsersTable/
├── config/
│   └── globals.ts
├── hooks/
│   ├── useUserModal.ts
│   └── useUsers.ts
├── pages/
│   ├── CreateUser/
│   │   ├── CreateUser.module.css
│   │   └── CreateUser.tsx
│   ├── Home/
│   │   ├── Home.module.css
│   │   └── Home.tsx
│   └── Login/
│       ├── Login.module.css
│       └── Login.tsx
├── styles/
│   ├── fonts.css
│   ├── fontStyles.module.css
│   ├── global.css
│   └── variables.css
├── theme/
│   ├── animations.ts
│   ├── borderRadius.ts
│   ├── chartColors.ts
│   ├── chartConfig.ts
│   ├── colors.ts
│   ├── glass.ts
│   ├── gradients.ts
│   ├── index.ts
│   ├── shadows.ts
│   ├── spacing.ts
│   └── typography.ts
├── types/
│   └── vite-env.d.ts
└── utils/
    └── avatar.ts
```

### Convenciones de carpetas

- `src/components/` contiene componentes reutilizables y bloques de UI.
- `src/pages/` agrupa las páginas principales de la app.
- `src/api/` incluye las funciones que llaman a la API.
- `src/styles/` almacena estilos globales y variables CSS.
- `src/theme/` agrupa tokens de diseño como colores, sombras y tipografías.

---

## Rutas principales

| Ruta           | Página           |
| -------------- | ---------------- |
| `/`            | Página principal |
| `/login`       | Login            |
| `/create-user` | Crear usuario    |

Las rutas se definen en `src/router.tsx` usando TanStack Router.

---

## Recomendaciones

- Usa `npm install` después de clonar el proyecto.
- Ejecuta `npm run dev` para desarrollo local.
- Genera el build de producción con `npm run build`.
- Comprueba `src/api/` para los endpoints y la gestión de usuarios.

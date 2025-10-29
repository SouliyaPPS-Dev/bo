---
trigger: model_decision
---

# Backoffice Application Architecture Documentation

## (Overview)

Backoffice application is React-based admin dashboard {{project_name}}. application modern web technologies and best practices to create scalable and maintainable codebase.

## (Folder Structure)

```
├── public/                     # Static assets
│   ├── logo.svg
│   ├── mockServiceWorker.js   # MSW for API mocking
│   └── vite.svg
├── src/
│   ├── App.tsx                # Main application component
│   ├── main.tsx              # Application entry point
│   ├── assets/               # Application assets
│   ├── components/           # Reusable UI components
│   ├── feature/              # Feature-based modules
│   ├── hooks/                # Custom React hooks
│   ├── layout/               # Layout components
│   ├── locales/              # Internationalization
│   ├── mocks/                # API mocking setup
│   ├── routes/               # File-based routing
│   ├── services/             # Business logic & API
│   ├── theme/                # UI theme configuration
│   ├── types/                # TypeScript type definitions
│   └── utils/                # Utility functions
├── package.json              # Dependencies & scripts
├── vite.config.ts           # Vite configuration
├── tsconfig.json            # TypeScript configuration
└── eslint.config.js         # ESLint configuration
```

## (Core Technologies)

### Frontend Framework

- **React 19.1.1** - Main UI framework https://react.dev/blog/2024/12/05/react-19
- **TypeScript** - Type safety
- **Vite v6** - Build tool and dev server https://v6.vite.dev/

### Routing & State Management

- **TanStack Router v1** - File-based routing with type safety https://tanstack.com/router/latest/docs/framework/react/overview
- **TanStack Query v5** - Server state management https://tanstack.com/query/latest/docs/framework/react/installation

### UI Framework

- **Material-UI (MUI) v7** - Component library https://mui.com/material-ui/getting-started/installation/
- **Material-UI Icons** - Icon system

### Form Management
- **TanStack Form v1** - Form management https://tanstack.com/form/latest/docs/overview
- **Zod v4** - Form validation https://zod.dev/

### Date Picker

- **Material-UI Date Picker v8** - Date picker component https://mui.com/x/react-date-pickers/date-picker/
- **Day.js v2** - Date library https://day.js.org/

### Development Tools

- **ESLint** - Code linting
- **Prettier** - Code formatting
- **MSW (Mock Service Worker)** - API mocking
- **Vite Bundle Analyzer** - Bundle analysis


### Internationalization

- **i18next** - Internationalization framework https://www.i18next.com/overview/getting-started
- **react-i18next** - React integration for i18n

### MCP Connect
- **Material-UI MCP Connect** - MCP Connect integration


## (Architecture Patterns)

### 1. Feature-Based Organization

```
feature/
└── {{feature_name}}/
    ├── Form.tsx
    ├── hooks/
    ├── index.ts
    └── schema.ts
```
<!-- english -->
** Description:**

- every feature has own components, hooks, schemas
- separate concerns exactly
- easy to maintain and scale

### 2. Service Layer Pattern

```
services/
├── api/                    # API endpoints
│   ├── auth.ts
│   ├── languages/
│   ├── services/
│   └── zones/
├── auth/                   # Authentication logic
├── devtools/               # devtools utilities
├── http/                   # HTTP clients
│   ├── private.ts         # Authenticated requests
│   └── public.ts          # Public requests
└── tanstack-query/        # Query client setup
```

**Description:**

- separate public and private HTTP clients
- Centralized API management
- Type-safe API interfaces

### 3. File-Based Routing

```
routes/
├── __root.tsx             # Root layout
├── _app/                  # Protected routes
│   ├── dashboard.tsx
│   ├── languages/
│   ├── services/
│   └── zones/
├── _app.tsx              # App layout wrapper
├── _auth/                # Authentication routes
│   ├── auth/
│   └── signin.tsx
└── _auth.tsx             # Auth layout wrapper
```

**Description:**

- Automatic route generation
- Layout nesting
- Type-safe navigation
- Code splitting

### 4. Component Organization

```
components/
├── Loading.tsx           # Loading states
├── PageContainer.tsx     # Page wrapper
├── PageHeader.tsx        # Page headers
└── index.ts             # Barrel exports

layout/
├── LanguageSwitcher.tsx  # Language selection
├── ProfilePopover.tsx    # User profile menu
├── Sidebar.tsx          # Navigation sidebar
└── index.tsx            # Layout exports
```

**Description:**

- Reusable UI components
- Layout components for consistent structure
- Barrel exports for clean imports

## Build (Build Configuration)

### Vite Configuration

```typescript
export default defineConfig({
  plugins: [
    tanstackRouter({
      target: 'react',
      autoCodeSplitting: true,
    }),
    react(),
    tsconfigPaths(),
    checker({ typescript: true, eslint: true }),
  ],
  build: {
    target: 'esnext',
    sourcemap: false,
    minify: 'esbuild',
  },
});
```

## Development Guidelines

### 1. Feature Organization

1. Create folder in `src/feature/`
2. Add components, hooks, schemas
3. Create API services in `src/services/api/`
4. Add types in `src/types/`
5. Create routes in `src/routes/`

### 2. State Management

- Use TanStack Query for server state
- Use React state for local UI state
- Use Context for global application state

### 3. Form Management

- Use TanStack Form components
- Create Zod schemas for validation
- Extract form logic into custom hooks

### 4. API Management

- Use typed API functions
- Use appropriate HTTP client (public/private)
- Handle errors consistently

## (Summary)

Backoffice application ໃຊ້ modern React ecosystem ດ້ວຍ:

- **Type-safe development** ດ້ວຍ TypeScript
- **File-based routing** ດ້ວຍ TanStack Router
- **Efficient state management** ດ້ວຍ TanStack Query
- **Component-driven UI** ດ້ວຍ Ant Design
- **Internationalization support** ດ້ວຍ i18next
- **Development-friendly tooling** ດ້ວຍ Vite
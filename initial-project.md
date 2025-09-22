# {{project_name}} Application Architecture Documentation

## (Overview)

{{project_name}} application is React-based admin dashboard {{project_name}}. application modern web technologies and best practices to create scalable and maintainable codebase.

## (Folder Structure)

```
apps/backoffice/
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

- **React 19.1.1** - Main UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server

### Routing & State Management

- **TanStack Router** - File-based routing with type safety
- **TanStack Query** - Server state management

### UI Framework

- **Material-UI (MUI) Latest version ** - Component library
- **Material-UI Icons** - Icon system

### Form Management

- **TanStack Form** - Form management
- **Zod** - Form validation

### Date Picker

- **Material-UI Date Picker** - Date picker component
- **Day.js** - Date library

### Development Tools

- **ESLint** - Code linting
- **Prettier** - Code formatting
- **MSW (Mock Service Worker)** - API mocking
- **Vite Bundle Analyzer** - Bundle analysis

### Internationalization

- **i18next** - Internationalization framework
- **react-i18next** - React integration for i18n

### MCP Connect

- **Material-UI MCP Connect** - MCP Connect integration

## MCP Server Configuration

The project integrates with several MCP (Model Context Protocol) servers to enhance development capabilities:

### Available MCP Servers

1. **netlify** - Netlify deployment and management

   - Provides deployment services
   - Site management capabilities
   - Environment variable management

2. **memory** - Persistent development context

   - Stores development context and decisions
   - Maintains project knowledge base
   - Tracks architectural patterns and conventions

3. **mui-mcp** - Material-UI latest version integration (@mui/mcp@latest)

   - Material-UI component assistance
   - Latest version compatibility
   - Component documentation and examples

4. **figma-dev-mode-mcp-server** - Figma design integration
   - Design system integration
   - Component specifications from Figma
   - Design-to-code workflow support

## (Architecture Patterns)

### 1. Feature-Based Organization

```
feature/
└── {{feature_name}}/
    ├── {{feature_name_form}}.tsx
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
│   ├── {{service_name_folder}}/
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

modern React ecosystem using:

- **Type-safe development** using TypeScript
- **File-based routing** using TanStack Router
- **Efficient state management** using TanStack Query
- **Component-driven UI** using Ant Design
- **Internationalization support** using i18next
- **Development-friendly tooling** using Vite

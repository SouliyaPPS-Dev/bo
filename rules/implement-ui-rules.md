---
trigger: manual
---

# Windsurf Service Design Specification

### Backend Features Analysis
- [ ] Analyze backend
- [ ] Complete CRUD Operations**: Create, Read, Update, Delete
- [ ] Input Validation**
- [ ] API Request and Response

### User Journey Map
- [ ] Provide User Journey

### Phase 1: Foundation
## Design for Mobile only experience
## Analyzed Front end structure
## Create Feature {{feature_name}}
1. Feature-Based Organization
feature/
└── {{feature_name}}/
    ├── {{feature_name_form}}.tsx
    ├── hooks/
    ├── index.ts
    └── schema.ts
# Component Decomposition (Highest Priority)
A. Extract Section Example: Statistics, Filter, Grid
B. Custom Hooks Extraction (Medium Priority)
C. State Management Simplification (Medium Priority)
D. Example:
/features/{{name}}/
├── components/
│   ├── {{name}}Card.tsx
│   ├── {{name}}Form.tsx
│   ├── {{name}}Stats.tsx
│   ├── {{name}}Filters.tsx
│   ├── {{name}}Grid.tsx
│   ├── {{name}}Selector.tsx
│   └── {{name}}ConfirmDialogs.tsx
├── hooks/
│   ├── useBookings.ts
│   ├── useBookingActions.ts
│   ├── usePagination.ts
│   └── useBookingFilters.ts
└── BookingsPage.tsx
- [ ] Create React Query hooks
- [ ] Implement basic CRUD hooks with React Query
## Implement API service layer with error handling
services/
├── api/                    # API endpoints
│   ├── {{service_name}}.ts

## [ ] Set up routing

### Phase 2: Core UI Components
- [ ] Use React Material MCP v7
- [ ] Build card component with actions
- [ ] Create form with validation Using Tankstack Form
- [ ] Implement delete confirmation dialog
- [ ] Add responsive grid layout

### Phase 3: Advanced Features
- [ ] Add optimistic updates for better UX
- [ ] Implement comprehensive error boundaries 
- [ ] Create loading skeletons and states
- [ ] Add accessibility improvements

### Phase 4: Polish & Testing
- [ ] Performance optimization and memoization
- [ ] Mobile responsive refinements
- [ ] Unit and integration tests
- [ ] Documentation and code review

### Key Benefits Achieved:
## Single Responsibility:
- Each component has one clear purpose
- Easy to understand and modify
- Isolated bug fixes and feature additions
## Reusability:
- Components can be used in other parts of the app
- Hooks can be shared across booking-related features
- Clean interfaces for easy integration
## Maintainability:
- Changes are isolated to specific components
- New features can be added without affecting others
- Clear separation of concerns
## Testability:
- Small, focused components are easier to test
- Hooks can be tested independently
- Clear props interfaces for mocking
## Performance:
- Smaller re-render surfaces
- Components can be optimized individually
- Better React.memo opportunities
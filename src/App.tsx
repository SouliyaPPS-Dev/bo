import { Outlet } from '@tanstack/react-router';

// This component is kept for backward compatibility
// All providers have been moved to routes/__root.tsx
export default function App() {
  return <Outlet />;
}

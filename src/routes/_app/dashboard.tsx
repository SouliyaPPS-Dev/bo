import { createFileRoute } from '@tanstack/react-router';
import DashboardPage from '@/feature/dashboard/DashboardPage';

export const Route = createFileRoute('/_app/dashboard')({
  component: DashboardPage,
});

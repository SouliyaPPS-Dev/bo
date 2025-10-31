import { createFileRoute } from '@tanstack/react-router';
import UsersPage from '@/feature/users/UsersPage';

export const Route = createFileRoute('/_app/users')({
  component: UsersPage,
});

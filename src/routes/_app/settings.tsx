import { createFileRoute } from '@tanstack/react-router';
import ProfilePage from '@/feature/settings/ProfilePage';

export const Route = createFileRoute('/_app/settings')({
  component: ProfilePage,
});

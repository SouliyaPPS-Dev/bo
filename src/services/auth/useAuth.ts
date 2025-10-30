import { useRouteContext } from '@tanstack/react-router';
import { rootRouteId } from '@tanstack/router-core';
import type { AuthContextType } from './context';

export function useAuth(): AuthContextType {
  return useRouteContext({
    from: rootRouteId,
    select: (context) => context.auth,
  });
}

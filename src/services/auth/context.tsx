import type {
  AuthUser,
  RegisterRequest,
  SignInRequest,
} from '@/services/api/auth';
import { getStoredAccessToken } from './tokenStorage';

export type AuthContextType = {
  isAuthenticated: boolean;
  token: string | null;
  user: AuthUser | null;
  signIn: (params: SignInRequest) => Promise<void>;
  register: (params: RegisterRequest) => Promise<AuthUser>;
  signOut: () => void;
};

const initialToken = getStoredAccessToken();

export const defaultAuthContext: AuthContextType = {
  isAuthenticated: !!initialToken,
  token: initialToken,
  user: null,
  // These default implementations are placeholders until AuthProvider replaces them
  signIn: async () => {
    await Promise.resolve();
    throw new Error('Auth context not initialized.');
  },
  register: async () => {
    await Promise.resolve();
    throw new Error('Auth context not initialized.');
  },
  signOut: () => {
    throw new Error('Auth context not initialized.');
  },
};

export type AuthRouterContext = {
  auth: AuthContextType;
};

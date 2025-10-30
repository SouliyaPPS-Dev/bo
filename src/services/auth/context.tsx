import type {
  AuthUser,
  RegisterRequest,
  SignInRequest,
} from '@/services/api/auth';

export type AuthContextType = {
  isAuthenticated: boolean;
  token: string | null;
  user: AuthUser | null;
  signIn: (params: SignInRequest) => Promise<void>;
  register: (params: RegisterRequest) => Promise<AuthUser>;
  signOut: () => void;
};

export const defaultAuthContext: AuthContextType = {
  isAuthenticated: false,
  token: null,
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

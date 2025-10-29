import { createContext } from 'react';
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

export const AuthContext = createContext<AuthContextType | null>(null);

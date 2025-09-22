import { createContext } from 'react';

export type AuthContextType = {
  isAuthenticated: boolean;
  token: string | null;
  signIn: (params: { email: string; password: string }) => Promise<void>;
  signOut: () => void;
};

export const AuthContext = createContext<AuthContextType | null>(null);

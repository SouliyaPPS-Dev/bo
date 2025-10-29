import { httpPost } from '@/services/http/public';

export type AuthUser = {
  id: string;
  email: string;
  name: string;
};

export type SignInRequest = {
  email: string;
  password: string;
};

export type SignInResponse = {
  token: string;
  user: AuthUser;
};

export type RegisterRequest = {
  email: string;
  password: string;
  name: string;
};

export type RegisterResponse = {
  user: AuthUser;
};

export function signIn(params: SignInRequest): Promise<SignInResponse> {
  return httpPost<SignInResponse>('/auth/login', params);
}

export function register(params: RegisterRequest): Promise<RegisterResponse> {
  return httpPost<RegisterResponse>('/auth/register', params);
}


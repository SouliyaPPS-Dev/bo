import { withToken } from '@/services/http/private';

export const USERS_QUERY_KEYS = {
  ROOT: ['users'] as const,
  ME_ROLE: (token: string | null) => ['users', 'me', 'role', token] as const,
  ADMIN_ROOT: ['admin-users'] as const,
  ADMIN_LIST: (
    token: string | null,
    params?: AdminUserListParams
  ) => ['admin-users', 'list', token, params ? JSON.stringify(params) : ''] as const,
  ADMIN_DETAIL: (token: string | null, id: string) =>
    ['admin-users', 'detail', token, id] as const,
  ADMIN_ROLE: (token: string | null, id: string) =>
    ['admin-users', 'role', token, id] as const,
} as const;

// We only know about the "admin" and "user" roles from the mock,
// but allow additional roles to keep the client flexible.
export type UserRole = 'admin' | 'user' | (string & {});

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  created_at: string;
  updated_at: string;
  password_hash?: string;
}

export interface ChangePasswordPayload {
  current_password: string;
  new_password: string;
}

export interface MeRoleResponse {
  user: User;
}

type MeRoleApiResponse = { user: User | RawUser };

export type AdminUserListResponse = User[];

type AdminUserResponse = User | { user: User };
type RawUser = Partial<User> & {
  ID?: string;
  Email?: string;
  Name?: string;
  Role?: string;
  CreatedAt?: string;
  UpdatedAt?: string;
  PasswordHash?: string;
};
type AdminUserListApiResponse =
  | AdminUserResponse[]
  | { users: User[] }
  | { items: User[] }
  | { data: User[] };

function normalizeUser(data: AdminUserResponse | RawUser | null | undefined): User {
  if (!data) {
    throw new Error('User payload missing from response');
  }

  if ('user' in data && data.user) {
    return normalizeUser(data.user);
  }

  // At this point, data is either User or RawUser (not { user: User })
  const raw: RawUser = data as RawUser;

  return {
    id: raw.id ?? raw.ID ?? '',
    email: raw.email ?? raw.Email ?? '',
    name: raw.name ?? raw.Name ?? '',
    role: (raw.role ?? raw.Role ?? 'user') as UserRole,
    created_at: raw.created_at ?? raw.CreatedAt ?? '',
    updated_at: raw.updated_at ?? raw.UpdatedAt ?? '',
    password_hash: raw.password_hash ?? raw.PasswordHash,
  };
}

function normalizeUserList(data: AdminUserListApiResponse): User[] {
  if (Array.isArray(data)) {
    return data.map((item) => normalizeUser(item));
  }

  if ('users' in data && Array.isArray(data.users)) {
    return data.users.map((item) => normalizeUser(item));
  }

  if ('items' in data && Array.isArray(data.items)) {
    return data.items.map((item) => normalizeUser(item));
  }

  if ('data' in data && Array.isArray(data.data)) {
    return data.data.map((item) => normalizeUser(item));
  }

  return [];
}

export interface CreateAdminUserPayload {
  email: string;
  password: string;
  name: string;
  role: UserRole;
}

export interface UpdateAdminUserPayload {
  email?: string;
  password?: string;
  name?: string;
  role?: UserRole;
}

export interface UpdateRolePayload {
  role: UserRole;
}

export interface AdminUserListParams {
  role?: UserRole;
  search?: string;
  page?: number;
  limit?: number;
}

function buildAdminUsersQuery(params?: AdminUserListParams): string {
  if (!params) return '';

  const searchParams = new URLSearchParams();

  if (params.role) searchParams.set('role', params.role);
  if (params.search) searchParams.set('search', params.search);
  if (typeof params.page === 'number') searchParams.set('page', String(params.page));
  if (typeof params.limit === 'number') searchParams.set('limit', String(params.limit));

  const query = searchParams.toString();
  return query ? `?${query}` : '';
}

export function changePassword(
  token: string | null,
  payload: ChangePasswordPayload
): Promise<void> {
  return withToken(token).post<void>('/users/change-password', payload);
}

export function getMyRole(token: string | null): Promise<MeRoleResponse> {
  return withToken(token)
    .get<MeRoleApiResponse>('/users/me/role')
    .then((res) => ({ user: normalizeUser(res.user) }));
}

export function updateMyRole(
  token: string | null,
  payload: UpdateRolePayload
): Promise<MeRoleResponse> {
  return withToken(token)
    .patch<MeRoleApiResponse>('/users/me/role', payload)
    .then((res) => ({ user: normalizeUser(res.user) }));
}

export function listAdminUsers(
  token: string | null,
  params?: AdminUserListParams
): Promise<User[]> {
  const query = buildAdminUsersQuery(params);
  return withToken(token)
    .get<AdminUserListApiResponse>(`/admin/users${query}`)
    .then((res) => normalizeUserList(res));
}

export function createAdminUser(
  token: string | null,
  payload: CreateAdminUserPayload
): Promise<User> {
  return withToken(token)
    .post<AdminUserResponse>('/admin/users', payload)
    .then((res) => normalizeUser(res));
}

export function getAdminUser(token: string | null, userId: string): Promise<User> {
  return withToken(token)
    .get<AdminUserResponse>(`/admin/users/${userId}`)
    .then((res) => normalizeUser(res));
}

export function updateAdminUser(
  token: string | null,
  userId: string,
  payload: UpdateAdminUserPayload
): Promise<User> {
  return withToken(token)
    .patch<AdminUserResponse>(`/admin/users/${userId}`, payload)
    .then((res) => normalizeUser(res));
}

export function deleteAdminUser(token: string | null, userId: string): Promise<void> {
  return withToken(token).delete<void>(`/admin/users/${userId}`);
}

export function getAdminUserRole(
  token: string | null,
  userId: string
): Promise<MeRoleResponse> {
  return withToken(token)
    .get<MeRoleApiResponse>(`/admin/users/${userId}/role`)
    .then((res) => ({ user: normalizeUser(res.user) }));
}

export function updateAdminUserRole(
  token: string | null,
  userId: string,
  payload: UpdateRolePayload
): Promise<User> {
  return withToken(token)
    .patch<AdminUserResponse>(`/admin/users/${userId}/role`, payload)
    .then((res) => normalizeUser(res));
}

export function resetAdminUserRole(token: string | null, userId: string): Promise<User> {
  return withToken(token)
    .delete<AdminUserResponse>(`/admin/users/${userId}/role`)
    .then((res) => normalizeUser(res));
}

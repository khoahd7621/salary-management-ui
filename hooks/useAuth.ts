// Manage profile of logged in user

import useSWR from 'swr';
import { PublicConfiguration } from 'swr/_internal';

import { authApi } from '~/api-clients/modules/auth-api';
import { Payload } from '~/models/modules/login';
import { User } from '~/models/modules/User';

export const useAuth = (options?: Partial<PublicConfiguration>) => {
  const { data, error, mutate } = useSWR<User, any, any>('/admin/profile', {
    dedupingInterval: 60 * 60 * 24 * 1000,
    revalidateOnFocus: false,
    ...options,
  });

  const firstLoading = data === undefined && error === undefined;

  async function login(payload: Payload): Promise<User> {
    const response = await authApi.login(payload);

    await mutate();

    return response;
  }

  async function logout() {
    await authApi.logout();

    mutate({}, false);
  }

  return {
    profile: data || undefined,
    error,
    login,
    firstLoading,
    logout,
  };
};

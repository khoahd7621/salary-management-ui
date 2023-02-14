// Manage profile of logged in user

import useSWR from 'swr';
import { PublicConfiguration } from 'swr/_internal';

import { authApi } from '~/api-clients/modules/auth-api';
import { Payload, User } from '~/models/modules/login';

export const useAuth = (options?: Partial<PublicConfiguration>) => {
  const { data, error, mutate } = useSWR('/auth/profile', {
    dedupingInterval: 60 * 60 * 1000,
    revalidateOnFocus: false,
    ...options,
  });

  const firstLoading = data === undefined && error === undefined;

  async function login(payload: Payload): Promise<User> {
    const response = await authApi.login(payload);

    await mutate();

    return response;
  }

  return {
    profile: data?.data || {},
    error,
    login,
    firstLoading,
  };
};

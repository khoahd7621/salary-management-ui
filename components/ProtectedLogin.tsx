import { useRouter } from 'next/router';
import { useEffect } from 'react';

import { useAuth } from '~/hooks';
import { Loading } from './Loading';

export interface AuthProps {
  children: any;
}

export const ProtectedLogin = ({ children }: AuthProps) => {
  const router = useRouter();
  const { profile, firstLoading, error } = useAuth({
    dedupingInterval: 2000,
    revalidateOnMount: true,
  });

  useEffect(() => {
    if (!firstLoading && profile?.id && !error) {
      router.push('/dashboard');
    }
  }, [router, profile, firstLoading, error]);

  if (firstLoading) return <Loading />;

  return <>{!error ? <Loading /> : <>{children}</>}</>;
};

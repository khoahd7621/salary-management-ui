import { useRouter } from 'next/router';
import { useEffect } from 'react';

import { useAuth } from '~/hooks';
import { Loading } from './Loading';

export interface AuthProps {
  children: any;
}

export const AuthPage = ({ children }: AuthProps) => {
  const router = useRouter();
  const { profile, firstLoading } = useAuth();

  useEffect(() => {
    if (!firstLoading && !profile?.adminId) {
      router.push('/');
    }
  }, [router, profile, firstLoading]);

  if (!profile?.adminId) return <Loading />;

  return <>{children}</>;
};

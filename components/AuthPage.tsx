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
    if (!firstLoading && !profile?.id) {
      router.push('/');
    }
  }, [router, profile, firstLoading]);

  if (!profile?.id) return <Loading />;

  return <>{children}</>;
};

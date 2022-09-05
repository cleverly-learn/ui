import { AxiosError } from 'axios';
import { Navigate } from 'react-router-dom';
import { Path } from 'enums/path.enum';
import { TopProgress } from 'components/_common/TopProgress';
import { localStorage } from 'utils/local-storage';
import { useCurrentUser } from 'features/users/queries/use-current-user';
import React, { FC, PropsWithChildren } from 'react';

export const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
  const { isLoading, error } = useCurrentUser();

  const isUnauthorized =
    !isLoading && (error as AxiosError)?.response?.status === 401;

  if (!localStorage.accessToken || isUnauthorized) {
    return <Navigate to={Path.LOGIN} />;
  }

  return (
    <>
      {isLoading && <TopProgress />}
      {children}
    </>
  );
};

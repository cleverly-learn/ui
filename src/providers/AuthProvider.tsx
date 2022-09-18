import { AxiosError } from 'axios';
import { Navigate } from 'react-router-dom';
import { Path } from 'enums/path.enum';
import { TopProgress } from 'components/_common/TopProgress';
import { isUnauthorized } from 'utils/http/is-unauthorized';
import { localStorage } from 'utils/local-storage';
import { useCurrentUser } from 'hooks/queries/use-current-user';
import React, { FC, PropsWithChildren } from 'react';

export const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
  const { isLoading, error } = useCurrentUser();

  if (!localStorage.accessToken || isUnauthorized(error as AxiosError)) {
    return <Navigate to={Path.LOGIN} />;
  }

  return (
    <>
      {isLoading && <TopProgress />}
      {children}
    </>
  );
};

import { AxiosError } from 'axios';
import { Navigate } from 'react-router-dom';
import { Path } from 'enums/path.enum';
import { localStorage } from 'utils/local-storage';
import { useCurrentUserQuery } from 'features/users/queries/use-current-user-query';
import React, { FC, PropsWithChildren } from 'react';

export const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
  const { isLoading, error } = useCurrentUserQuery();

  const isUnauthorized =
    !isLoading && (error as AxiosError)?.response?.status === 401;

  if (!localStorage.accessToken || isUnauthorized) {
    return <Navigate to={Path.LOGIN} />;
  }

  return <>{children}</>;
};

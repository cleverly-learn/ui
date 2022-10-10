import { Navigate } from 'react-router-dom';
import { Path } from 'enums/path.enum';
import { useCurrentUser } from 'hooks/queries/use-current-user';
import React, { FC, PropsWithChildren } from 'react';

export const OnboardingProvider: FC<PropsWithChildren> = ({ children }) => {
  const { data, isSuccess } = useCurrentUser();

  if (data && !data.isRegistered) {
    return <Navigate to={Path.ONBOARDING} />;
  }

  return <>{isSuccess && children}</>;
};

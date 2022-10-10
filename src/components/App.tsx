import { AuthProvider } from 'providers/AuthProvider';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { OnboardingProvider } from 'providers/OnboardingProvider';
import { Path } from 'enums/path.enum';
import { TopProgress } from 'components/_common/TopProgress';
import React, { FC, Suspense } from 'react';

const Login = React.lazy(() => import('components/Login/Login'));
const Onboarding = React.lazy(() => import('components/Onboarding/Onboarding'));
const Dashboard = React.lazy(() => import('components/Dashboard/Dashboard'));

export const App: FC = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Navigate to={Path.PROFILE} />} />
      <Route
        path={Path.LOGIN}
        element={
          <Suspense fallback={<TopProgress />}>
            <Login />
          </Suspense>
        }
      />
      <Route
        path={Path.ONBOARDING}
        element={
          <Suspense fallback={<TopProgress />}>
            <AuthProvider>
              <Onboarding />
            </AuthProvider>
          </Suspense>
        }
      />
      <Route
        path="/*"
        element={
          <Suspense fallback={<TopProgress />}>
            <AuthProvider>
              <OnboardingProvider>
                <Dashboard />
              </OnboardingProvider>
            </AuthProvider>
          </Suspense>
        }
      />
    </Routes>
  </BrowserRouter>
);

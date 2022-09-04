import { AuthProvider } from 'providers/AuthProvider';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { Path } from 'enums/path.enum';
import { TopProgress } from 'components/_common/TopProgress';
import React, { FC, Suspense } from 'react';

const Login = React.lazy(() => import('components/Login/Login'));
const MainWrapper = React.lazy(
  () => import('components/MainWrapper/MainWrapper'),
);

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
        path="/*"
        element={
          <Suspense fallback={<TopProgress />}>
            <AuthProvider>
              <MainWrapper />
            </AuthProvider>
          </Suspense>
        }
      />
    </Routes>
  </BrowserRouter>
);

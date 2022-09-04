import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { Path } from 'components/App/enums/path.enum';
import { ProtectedRoute } from 'components/App/components/ProtectedRoute';
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
      <Route path={Path.NOT_FOUND} element={<div>Page not found</div>} />
      <Route
        path="/*"
        element={
          <ProtectedRoute>
            <MainWrapper />
          </ProtectedRoute>
        }
      />
    </Routes>
  </BrowserRouter>
);

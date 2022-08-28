import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { LinearProgress } from '@mui/material';
import React, { FC, Suspense } from 'react';

const Login = React.lazy(() => import('components/Login/Login'));

export const App: FC = () => (
  <BrowserRouter>
    <Routes>
      <Route
        path="/login"
        element={
          <Suspense fallback={<LinearProgress />}>
            <Login />
          </Suspense>
        }
      />
      <Route path="/" element={<Navigate to="/login" />} />
    </Routes>
  </BrowserRouter>
);

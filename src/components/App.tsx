import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { Login } from 'components/Login/Login';
import React, { FC } from 'react';

export const App: FC = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Navigate to="/login" />} />
    </Routes>
  </BrowserRouter>
);

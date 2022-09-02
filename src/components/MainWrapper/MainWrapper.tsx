import { Grid } from '@mui/material';
import { Header } from 'components/MainWrapper/components/Header/Header';
import React, { FC, PropsWithChildren } from 'react';
import logo from 'assets/icons/logo.svg';

const MainWrapper: FC<PropsWithChildren> = ({ children }) => {
  return (
    <Grid container p={3} spacing={2}>
      <Grid item xs={4}>
        <img src={logo} alt="logo" />
      </Grid>
      <Grid item xs={8}>
        <Header />
      </Grid>
      <Grid item xs={4}>
        sidebar
      </Grid>
      <Grid item xs={8}>
        {children}
      </Grid>
    </Grid>
  );
};

// eslint-disable-next-line import/no-default-export
export default MainWrapper;

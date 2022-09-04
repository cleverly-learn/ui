import { Box } from '@mui/material';
import { Header } from 'components/MainWrapper/components/Header/Header';
import { Sidebar } from 'components/MainWrapper/components/Sidebar/Sidebar';
import React, { FC, PropsWithChildren } from 'react';
import logo from 'assets/icons/logo.svg';

const MainWrapper: FC<PropsWithChildren> = ({ children }) => {
  return (
    <Box height="100vh" display="flex" flexDirection="column">
      <Box m={3} display="flex" flexDirection="column" gap={2} height={1}>
        <Box display="flex" gap={2}>
          <Box width={300} display="flex" alignItems="center" pl={2}>
            <img src={logo} alt="logo" />
          </Box>
          <Box flex={1}>
            <Header />
          </Box>
        </Box>
        <Box display="flex" gap={2} height={1}>
          <Box width={300}>
            <Sidebar />
          </Box>
          <Box flex={1}>{children}</Box>
        </Box>
      </Box>
    </Box>
  );
};

// eslint-disable-next-line import/no-default-export
export default MainWrapper;

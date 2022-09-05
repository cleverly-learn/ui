import { Box } from '@mui/material';
import { Header } from 'components/MainWrapper/components/Header/Header';
import { Path } from 'enums/path.enum';
import { Profile } from 'components/MainWrapper/components/Profile/Profile';
import { Route, Routes } from 'react-router-dom';
import { Sidebar } from 'components/MainWrapper/components/Sidebar/Sidebar';
import React, { FC } from 'react';
import logo from 'assets/icons/logo.svg';

const MainWrapper: FC = () => {
  return (
    <Box height="100vh" display="flex" flexDirection="column">
      <Box m={3} display="flex" flexDirection="column" gap={2} height={1}>
        <Box display="flex" gap={2}>
          <Box
            width={300}
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
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
          <Box flex={1}>
            <Routes>
              <Route path={Path.PROFILE} element={<Profile />} />
              <Route path={Path.STUDENTS} element={Path.STUDENTS} />
              <Route path={Path.LECTURERS} element={Path.LECTURERS} />
              <Route path={Path.GROUPS} element={Path.GROUPS} />
              <Route path={Path.ADMINS} element={Path.ADMINS} />
            </Routes>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

// eslint-disable-next-line import/no-default-export
export default MainWrapper;

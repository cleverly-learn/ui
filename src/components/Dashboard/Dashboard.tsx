import { Admins } from 'components/Dashboard/components/Admins/Admins';
import { Box } from '@mui/material';
import { Groups } from 'components/Dashboard/components/Groups/Groups';
import { Header } from 'components/Dashboard/components/Header/Header';
import { PaperPanel } from 'components/_common/PaperPanel';
import { Path } from 'enums/path.enum';
import { Profile } from 'components/Dashboard/components/Profile/Profile';
import { Route, Routes } from 'react-router-dom';
import { Sidebar } from 'components/Dashboard/components/Sidebar/Sidebar';
import React, { FC } from 'react';
import logo from 'assets/icons/logo.svg';

const Dashboard: FC = () => {
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
              <Route
                path={Path.STUDENTS}
                element={<PaperPanel>{Path.STUDENTS}</PaperPanel>}
              />
              <Route
                path={Path.LECTURERS}
                element={<PaperPanel>{Path.LECTURERS}</PaperPanel>}
              />
              <Route path={Path.GROUPS} element={<Groups />} />
              <Route path={Path.ADMINS} element={<Admins />} />
            </Routes>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

// eslint-disable-next-line import/no-default-export
export default Dashboard;

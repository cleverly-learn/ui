import { Admins } from 'components/Dashboard/components/Admins/Admins';
import { Box } from '@mui/material';
import { Course } from 'components/Dashboard/components/Course/Course';
import { Courses } from 'components/Dashboard/components/Courses/Courses';
import { Group } from 'components/Dashboard/components/Group/Group';
import { Groups } from 'components/Dashboard/components/Groups/Groups';
import { Header } from 'components/Dashboard/components/Header/Header';
import { Lecturers } from 'components/Dashboard/components/Lecturers/Lecturers';
import { Logo } from 'components/_common/Logo';
import { Path } from 'enums/path.enum';
import { Profile } from 'components/Dashboard/components/Profile/Profile';
import { Route, Routes } from 'react-router-dom';
import { Sidebar } from 'components/Dashboard/components/Sidebar/Sidebar';
import { Students } from 'components/Dashboard/components/Students/Students';
import React, { FC } from 'react';

const Dashboard: FC = () => {
  return (
    <Box height="100vh" display="flex" flexDirection="column" gap={2} p={3}>
      <Box display="flex" gap={2}>
        <Box
          width={300}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Logo />
        </Box>
        <Box flex={1}>
          <Header />
        </Box>
      </Box>
      <Box display="flex" gap={2} flex={1}>
        <Box width={300}>
          <Sidebar />
        </Box>
        <Box flex={1}>
          <Routes>
            <Route path={Path.PROFILE} element={<Profile />} />
            <Route path={Path.STUDENTS} element={<Students />} />
            <Route path={Path.LECTURERS} element={<Lecturers />} />
            <Route path={Path.GROUPS} element={<Groups />} />
            <Route path={`${Path.GROUP}/:id`} element={<Group />} />
            <Route path={Path.ADMINS} element={<Admins />} />
            <Route path={`${Path.USER}/:id`} element={<Profile />} />
            <Route path={Path.COURSES} element={<Courses />} />
            <Route path={`${Path.COURSE}/:id`} element={<Course />} />
          </Routes>
        </Box>
      </Box>
    </Box>
  );
};

// eslint-disable-next-line import/no-default-export
export default Dashboard;

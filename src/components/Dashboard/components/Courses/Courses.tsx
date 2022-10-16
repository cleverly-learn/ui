import { CreateDialog } from 'components/Dashboard/components/Courses/components/CreateDialog/CreateDialog';
import { PanelFab } from 'components/_common/PanelFab/styled';

import { CourseCard } from 'components/Dashboard/components/Courses/components/CourseCard/CourseCard';
import { EmptyListLecturerCta } from 'components/Dashboard/components/Courses/components/EmptyListLecturerCta';
import { EmptyListStudentTitle } from 'components/Dashboard/components/Courses/components/EmptyListStudentTitle';
import { Grid, Grow } from '@mui/material';
import { ListSkeleton } from 'components/Dashboard/components/Courses/components/ListSkeleton';
import { User } from 'api/users/types/user.interface';
import { isLecturer, isStudent } from 'enums/role.enum';
import { isNotUndefined } from 'utils/is-not-undefined';
import { isUndefined } from 'utils/is-undefined';
import { useCourses } from 'components/Dashboard/components/Courses/feature/queries/use-courses';
import { useCurrentUser } from 'hooks/queries/use-current-user';
import AddIcon from '@mui/icons-material/Add';
import React, { FC, useState } from 'react';

const getParams = (user: User) =>
  isLecturer(user.role) ? { ownerUserId: user.id } : { studentUserId: user.id };

export const Courses: FC = () => {
  const [isCreating, setIsCreating] = useState(false);

  const { data: user } = useCurrentUser();
  const { data: courses } = useCourses(
    isNotUndefined(user) ? getParams(user) : {},
  );

  if (isUndefined(courses) || isUndefined(user)) {
    return <ListSkeleton />;
  }

  return (
    <>
      <Grid container spacing={2.5}>
        {courses.map((course, index) => (
          <Grow key={course.id} timeout={300 + 50 * index} in>
            <Grid item md={4}>
              <CourseCard course={course} />
            </Grid>
          </Grow>
        ))}
      </Grid>
      {isStudent(user.role) && !courses.length && <EmptyListStudentTitle />}
      {isLecturer(user.role) && (
        <>
          {courses.length === 0 && (
            <EmptyListLecturerCta onClick={() => setIsCreating(true)} />
          )}
          <CreateDialog
            open={isCreating}
            onClose={() => setIsCreating(false)}
          />
          {courses.length > 0 && (
            <PanelFab color="primary" onClick={() => setIsCreating(true)}>
              <AddIcon />
            </PanelFab>
          )}
        </>
      )}
    </>
  );
};

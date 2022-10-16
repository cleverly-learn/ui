import * as styles from 'components/Dashboard/components/Courses/components/CourseCard/styles';
import { Box, Divider } from '@mui/material';
import { ClassroomChip } from 'components/_common/ClassroomChip';
import { CoursePreview } from 'api/courses/types/course-preview.interface';
import { GroupChip } from 'components/_common/GroupChip';
import { Link } from 'components/_common/Link';
import { Path } from 'enums/path.enum';
import { getFullName } from 'utils/get-full-name';
import { isStudent } from 'enums/role.enum';
import { isUndefined } from 'utils/is-undefined';
import { useCurrentUser } from 'hooks/queries/use-current-user';
import React, { FC } from 'react';

interface Props {
  course: CoursePreview;
}

export const CourseCard: FC<Props> = ({ course }) => {
  const { data: user } = useCurrentUser();

  if (isUndefined(user)) {
    return null;
  }

  return (
    <Box sx={styles.card}>
      <Link
        to={`${Path.COURSE}/${course.id}`}
        underline="hover"
        color="primary.contrastText"
        variant="h6"
        alignSelf="start"
      >
        {course.name}
      </Link>
      {isStudent(user.role) && (
        <Link
          underline="hover"
          color="primary.contrastText"
          to={`${Path.USER}/${course.owner.id}`}
          mt={1}
        >
          {getFullName(course.owner)}
        </Link>
      )}
      <Box display="flex" mt={2}>
        {course.classroomLink && (
          <Box display="flex" height="min-content">
            <ClassroomChip href={course.classroomLink} />
            <div>
              <Divider orientation="vertical" sx={{ mx: 1 }} />
            </div>
          </Box>
        )}
        <Box overflow="auto" display="flex" gap={1} pb={2}>
          {course.groups.map((group) => (
            <GroupChip key={group.id} group={group} />
          ))}
        </Box>
      </Box>
    </Box>
  );
};

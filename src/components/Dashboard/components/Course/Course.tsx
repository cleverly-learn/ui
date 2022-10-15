import * as styles from 'components/Dashboard/components/Course/styles';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Divider,
  Grow,
  Skeleton,
  Typography,
} from '@mui/material';
import { ClassroomChip } from 'components/_common/ClassroomChip';
import { Link } from 'components/_common/Link';
import { PaperPanel } from 'components/_common/PaperPanel';
import { Path } from 'enums/path.enum';
import { getFullName } from 'utils/get-full-name';
import { getTransitionTimeout } from 'components/Dashboard/components/Profile/utils/get-transition-timeout';
import { isUndefined } from 'utils/is-undefined';
import { useCourse } from 'components/Dashboard/components/Course/feature/queries/use-course';
import { useParams } from 'react-router-dom';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import React, { FC, Fragment } from 'react';

export const Course: FC = () => {
  const { id } = useParams<{ id: string }>();

  const { data: course } = useCourse(id ? +id : 0);

  if (isUndefined(id)) {
    return null;
  }

  return (
    <PaperPanel>
      <Grow in timeout={getTransitionTimeout(0)}>
        <Box display="flex" alignItems="baseline" mb={3}>
          <Typography variant="h3" mr={2}>
            {course?.name ?? <Skeleton variant="text" width="40%" />}
          </Typography>
          {course?.classroomLink && (
            <ClassroomChip href={course?.classroomLink} />
          )}
        </Box>
      </Grow>
      <Grow in timeout={getTransitionTimeout(1)}>
        <div>
          <Typography mb={2}>Групи</Typography>
          {course?.groups.map((group) => (
            <Accordion key={group.id} sx={styles.accordion}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Link
                  color="secondary"
                  underline="hover"
                  to={`${Path.GROUP}/${group.id}`}
                >
                  {group.name}
                </Link>
              </AccordionSummary>
              <AccordionDetails>
                {group.students.map((student, index, arr) => (
                  <Fragment key={student.userId}>
                    <Box display="flex">
                      <Typography color="text.disabled" mr={2}>
                        {index + 1}
                      </Typography>
                      <Link
                        color="secondary"
                        underline="hover"
                        to={`${Path.USER}/${student.userId}`}
                      >
                        {getFullName(student)}
                      </Link>
                    </Box>
                    {index !== arr.length - 1 && <Divider sx={{ my: 2 }} />}
                  </Fragment>
                ))}
              </AccordionDetails>
            </Accordion>
          ))}
        </div>
      </Grow>
    </PaperPanel>
  );
};

import * as styles from 'components/Dashboard/components/Course/styles';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Divider,
  Grow,
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Skeleton,
  Snackbar,
  Typography,
} from '@mui/material';
import { BackdropTopProgress } from 'components/_common/BackdropTopProgress';
import { ClassroomChip } from 'components/_common/ClassroomChip';
import { Link } from 'components/_common/Link';
import { NavigationState } from 'components/Dashboard/components/Courses/components/CreateDialog/types/navigation-state.interface';
import { PaperPanel } from 'components/_common/PaperPanel';
import { Path } from 'enums/path.enum';
import { getFullName } from 'utils/get-full-name';
import { getTransitionTimeout } from 'components/Dashboard/components/Profile/utils/get-transition-timeout';
import { isLecturer, isStudent } from 'enums/role.enum';
import { isNotUndefined } from 'utils/is-not-undefined';
import { isUndefined } from 'utils/is-undefined';
import { useCourse } from 'components/Dashboard/components/Course/feature/queries/use-course';
import { useCurrentUser } from 'hooks/queries/use-current-user';
import { useDeleteCourse } from 'components/Dashboard/components/Course/feature/mutations/use-delete-course';
import { useInviteStudents } from 'hooks/queries/use-invite-students';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import EmailIcon from '@mui/icons-material/Email';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import React, { FC, Fragment, useState } from 'react';

export const Course: FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { state } = useLocation();

  const [menuAnchor, setMenuAnchor] = useState<null | HTMLElement>(null);
  const [isInviteSnackbarOpened, setIsInviteSnackbarOpened] = useState(
    Boolean((state as NavigationState)?.isInvited),
  );

  const { data: user } = useCurrentUser();
  const { data: course } = useCourse(id ? +id : 0);
  const { mutate: deleteCourse, isLoading: isDeleting } = useDeleteCourse();
  const { mutate: inviteStudents } = useInviteStudents();

  if (isUndefined(id) || isUndefined(user)) {
    return null;
  }

  const onInvite = () => {
    if (isUndefined(course)) {
      return;
    }
    inviteStudents(course.id);
    setIsInviteSnackbarOpened(true);
  };

  return (
    <PaperPanel>
      <BackdropTopProgress open={isDeleting} />
      <Grow in timeout={getTransitionTimeout(0)}>
        <Box display="flex" alignItems="baseline" mb={3}>
          <Typography variant="h3" mr={2}>
            {course?.name ?? <Skeleton variant="text" width="40%" />}
          </Typography>
          {course?.classroomLink && (
            <ClassroomChip href={course?.classroomLink} />
          )}
          <IconButton
            size="large"
            sx={{ ml: 'auto', alignSelf: 'start' }}
            disabled={isUndefined(course)}
            onClick={(e) => setMenuAnchor(e.currentTarget)}
          >
            <MoreVertIcon />
          </IconButton>
        </Box>
      </Grow>
      <Grow in timeout={getTransitionTimeout(1)}>
        <div>
          {isStudent(user.role) && (
            <Typography mt={3} display="flex">
              Викладач:{' '}
              {course ? (
                <Link
                  color="secondary"
                  underline="hover"
                  to={`${Path.USER}/${course.owner.id}`}
                  ml={0.5}
                >
                  {getFullName(course.owner)}
                </Link>
              ) : (
                <Skeleton variant="text" width={40} sx={{ ml: 0.5 }} />
              )}
            </Typography>
          )}
          {isLecturer(user.role) && (
            <>
              <Typography mb={2}>Групи</Typography>
              {course?.groups.map((group, i) => (
                <Grow
                  key={group.id}
                  in
                  timeout={getTransitionTimeout(1) + i * 50}
                >
                  <Accordion sx={styles.accordion}>
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
                          {index !== arr.length - 1 && (
                            <Divider sx={{ my: 2 }} />
                          )}
                        </Fragment>
                      ))}
                    </AccordionDetails>
                  </Accordion>
                </Grow>
              ))}
            </>
          )}
        </div>
      </Grow>
      {isNotUndefined(course) && (
        <Menu
          open={Boolean(menuAnchor)}
          anchorEl={menuAnchor}
          onClose={() => setMenuAnchor(null)}
          anchorOrigin={{
            horizontal: 'center',
            vertical: 'bottom',
          }}
          transformOrigin={{
            horizontal: 'right',
            vertical: 'top',
          }}
          PaperProps={{ sx: { mt: 0.5 } }}
        >
          {course.classroomLink && (
            <MenuItem onClick={onInvite}>
              <ListItemIcon>
                <EmailIcon />
              </ListItemIcon>
              <ListItemText>
                Надіслати студентам запрошення до Classroom
              </ListItemText>
            </MenuItem>
          )}
          <MenuItem
            onClick={() =>
              deleteCourse(course.id, {
                onSuccess: () => navigate(Path.COURSES),
              })
            }
          >
            <ListItemIcon>
              <DeleteIcon />
            </ListItemIcon>
            <ListItemText>Видалити курс</ListItemText>
          </MenuItem>
        </Menu>
      )}
      <Snackbar
        open={isInviteSnackbarOpened}
        autoHideDuration={5000}
        onClose={() => setIsInviteSnackbarOpened(false)}
        message="Запрошення відправлено"
        action={
          <IconButton
            size="small"
            color="inherit"
            onClick={() => setIsInviteSnackbarOpened(false)}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        }
      />
    </PaperPanel>
  );
};

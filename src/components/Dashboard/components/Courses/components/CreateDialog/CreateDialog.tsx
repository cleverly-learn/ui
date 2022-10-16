import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  FormHelperText,
  IconButton,
  InputLabel,
  Link,
  MenuItem,
  Select,
  Switch,
  TextField,
  Typography,
  Zoom,
} from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { FormData } from 'components/Dashboard/components/Courses/components/CreateDialog/types/form-data.interface';
import { GroupChip } from 'components/_common/GroupChip';
import { NavigationState } from 'components/Dashboard/components/Courses/components/CreateDialog/types/navigation-state.interface';
import { Path } from 'enums/path.enum';
import { SuccessableProgress } from 'components/_common/SuccessableProgress';
import { TipIcon } from 'components/_common/TipIcon';
import { isUndefined } from 'utils/is-undefined';
import { schema } from 'components/Dashboard/components/Courses/components/CreateDialog/schema';
import { useCreateCourse } from 'components/Dashboard/components/Courses/components/CreateDialog/feature/mutations/use-create-course';
import { useFaculties } from 'hooks/queries/use-faculties';
import { useGroups } from 'hooks/queries/use-groups';
import { useInviteStudents } from 'hooks/queries/use-invite-students';
import { useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import CloseIcon from '@mui/icons-material/Close';
import React, { FC, useEffect, useState } from 'react';

interface Props {
  open?: boolean;
  onClose(): void;
}

export const CreateDialog: FC<Props> = ({ open, onClose }) => {
  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
    setValue,
    reset: resetForm,
  } = useForm<FormData>({
    defaultValues: {
      facultyId: '',
      groupsIds: [],
      name: '',
      withClassroom: true,
    },
    resolver: yupResolver(schema),
  });

  const { data: faculties, isLoading: isFacultiesLoading } = useFaculties({
    enabled: open,
  });
  const facultyId = +watch('facultyId');
  const { data: groups, isLoading: isGroupsLoading } = useGroups({
    facultyId,
  });
  const {
    data: course,
    mutate: create,
    isIdle,
    isLoading: isCreating,
    isSuccess: isCreated,
    reset: resetCreation,
  } = useCreateCourse();
  const { mutate: invite } = useInviteStudents();

  const [isGoNextDisabled, setIsGoNextDisabled] = useState(true);

  const groupsMap: Record<number, string> = groups
    ? Object.fromEntries(groups.map(({ id, name }) => [id, name]))
    : [];
  const isClassroomConnected = watch('withClassroom');

  const navigate = useNavigate();

  const goNext = () => {
    if (isUndefined(course)) {
      return;
    }
    if (isClassroomConnected) {
      invite(course.id);
    }
    navigate(`${Path.COURSE}/${course?.id}`, {
      state: { isInvited: isClassroomConnected } as NavigationState,
    });
  };

  const onSubmit = handleSubmit(({ name, groupsIds, withClassroom }) => {
    setIsGoNextDisabled(true);
    create({ name, groupsIds, withClassroom });
  });

  const resetAndClose = () => {
    onClose();
    setTimeout(() => {
      resetCreation();
      resetForm();
    }, 500);
  };

  useEffect(() => {
    setValue('groupsIds', []);
  }, [facultyId, setValue]);

  return (
    <Dialog
      maxWidth="md"
      PaperProps={{ sx: { width: 1, bottom: 100 } }}
      open={Boolean(open)}
      onClose={resetAndClose}
    >
      <DialogTitle sx={{ m: 0, p: 2 }}>
        Новий курс
        <IconButton
          aria-label="close"
          onClick={resetAndClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        {isIdle ? (
          <Box
            component="form"
            // eslint-disable-next-line @typescript-eslint/no-misused-promises
            onSubmit={onSubmit}
            display="flex"
            flexDirection="column"
            px={30}
          >
            <TextField
              size="small"
              sx={{ mt: 2, mb: 4 }}
              label="Назва курсу"
              error={Boolean(errors.name)}
              helperText={errors.name?.message}
              {...register('name')}
            />
            <Controller
              control={control}
              name="facultyId"
              render={({ field, fieldState: { error } }) => (
                <FormControl
                  size="small"
                  sx={{ mb: 2 }}
                  disabled={isFacultiesLoading}
                  error={Boolean(error)}
                >
                  <InputLabel>Факультет</InputLabel>
                  <Select
                    label="Факультет"
                    MenuProps={{ PaperProps: { sx: { maxHeight: 250 } } }}
                    {...field}
                  >
                    {(faculties ?? []).map(({ id, name }) => (
                      <MenuItem key={id} value={id}>
                        {name}
                      </MenuItem>
                    ))}
                  </Select>
                  {error && <FormHelperText>{error.message}</FormHelperText>}
                </FormControl>
              )}
            />
            <Controller
              control={control}
              name="groupsIds"
              render={({ field, fieldState: { error } }) => (
                <FormControl
                  size="small"
                  sx={{ mb: 3 }}
                  disabled={isGroupsLoading}
                  error={Boolean(error)}
                >
                  <InputLabel>Групи</InputLabel>
                  <Select
                    label="Групи"
                    multiple
                    renderValue={(selected) => (
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                        {selected.map((value) => (
                          <GroupChip
                            key={value}
                            group={{ id: value, name: groupsMap[value] }}
                            onMouseDown={(e) => e.stopPropagation()}
                            onDelete={() =>
                              setValue(
                                'groupsIds',
                                selected.filter((id) => id !== value),
                              )
                            }
                            newTab
                          />
                        ))}
                      </Box>
                    )}
                    MenuProps={{ PaperProps: { sx: { maxHeight: 250 } } }}
                    {...field}
                  >
                    {(groups ?? []).map(({ id, name }) => (
                      <MenuItem key={id} value={id}>
                        {name}
                      </MenuItem>
                    ))}
                  </Select>
                  {error && <FormHelperText>{error.message}</FormHelperText>}
                </FormControl>
              )}
            />
            <Controller
              control={control}
              name="withClassroom"
              render={({ field }) => (
                <FormControlLabel
                  sx={{ mx: 'auto', mb: 4 }}
                  control={<Switch defaultChecked {...field} />}
                  label={
                    <Box display="flex" alignItems="center">
                      <Typography>Створити Google Classroom</Typography>
                      <TipIcon text="Класрум буде створено автоматично. Зареєстровані студенти будуть запрошені автоматично після того, як ви підтвердите запрошення до класрум" />
                    </Box>
                  }
                />
              )}
            />
            <Button type="submit" variant="contained">
              Підтвердити
            </Button>
          </Box>
        ) : (
          <Box display="flex" flexDirection="column" alignItems="center">
            <SuccessableProgress isLoading={isCreating} isSuccess={isCreated} />
            <Zoom in={isCreated} timeout={1000}>
              <Box display="flex" flexDirection="column" alignItems="center">
                {isClassroomConnected && (
                  <Typography variant="h5" textAlign="center" mt={6}>
                    Чудово! Тепер підтвердіть{' '}
                    <Link
                      target="_blank"
                      href={course?.classroomLink}
                      onClick={() => setIsGoNextDisabled(false)}
                    >
                      своє запрошення
                    </Link>{' '}
                    у класрум щоб система могла вислати запрошення студентам
                  </Typography>
                )}
                <Button
                  variant="contained"
                  sx={{ mt: 6 }}
                  onClick={goNext}
                  disabled={isGoNextDisabled && isClassroomConnected}
                >
                  {isClassroomConnected
                    ? 'Вислати запрошення та перейти до курсу'
                    : 'Перейти до курсу'}
                </Button>
              </Box>
            </Zoom>
          </Box>
        )}
      </DialogContent>
    </Dialog>
  );
};

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
  MenuItem,
  Select,
  Switch,
  TextField,
  Typography,
} from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { FormData } from 'components/Dashboard/components/Courses/components/CreateDialog/types/form-data.interface';
import { GroupChip } from 'components/_common/GroupChip';
import { Path } from 'enums/path.enum';
import { SuccessableProgress } from 'components/_common/SuccessableProgress';
import { TipIcon } from 'components/_common/TipIcon';
import { schema } from 'components/Dashboard/components/Courses/components/CreateDialog/schema';
import { successPaper } from 'components/_common/Paper/styles';
import { useCreateCourse } from 'components/Dashboard/components/Courses/components/CreateDialog/feature/mutations/use-create-course';
import { useFaculties } from 'components/Dashboard/components/Students/feature/queries/use-faculties';
import { useGroups } from 'components/Dashboard/components/Students/feature/queries/use-groups';
import { useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import CloseIcon from '@mui/icons-material/Close';
import React, { FC, useEffect } from 'react';

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

  const { data: faculties, isLoading: isFacultiesLoading } = useFaculties();
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

  const groupsMap: Record<number, string> = groups
    ? Object.fromEntries(groups.map(({ id, name }) => [id, name]))
    : [];

  const navigate = useNavigate();

  const onGoNext = () => course && navigate(`${Path.COURSE}/${course?.id}`);

  const onSubmit = handleSubmit(({ name, groupsIds, withClassroom }) =>
    create({ name, groupsIds, withClassroom }),
  );

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
      open={Boolean(open)}
      onClose={resetAndClose}
      maxWidth="md"
      PaperProps={{ sx: successPaper(isCreated) }}
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
        <Box
          component="form"
          // eslint-disable-next-line @typescript-eslint/no-misused-promises
          onSubmit={onSubmit}
          width={700}
          display="flex"
          flexDirection="column"
          justifyContent="center"
          px={20}
        >
          {isIdle ? (
            <>
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
                    <Select label="Факультет" {...field}>
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
                        <Box
                          sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}
                        >
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
                        <TipIcon text="Класрум буде створено автоматично із студентами зі списків вибраних груп. Студенти мають бути зареєстровані в системі" />
                      </Box>
                    }
                  />
                )}
              />
              <Button type="submit" variant="contained">
                Підтвердити
              </Button>
            </>
          ) : (
            <Box display="flex" flexDirection="column" alignItems="center">
              <SuccessableProgress
                isLoading={isCreating}
                isSuccess={isCreated}
              />
              <Button variant="contained" sx={{ mt: 8 }} onClick={onGoNext}>
                Перейти до курсу
              </Button>
            </Box>
          )}
        </Box>
      </DialogContent>
    </Dialog>
  );
};

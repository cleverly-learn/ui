import { BackdropTopProgress } from 'components/_common/BackdropTopProgress';
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormHelperText,
  Grow,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { FormData } from 'components/Dashboard/components/Students/components/Create/types/form-data.interface';
import { PanelProps } from 'types/panel-props.interface';
import { getTransitionTimeout } from 'components/Dashboard/components/Profile/utils/get-transition-timeout';
import { schema } from 'components/Dashboard/components/Students/components/Create/schema';
import { useCreateStudent } from 'components/Dashboard/components/Students/components/Create/feature/mutations/use-create-student';
import { useFaculties } from 'hooks/queries/use-faculties';
import { useGroups } from 'hooks/queries/use-groups';
import { yupResolver } from '@hookform/resolvers/yup';
import React, { FC } from 'react';

export const Create: FC<PanelProps> = ({ open, onComplete }) => {
  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      email: '',
      facultyId: '',
      groupId: '',
      firstName: '',
      lastName: '',
      patronymic: '',
      sendInvite: true,
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
  const { mutate: create, isLoading: isCreating } = useCreateStudent();

  const onSubmit = handleSubmit(
    ({ firstName, lastName, patronymic, groupId, sendInvite, email }) =>
      create(
        {
          firstName,
          lastName,
          patronymic,
          groupId: +groupId,
          email: sendInvite ? email : undefined,
        },
        {
          onSuccess: onComplete,
        },
      ),
  );

  return (
    <Box
      component="form"
      display="flex"
      flexDirection="column"
      width={300}
      mt="10%"
      mx="auto"
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      onSubmit={onSubmit}
    >
      <BackdropTopProgress open={isCreating} />
      <Grow in={open} timeout={getTransitionTimeout(0)}>
        <TextField
          size="small"
          sx={{ mb: 1 }}
          label="????????????????"
          error={Boolean(errors.lastName)}
          helperText={errors.lastName?.message}
          {...register('lastName')}
        />
      </Grow>
      <Grow in={open} timeout={getTransitionTimeout(0)}>
        <TextField
          size="small"
          sx={{ mb: 1 }}
          label="????????"
          error={Boolean(errors.firstName)}
          helperText={errors.firstName?.message}
          {...register('firstName')}
        />
      </Grow>
      <Grow in={open} timeout={getTransitionTimeout(0)}>
        <TextField
          size="small"
          sx={{ mb: 2 }}
          label="???? ????????????????"
          error={Boolean(errors.patronymic)}
          helperText={errors.patronymic?.message}
          {...register('patronymic')}
        />
      </Grow>
      <Grow in={open} timeout={getTransitionTimeout(1)}>
        <div>
          <Controller
            control={control}
            name="facultyId"
            render={({ field, fieldState: { error } }) => (
              <FormControl
                size="small"
                sx={{ mb: 1, width: 1 }}
                disabled={isFacultiesLoading}
                error={Boolean(error)}
              >
                <InputLabel>??????????????????</InputLabel>
                <Select
                  label="??????????????????"
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
        </div>
      </Grow>
      <Grow in={open} timeout={getTransitionTimeout(1)}>
        <div>
          <Controller
            control={control}
            name="groupId"
            render={({ field, fieldState: { error } }) => (
              <FormControl
                size="small"
                sx={{ mb: 2, width: 1 }}
                disabled={isGroupsLoading}
                error={Boolean(error)}
              >
                <InputLabel>??????????</InputLabel>
                <Select
                  label="??????????"
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
        </div>
      </Grow>
      <Grow in={open} timeout={getTransitionTimeout(2)}>
        <FormControlLabel
          label="?????????????? ???????????????????? ???? ??????????"
          {...register('sendInvite')}
          control={<Checkbox defaultChecked />}
        />
      </Grow>
      <Grow in={open} timeout={getTransitionTimeout(2)}>
        <TextField
          size="small"
          sx={{ mb: 2 }}
          label="??????????"
          disabled={!watch('sendInvite')}
          error={Boolean(errors.email)}
          helperText={errors.email?.message}
          {...register('email')}
        />
      </Grow>
      <Grow in={open} timeout={getTransitionTimeout(3)}>
        <Box display="flex">
          <Button
            size="large"
            variant="contained"
            color="secondary"
            onClick={onComplete}
            sx={{ mr: 2 }}
            fullWidth
          >
            ??????????????????
          </Button>
          <Button type="submit" size="large" variant="contained" fullWidth>
            ????????????????
          </Button>
        </Box>
      </Grow>
    </Box>
  );
};

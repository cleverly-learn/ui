import { BackdropTopProgress } from 'components/_common/BackdropTopProgress';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  TextField,
} from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { FormData } from 'components/Dashboard/components/Profile/components/Footer/components/ChangePassword/types/form-data.interface';
import { changePasswordSchema } from 'schemas/change-password.schema';
import { useChangePassword } from 'components/Dashboard/components/Profile/components/Footer/components/ChangePassword/feature/mutations/use-change-password';
import { yupResolver } from '@hookform/resolvers/yup';
import CloseIcon from '@mui/icons-material/Close';
import React, { FC, FormEvent } from 'react';

interface Props {
  open?: boolean;
  onClose(): void;
}

export const ChangePassword: FC<Props> = ({ open, onClose }) => {
  const { control, handleSubmit, reset } = useForm<FormData>({
    resolver: yupResolver(changePasswordSchema),
    defaultValues: {
      password: '',
      repeatPassword: '',
    },
  });
  const { mutate, isLoading } = useChangePassword();

  const closeAndReset = () => {
    onClose();
    reset();
  };

  return (
    <Dialog onClose={closeAndReset} open={Boolean(open)}>
      <BackdropTopProgress open={isLoading} />
      <DialogTitle>
        Зміна паролю
        <IconButton
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
          }}
          onClick={closeAndReset}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <Box
        component="form"
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        onSubmit={(e: FormEvent) => {
          e.stopPropagation();
          return handleSubmit(({ password: newPassword }) =>
            mutate(newPassword, { onSuccess: closeAndReset }),
          )(e);
        }}
      >
        <DialogContent
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            px: 6,
          }}
        >
          <Controller
            name="password"
            control={control}
            render={({ field, fieldState }) => (
              <TextField
                size="small"
                type="password"
                sx={{ mb: 1 }}
                label="Новий пароль"
                error={Boolean(fieldState.error)}
                helperText={fieldState.error?.message}
                {...field}
              />
            )}
          />
          <Controller
            name="repeatPassword"
            control={control}
            render={({ field, fieldState }) => (
              <TextField
                size="small"
                type="password"
                label="Повторіть пароль"
                error={Boolean(fieldState.error)}
                helperText={fieldState.error?.message}
                {...field}
              />
            )}
          />
        </DialogContent>
        <DialogActions
          sx={{
            px: 6,
            pb: 3,
          }}
        >
          <Button type="submit" variant="contained" fullWidth>
            Підтвердити
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
};

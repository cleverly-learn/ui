import { BackdropTopProgress } from 'components/_common/BackdropTopProgress';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  TextField,
} from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { Form } from 'components/_common/Html/styled';
import { FormData } from 'components/Dashboard/components/Profile/components/Footer/components/ChangePassword/types/form-data.interface';
import { schema } from 'components/Dashboard/components/Profile/components/Footer/components/ChangePassword/schema';
import { useChangePassword } from 'components/Dashboard/components/Profile/components/Footer/components/ChangePassword/feature/mutations/use-change-password';
import { yupResolver } from '@hookform/resolvers/yup';
import CloseIcon from '@mui/icons-material/Close';
import React, { FC, useEffect } from 'react';

interface Props {
  open?: boolean;
  onClose(): void;
}

export const ChangePassword: FC<Props> = ({ open, onClose }) => {
  const { control, handleSubmit, reset } = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      newPassword: '',
      repeatNewPassword: '',
    },
  });
  const { mutate, isLoading, isSuccess } = useChangePassword();

  const closeAndReset = () => {
    onClose();
    reset();
  };

  useEffect(() => {
    if (isSuccess) {
      closeAndReset();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess]);

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
      <Form
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        onSubmit={(e) => {
          e.stopPropagation();
          return handleSubmit(({ newPassword }) => mutate(newPassword))(e);
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
            name="newPassword"
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
            name="repeatNewPassword"
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
      </Form>
    </Dialog>
  );
};

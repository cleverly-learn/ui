import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Fab,
  Fade,
  InputAdornment,
  Step,
  StepLabel,
  Stepper,
  TextField,
  Typography,
  Zoom,
} from '@mui/material';
import { GoogleButton } from 'components/_common/GoogleButton/GoogleButton';
import { PanelProps } from 'types/panel-props.interface';
import { Path } from 'enums/path.enum';
import { changePasswordSchema } from 'schemas/change-password.schema';
import { isStudent } from 'enums/role.enum';
import { isUndefined } from 'utils/is-undefined';
import { useCompleteRegistration } from 'components/Onboarding/components/RegistrationStepper/feature/mutations/use-complete-registration';
import { useCurrentUser } from 'hooks/queries/use-current-user';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import CheckIcon from '@mui/icons-material/Check';
import React, { FC, useState } from 'react';

enum RegistrationStep {
  MAIN,
  ADDITIONAL,
  PASSWORD,
  FINISH,
}

export const RegistrationStepper: FC<PanelProps> = ({ open, onComplete }) => {
  const navigate = useNavigate();
  const {
    mutate: complete,
    isLoading: isCompleting,
    isSuccess: isCompleted,
  } = useCompleteRegistration();
  const { data: user } = useCurrentUser();

  const [step, setStep] = React.useState(RegistrationStep.MAIN);
  const [firstName, setFirstName] = useState(user?.firstName ?? '');
  const [lastName, setLastName] = useState(user?.lastName ?? '');
  const [patronymic, setPatronymic] = useState(user?.patronymic ?? '');
  const [telegram, setTelegram] = useState(user?.telegram ?? '');
  const [phone, setPhone] = useState(user?.phone ?? '');
  const [details, setDetails] = useState(user?.details ?? '');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{
    password: string;
    repeatPassword: string;
  }>({
    resolver: yupResolver(changePasswordSchema),
    defaultValues: {
      password: '',
      repeatPassword: '',
    },
  });

  const isNameDisabled = isUndefined(user) || isStudent(user.role);

  const goNext = () => {
    if (step === RegistrationStep.PASSWORD) {
      return;
    }
    setStep((prevStep) => prevStep + 1);
  };

  const onFinish = () => {
    navigate(Path.PROFILE);
  };

  const onSubmit = handleSubmit(({ password }) => {
    complete(
      {
        firstName,
        lastName,
        patronymic,
        telegram,
        phone,
        details,
        password,
      },
      { onSuccess: onComplete },
    );
    setStep(RegistrationStep.FINISH);
  });

  return (
    <Fade in={open}>
      <Box
        component="form"
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        onSubmit={onSubmit}
        display="flex"
        flexDirection="column"
        height={1}
      >
        <Stepper activeStep={step}>
          <Step>
            <StepLabel>Основна інформація</StepLabel>
          </Step>
          <Step>
            <StepLabel
              optional={
                <Typography variant="caption">Необовʼязково</Typography>
              }
            >
              Додаткова інформація
            </StepLabel>
          </Step>
          <Step>
            <StepLabel>Зміна паролю</StepLabel>
          </Step>
          <Step>
            <StepLabel>Завершення</StepLabel>
          </Step>
        </Stepper>
        <Box display="flex" flexDirection="column" alignItems="center" mt={4}>
          {step === RegistrationStep.MAIN && (
            <Fade in={step === RegistrationStep.MAIN}>
              <Box display="flex" flexDirection="column" alignItems="center">
                <TextField
                  size="small"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  disabled={isNameDisabled}
                />
                <TextField
                  size="small"
                  sx={{ mt: 1 }}
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  disabled={isNameDisabled}
                />
                <TextField
                  size="small"
                  sx={{ mt: 1 }}
                  value={patronymic}
                  onChange={(e) => setPatronymic(e.target.value)}
                  disabled={isNameDisabled}
                />
                <Box mt={3}>
                  <GoogleButton text="Підключити Google" />
                </Box>
                <Alert severity="info" sx={{ mt: 2 }}>
                  Google буде використовуватися як додатковий спосіб входу у
                  систему. Також він необхідний для синхронізації курсів Google
                  Classroom із системою Cleverly
                </Alert>
              </Box>
            </Fade>
          )}
          {step === RegistrationStep.ADDITIONAL && (
            <Fade in={step === RegistrationStep.ADDITIONAL}>
              <Box display="flex" flexDirection="column" width={250}>
                <TextField
                  size="small"
                  label="Телеграм"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">@</InputAdornment>
                    ),
                  }}
                  value={telegram}
                  onChange={(e) => setTelegram(e.target.value)}
                />
                <TextField
                  size="small"
                  label="Номер телефону"
                  type="tel"
                  sx={{ mt: 1 }}
                  inputProps={{
                    maxLength: 10,
                  }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">+38</InputAdornment>
                    ),
                  }}
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
                <TextField
                  size="small"
                  label="Додаткова інформація"
                  sx={{ mt: 1 }}
                  multiline
                  rows={4}
                  value={details}
                  onChange={(e) => setDetails(e.target.value)}
                />
              </Box>
            </Fade>
          )}
          {step === RegistrationStep.PASSWORD && (
            <Fade in={step === RegistrationStep.PASSWORD}>
              <Box display="flex" flexDirection="column">
                <TextField
                  size="small"
                  type="password"
                  sx={{ mb: 1 }}
                  label="Новий пароль"
                  error={Boolean(errors.password)}
                  helperText={errors.password?.message}
                  {...register('password')}
                />
                <TextField
                  size="small"
                  type="password"
                  label="Повторіть пароль"
                  error={Boolean(errors.repeatPassword)}
                  helperText={errors.repeatPassword?.message}
                  {...register('repeatPassword')}
                />
              </Box>
            </Fade>
          )}
          {step === RegistrationStep.FINISH && (
            <>
              <Box mt={4} position="relative" onClick={onFinish}>
                <Zoom in={isCompleted} timeout={500}>
                  <Fab
                    color="primary"
                    disabled={isCompleting}
                    sx={{
                      width: 150,
                      height: 150,
                    }}
                  >
                    <CheckIcon sx={{ fontSize: 150 }} />
                  </Fab>
                </Zoom>
                {isCompleting && (
                  <CircularProgress
                    size={130}
                    sx={(theme) => ({
                      color: theme.palette.primary.main,
                      position: 'absolute',
                      top: 0,
                      left: 0,
                    })}
                  />
                )}
              </Box>
              <Button
                variant="contained"
                sx={{ mt: 8 }}
                disabled={isCompleting}
                onClick={onFinish}
              >
                Завершити
              </Button>
            </>
          )}
        </Box>
        <Box display="flex" mt="auto">
          {![RegistrationStep.MAIN, RegistrationStep.FINISH].includes(step) && (
            <Button
              color="secondary"
              onClick={() => setStep((prev) => prev - 1)}
            >
              Назад
            </Button>
          )}
          {step !== RegistrationStep.FINISH && (
            <Button
              type={step === RegistrationStep.PASSWORD ? 'submit' : 'button'}
              sx={{ ml: 'auto' }}
              onClick={() => setTimeout(goNext)}
            >
              Далі
            </Button>
          )}
        </Box>
      </Box>
    </Fade>
  );
};

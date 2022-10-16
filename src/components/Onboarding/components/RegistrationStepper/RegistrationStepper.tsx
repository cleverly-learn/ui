import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Fade,
  InputAdornment,
  Step,
  StepLabel,
  Stepper,
  TextField,
  Typography,
  Zoom,
} from '@mui/material';
import { PanelProps } from 'types/panel-props.interface';
import { Path } from 'enums/path.enum';
import { Scope } from 'enums/scope.enum';
import { SuccessableProgress } from 'components/_common/SuccessableProgress';
import { changePasswordSchema } from 'schemas/change-password.schema';
import { isLecturer, isStudent } from 'enums/role.enum';
import { isUndefined } from 'utils/is-undefined';
import { useCompleteRegistration } from 'components/Onboarding/components/RegistrationStepper/feature/mutations/use-complete-registration';
import { useConnectGoogle } from 'components/Onboarding/components/RegistrationStepper/feature/mutations/use-connect-google';
import { useCurrentUser } from 'hooks/queries/use-current-user';
import { useForm } from 'react-hook-form';
import { useGoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import GoogleIcon from '@mui/icons-material/Google';
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
    isError: isCompletingError,
  } = useCompleteRegistration();
  const { data: user } = useCurrentUser();
  const { mutate: connectGoogle, isLoading: isGoogleConnecting } =
    useConnectGoogle();

  const [step, setStep] = React.useState(RegistrationStep.MAIN);
  const [isNextDisabled, setIsNextDisabled] = useState(true);
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
        details,
        password,
        phone: phone || undefined,
      },
      { onSuccess: onComplete },
    );
    setStep(RegistrationStep.FINISH);
  });

  const login = useGoogleLogin({
    onSuccess: ({ code }) =>
      connectGoogle(code, { onSuccess: () => setIsNextDisabled(false) }),
    flow: 'auth-code',
    scope: user && isLecturer(user.role) ? Scope.CLASSROOM : undefined,
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
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  disabled={isNameDisabled}
                />
                <TextField
                  size="small"
                  sx={{ mt: 1 }}
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
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
                  <Button
                    variant="contained"
                    disabled={!isNextDisabled}
                    onClick={() => login()}
                    endIcon={<GoogleIcon />}
                  >
                    Підключити Google
                  </Button>
                  <Zoom in={isGoogleConnecting}>
                    <CircularProgress
                      sx={{ position: 'absolute', my: 1, ml: 1 }}
                      size={24}
                    />
                  </Zoom>
                </Box>
                <Alert severity="info" sx={{ mt: 2 }}>
                  Google необхідний для синхронізації курсів Google Classroom із
                  системою Cleverly. Також він буде використовуватися як
                  додатковий спосіб входу у систему.
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
              <SuccessableProgress
                onClickSuccess={onFinish}
                isLoading={isCompleting}
                isSuccess={isCompleted}
              />
              <Button
                variant="contained"
                sx={{ mt: 8 }}
                disabled={isCompleting || isCompletingError}
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
              variant="contained"
              disabled={isNextDisabled}
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

import * as yup from 'yup';

export const schema = yup.object({
  login: yup.string().trim().required('Логін не може бути пустим'),
  password: yup.string().trim().required('Пароль не може бути пустим'),
});

import * as yup from 'yup';

export const changePasswordSchema = yup.object({
  password: yup.string().trim().required('Пароль не може бути пустим'),
  repeatPassword: yup
    .string()
    .trim()
    .required('Пароль не співпадає')
    .oneOf([yup.ref('password')], 'Пароль не співпадає'),
});

import * as yup from 'yup';
import { FormData } from 'components/Dashboard/components/Profile/components/Footer/components/ChangePassword/types/form-data.interface';

export const schema: yup.SchemaOf<FormData> = yup.object({
  newPassword: yup.string().trim().required('Пароль не може бути пустим'),
  repeatNewPassword: yup
    .string()
    .trim()
    .required('Пароль не співпадає')
    .oneOf([yup.ref('newPassword')], 'Пароль не співпадає'),
});

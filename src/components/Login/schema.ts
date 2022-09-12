import * as yup from 'yup';
import { FormData } from 'components/Login/types/form-data.interface';

export const schema: yup.SchemaOf<FormData> = yup.object({
  login: yup.string().trim().required('Логін не може бути пустим'),
  password: yup.string().trim().required('Пароль не може бути пустим'),
});

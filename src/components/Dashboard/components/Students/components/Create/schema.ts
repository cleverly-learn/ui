import * as yup from 'yup';
import { FormData } from 'components/Dashboard/components/Students/components/Create/types/form-data.interface';

export const schema: yup.SchemaOf<FormData> = yup.object({
  firstName: yup.string().trim().required('Імʼя не може бути пустим'),
  lastName: yup.string().trim().required('Прізвище не може бути пустим'),
  patronymic: yup
    .string()
    .trim()
    .required('Імʼя по батькові не може бути пустим'),
  sendInvite: yup.boolean(),
  email: yup.string().when('sendInvite', {
    is: true,
    then: yup
      .string()
      .email('Неправильний формат пошти')
      .required('Пошта не може бути пуста'),
  }),
  facultyId: yup.number().required('Факультет має бути вибраним'),
  groupId: yup.number().required('Група має бути вибрана'),
});

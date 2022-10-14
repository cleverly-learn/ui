import * as yup from 'yup';
import { FormData } from 'components/Dashboard/components/Courses/components/CreateDialog/types/form-data.interface';

export const schema: yup.SchemaOf<FormData> = yup.object({
  name: yup.string().trim().required('Назва курсу не може бути пуста'),
  facultyId: yup.number().typeError('Необхідно вибрати факультет').required(),
  groupsIds: yup
    .array()
    .of(yup.number().required())
    .min(1, 'Має бути вибрна хоча б одна група')
    .required(),
  withClassroom: yup.boolean().required(),
});

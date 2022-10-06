import { Page } from 'types/page.interface';
import { Pageable } from 'types/pageable.interface';
import { User } from 'api/users/types/user.interface';
import { getStudentsKeys } from 'components/Dashboard/components/Students/feature/queries/use-students-page';
import { isUndefined } from 'utils/is-undefined';
import { studentsApiService } from 'api/students/students.api.service';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export function useEditStudent(pageable: Required<Pageable>) {
  const queryClient = useQueryClient();

  return useMutation(
    ({
      id,
      ...payload
    }: {
      id: number;
      firstName: string;
      lastName: string;
      patronymic: string;
      groupId: number;
    }) => studentsApiService.patch(id, payload),
    {
      onSuccess: (patchedValues) => {
        const studentsPageKeys = getStudentsKeys(pageable);
        const oldStudentsPage =
          queryClient.getQueryData<Page<User>>(studentsPageKeys);

        if (isUndefined(oldStudentsPage)) {
          return;
        }

        const newStudents = oldStudentsPage.data.map((student) =>
          student.id === patchedValues.id
            ? { ...student, ...patchedValues }
            : student,
        );

        queryClient.setQueryData(studentsPageKeys, {
          ...oldStudentsPage,
          data: newStudents,
        });
      },
    },
  );
}

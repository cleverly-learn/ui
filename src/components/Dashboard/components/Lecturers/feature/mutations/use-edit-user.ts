import { Lecturer } from 'api/lecturers/types/lecturer.interface';
import { Page } from 'types/page.interface';
import { Pageable } from 'types/pageable.interface';
import { getLecturersKeys } from 'components/Dashboard/components/Lecturers/feature/queries/use-lecturers-page';
import { isUndefined } from 'utils/is-undefined';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { usersApiService } from 'api/users/users.api.service';

export function useEditUser(pageable: Required<Pageable>) {
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
    }) => usersApiService.patch(id, payload),
    {
      onSuccess: (user) => {
        const lecturersPageKeys = getLecturersKeys(pageable);
        const oldLecturersPage =
          queryClient.getQueryData<Page<Lecturer>>(lecturersPageKeys);

        if (isUndefined(oldLecturersPage)) {
          return;
        }

        const newLecturers = oldLecturersPage.data.map((lecturer) =>
          lecturer.userId === user.id ? { ...lecturer, ...user } : lecturer,
        );

        queryClient.setQueryData(lecturersPageKeys, {
          ...oldLecturersPage,
          data: newLecturers,
        });
      },
    },
  );
}

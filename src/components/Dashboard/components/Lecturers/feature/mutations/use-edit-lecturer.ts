import { Page } from 'types/page.interface';
import { Pageable } from 'types/pageable.interface';
import { User } from 'api/users/types/user.interface';
import { getLecturersKeys } from 'components/Dashboard/components/Lecturers/feature/queries/use-lecturers-page';
import { isUndefined } from 'utils/is-undefined';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { usersApiService } from 'api/users/users.api.service';

export function useEditLecturer(pageable: Required<Pageable>) {
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
      onSuccess: (patchedValues) => {
        const lecturersPageKeys = getLecturersKeys(pageable);
        const oldLecturersPage =
          queryClient.getQueryData<Page<User>>(lecturersPageKeys);

        if (isUndefined(oldLecturersPage)) {
          return;
        }

        const newLecturers = oldLecturersPage.data.map((lecturer) =>
          lecturer.id === patchedValues.id
            ? { ...lecturer, ...patchedValues }
            : lecturer,
        );

        queryClient.setQueryData(lecturersPageKeys, {
          ...oldLecturersPage,
          data: newLecturers,
        });
      },
    },
  );
}

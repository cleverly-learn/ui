import { LECTURERS_KEY } from 'components/Dashboard/components/Lecturers/feature/queries/use-lecturers-page';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { usersApiService } from 'api/users/users.api.service';

export function useDeleteLecturer() {
  const queryClient = useQueryClient();

  return useMutation((id: number) => usersApiService.delete(id), {
    onSuccess: () => {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      queryClient.invalidateQueries([LECTURERS_KEY]);
    },
  });
}

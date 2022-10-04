import { LECTURERS_KEY } from 'components/Dashboard/components/Lecturers/feature/queries/use-lecturers-page';
import { lecturersApiService } from 'api/lecturers/lecturers.api.service';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export function useSynchronizeLecturers() {
  const queryClient = useQueryClient();

  return useMutation(() => lecturersApiService.synchronize(), {
    onSuccess: () => {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      queryClient.invalidateQueries([LECTURERS_KEY]);
    },
  });
}

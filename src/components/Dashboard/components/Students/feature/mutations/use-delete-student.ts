import { STUDENTS_KEY } from 'components/Dashboard/components/Students/feature/queries/use-students-page';
import { studentsApiService } from 'api/students/students.api.service';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export function useDeleteStudent() {
  const queryClient = useQueryClient();

  return useMutation((id: number) => studentsApiService.delete(id), {
    onSuccess: () => {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      queryClient.invalidateQueries([STUDENTS_KEY]);
    },
  });
}

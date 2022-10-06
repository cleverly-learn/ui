import { facultiesApiService } from 'api/faculties/faculties.api.service';
import { useQuery } from '@tanstack/react-query';

const FACULTIES_KEY = 'students_faculties';

export const useFaculties = () =>
  useQuery([FACULTIES_KEY], () => facultiesApiService.getAll(), {
    staleTime: Infinity,
  });

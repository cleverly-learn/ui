import { facultiesApiService } from 'api/faculties/faculties.api.service';
import { isUndefined } from 'utils/is-undefined';
import { useQuery } from '@tanstack/react-query';

const FACULTIES_KEY = 'faculties';

export const useFaculties = (options?: { enabled?: boolean }) =>
  useQuery([FACULTIES_KEY], () => facultiesApiService.getAll(), {
    staleTime: Infinity,
    enabled: isUndefined(options?.enabled) || options?.enabled,
  });

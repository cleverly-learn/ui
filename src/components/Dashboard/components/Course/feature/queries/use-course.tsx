import { COURSES_KEY } from 'components/Dashboard/components/Courses/feature/queries/use-courses';
import { coursesApiService } from 'api/courses/courses.api.service';
import { isPositive } from 'utils/number/is-positive';
import { useQuery } from '@tanstack/react-query';

export const useCourse = (id: number) =>
  useQuery([COURSES_KEY, id], () => coursesApiService.get(id), {
    enabled: isPositive(id),
  });

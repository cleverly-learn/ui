import { coursesApiService } from 'api/courses/courses.api.service';
import { useQuery } from '@tanstack/react-query';

export const COURSES_KEY = 'courses';

export const useCourses = () =>
  useQuery([COURSES_KEY], () => coursesApiService.getAll(), {
    staleTime: Infinity,
  });

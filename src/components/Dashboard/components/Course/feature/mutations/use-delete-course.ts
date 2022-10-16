import { COURSES_KEY } from 'components/Dashboard/components/Courses/feature/queries/use-courses';
import { CoursePreview } from 'api/courses/types/course-preview.interface';
import { coursesApiService } from 'api/courses/courses.api.service';
import { isUndefined } from 'utils/is-undefined';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export function useDeleteCourse() {
  const queryClient = useQueryClient();

  return useMutation((id: number) => coursesApiService.delete(id), {
    onSuccess: (_, id) => {
      const courses = queryClient.getQueryData<CoursePreview[]>([COURSES_KEY]);

      if (isUndefined(courses)) {
        return;
      }

      queryClient.setQueriesData(
        [COURSES_KEY],
        courses.filter((course) => course.id !== id),
      );
    },
  });
}

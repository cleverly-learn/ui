import { AuthorizedApiService } from 'api/authorized-api.service';
import { Course } from 'api/courses/types/course';

class CoursesApiService extends AuthorizedApiService {
  constructor() {
    super('courses');
  }

  create(payload: {
    name: string;
    groupsIds: number[];
    withClassroom: boolean;
  }): Promise<Course> {
    return this.api.post<Course>('', payload).then(({ data }) => data);
  }
}

export const coursesApiService = new CoursesApiService();

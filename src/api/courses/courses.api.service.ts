import { AuthorizedApiService } from 'api/authorized-api.service';
import { CoursePreview } from 'api/courses/types/course-preview.interface';

class CoursesApiService extends AuthorizedApiService {
  constructor() {
    super('courses');
  }

  create(payload: {
    name: string;
    groupsIds: number[];
    withClassroom: boolean;
  }): Promise<CoursePreview> {
    return this.api.post<CoursePreview>('', payload).then(({ data }) => data);
  }

  async inviteStudents(courseId: number): Promise<void> {
    await this.api.post(`${courseId}/invite`);
  }

  getAll(): Promise<CoursePreview[]> {
    return this.api.get<CoursePreview[]>('').then(({ data }) => data);
  }
}

export const coursesApiService = new CoursesApiService();

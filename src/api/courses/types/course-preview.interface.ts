import { CourseBae } from 'api/courses/types/course-base.interface';
import { GroupBase } from 'api/groups/types/group-base.interface';

export interface CoursePreview extends CourseBae {
  groups: GroupBase[];
}

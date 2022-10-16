import { CourseBae } from 'api/courses/types/course-base.interface';
import { Group } from 'api/groups/types/group.interface';

export interface Course extends CourseBae {
  groups: Group[];
}

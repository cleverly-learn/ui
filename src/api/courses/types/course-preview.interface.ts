import { GroupBase } from 'api/groups/types/group-base.interface';

export interface CoursePreview {
  id: number;
  name: string;
  classroomLink: string;
  groups: GroupBase[];
}

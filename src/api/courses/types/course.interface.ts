import { Group } from 'api/groups/types/group.interface';

export interface Course {
  id: number;
  name: string;
  classroomLink: string;
  groups: Group[];
}

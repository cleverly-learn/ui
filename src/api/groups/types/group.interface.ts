import { GroupBase } from 'api/groups/types/group-base.interface';
import { StudentBase } from 'api/students/types/student-base.interface';

export interface Group extends GroupBase {
  students: StudentBase[];
}

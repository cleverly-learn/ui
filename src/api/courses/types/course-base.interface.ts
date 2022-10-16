import { UserBase } from 'api/users/types/user-base.interface';

export interface CourseBae {
  id: number;
  name: string;
  classroomLink: string;
  owner: UserBase;
}

import { UserBase } from 'api/users/types/user-base.interface';

export interface Lecturer extends UserBase {
  id: number;
  userId: number;
  scheduleId: string;
}

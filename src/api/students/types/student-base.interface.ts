import { UserBase } from 'api/users/types/user-base.interface';

export interface StudentBase extends UserBase {
  id: number;
  userId: number;
}

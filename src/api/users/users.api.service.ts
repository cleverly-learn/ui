import { AuthorizedApiService } from 'api/authorized-api.service';
import { User } from 'api/users/types/user.interface';

interface PatchParams {
  id?: number;
  firstName?: string;
  lastName?: string;
  patronymic?: string;
  password?: string;
}
type PatchReturn = Omit<PatchParams, 'password'>;

class UsersApiService extends AuthorizedApiService {
  constructor() {
    super('users');
  }

  getCurrentUser(): Promise<User> {
    return this.api.get<User>('me').then(({ data }) => data);
  }

  patchCurrentUser(payload: PatchParams): Promise<PatchReturn> {
    return this.api.patch<PatchReturn>('me', payload).then(({ data }) => data);
  }
}

export const usersApiService = new UsersApiService();

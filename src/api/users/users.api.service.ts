import { ApiService } from 'api/api.service';
import { User } from 'api/users/types/user.interface';

class UsersApiService extends ApiService {
  constructor() {
    super('users');
  }

  getCurrentUser(): Promise<User> {
    return this.api.get<User>('me').then(({ data }) => data);
  }
}

export const usersApiService = new UsersApiService();

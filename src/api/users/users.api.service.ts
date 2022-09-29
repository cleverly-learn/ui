import { AuthorizedApiService } from 'api/authorized-api.service';
import { Page } from 'types/page.interface';
import { Pageable } from 'types/pageable.interface';
import { Role } from 'enums/role.enum';
import { User } from 'api/users/types/user.interface';

interface PatchParams {
  id?: number;
  firstName?: string;
  lastName?: string;
  patronymic?: string;
  password?: string;
}
type PatchReturn = Omit<PatchParams, 'password'>;

interface CreateParams {
  password: string;
  email?: string;
  isRegistered: boolean;
  role: Role;
  firstName: string;
  lastName: string;
  patronymic: string;
}

interface GetAllParams extends Pageable {
  role: Role;
}

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

  getAll(params: GetAllParams): Promise<Page<User>> {
    return this.api.get<Page<User>>('', { params }).then(({ data }) => data);
  }

  patch(id: number, payload: PatchParams): Promise<PatchReturn> {
    return this.api
      .patch<PatchParams>(id.toString(), payload)
      .then(({ data }) => data);
  }

  create(payload: CreateParams): Promise<User> {
    return this.api.post<User>('', payload).then(({ data }) => data);
  }

  delete(id: number): Promise<void> {
    return this.api.delete(id.toString());
  }
}

export const usersApiService = new UsersApiService();

import { AuthorizedApiService } from 'api/authorized-api.service';
import { GroupBase } from 'api/groups/types/group-base.interface';
import { Page } from 'types/page.interface';
import { Pageable } from 'types/pageable.interface';
import { Student } from 'api/students/types/student.interface';

interface CreateParams {
  groupId: number;
  firstName: string;
  lastName: string;
  patronymic: string;
}

interface PatchParams {
  groupId?: number;
  firstName?: string;
  lastName?: string;
  patronymic?: string;
}
interface PatchReturn {
  id: number;
  group?: GroupBase;
  firstName?: string;
  lastName?: string;
  patronymic?: string;
}

class StudentsApiService extends AuthorizedApiService {
  constructor() {
    super('students');
  }

  getAll(params?: Pageable): Promise<Page<Student>> {
    return this.api.get<Page<Student>>('', { params }).then(({ data }) => data);
  }

  patch(id: number, payload: PatchParams): Promise<PatchReturn> {
    return this.api
      .patch<PatchReturn>(id.toString(), payload)
      .then(({ data }) => data);
  }

  create(payload: CreateParams): Promise<Student> {
    return this.api.post<Student>('', payload).then(({ data }) => data);
  }

  delete(id: number): Promise<void> {
    return this.api.delete(id.toString());
  }
}

export const studentsApiService = new StudentsApiService();

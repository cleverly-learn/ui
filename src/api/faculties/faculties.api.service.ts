import { AuthorizedApiService } from 'api/authorized-api.service';
import { Faculty } from 'api/faculties/types/faculty.interface';

class FacultiesApiService extends AuthorizedApiService {
  constructor() {
    super('faculties');
  }

  getAll(): Promise<Faculty[]> {
    return this.api.get<Faculty[]>('').then(({ data }) => data);
  }
}

export const facultiesApiService = new FacultiesApiService();

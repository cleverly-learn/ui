import { AuthorizedApiService } from 'api/authorized-api.service';
import { Lecturer } from 'api/lecturers/types/lecturer.interface';
import { Page } from 'types/page.interface';
import { Pageable } from 'types/pageable.interface';

class LecturersApiService extends AuthorizedApiService {
  constructor() {
    super('lecturers');
  }

  getAll(params?: Pageable): Promise<Page<Lecturer>> {
    return this.api
      .get<Page<Lecturer>>('', { params })
      .then(({ data }) => data);
  }

  async synchronize(): Promise<void> {
    await this.api.post('sync');
  }

  export(): Promise<Blob> {
    return this.api
      .get<Blob>('export', {
        responseType: 'blob',
      })
      .then(({ data }) => data);
  }

  delete(id: number): Promise<void> {
    return this.api.delete(id.toString());
  }
}

export const lecturersApiService = new LecturersApiService();

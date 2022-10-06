import { AuthorizedApiService } from 'api/authorized-api.service';

class LecturersApiService extends AuthorizedApiService {
  constructor() {
    super('lecturers');
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

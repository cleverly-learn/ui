import { AuthorizedApiService } from 'api/authorized-api.service';
import { Group } from 'api/groups/types/group.interface';
import { GroupPreview } from 'api/groups/types/group-preview.interface';
import { Page } from 'types/page.interface';
import { Pageable } from 'types/pageable.interface';

interface GetAllParams extends Pageable {
  facultyId?: number;
}

class GroupsApiService extends AuthorizedApiService {
  constructor() {
    super('groups');
  }

  async synchronize(): Promise<void> {
    await this.api.post('sync');
  }

  getAll(params?: GetAllParams): Promise<Page<GroupPreview>> {
    return this.api
      .get<Page<GroupPreview>>('', { params })
      .then(({ data }) => data);
  }

  get(id: number): Promise<Group> {
    return this.api.get<Group>(`/${id}`).then(({ data }) => data);
  }
}

export const groupsApiService = new GroupsApiService();

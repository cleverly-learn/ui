import { AuthorizedApiService } from 'api/authorized-api.service';
import { Group } from 'api/groups/types/group.interface';
import { Page } from 'types/page.interface';
import { Pageable } from 'types/pageable.interface';

class GroupsApiService extends AuthorizedApiService {
  constructor() {
    super('groups');
  }

  async synchronize(): Promise<void> {
    await this.api.post('sync');
  }

  getAll(params: Pageable): Promise<Page<Group>> {
    return this.api.get<Page<Group>>('', { params }).then(({ data }) => data);
  }
}

export const groupsApiService = new GroupsApiService();

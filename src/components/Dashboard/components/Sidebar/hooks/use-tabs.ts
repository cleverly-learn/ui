import { Role } from 'enums/role.enum';
import { TabProps } from 'components/Dashboard/components/Sidebar/types/tab-props.interface';
import {
  adminTabs,
  getLecturerTabs,
  getStudentTabs,
} from 'components/Dashboard/components/Sidebar/constants';
import { isUndefined } from 'utils/is-undefined';
import { useCurrentUser } from 'hooks/queries/use-current-user';

export function useTabs(): TabProps[] {
  const { data: user } = useCurrentUser();

  if (isUndefined(user)) {
    return [];
  }

  switch (user.role) {
    case Role.ADMIN:
      return adminTabs;
    case Role.LECTURER:
      return getLecturerTabs(user.scheduleId ?? '');
    case Role.STUDENT:
      return getStudentTabs(user.scheduleId ?? '', user.group?.id ?? 0);
    default:
      return [];
  }
}

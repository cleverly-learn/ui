import { Path } from 'enums/path.enum';
import { TabProps } from 'components/MainWrapper/components/Sidebar/types/tab-props.interface';
import { createElement } from 'react';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import GroupsIcon from '@mui/icons-material/Groups';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import PersonIcon from '@mui/icons-material/Person';
import SchoolIcon from '@mui/icons-material/School';

export const tabs: TabProps[] = [
  {
    to: Path.PROFILE,
    label: 'Профіль',
    icon: createElement(PersonIcon),
  },
  {
    to: Path.STUDENTS,
    label: 'Студенти',
    icon: createElement(PeopleAltIcon),
  },
  {
    to: Path.LECTURERS,
    label: 'Викладачі',
    icon: createElement(SchoolIcon),
  },
  {
    to: Path.GROUPS,
    label: 'Групи',
    icon: createElement(GroupsIcon),
  },
  {
    to: Path.ADMINS,
    label: 'Адміністратори',
    icon: createElement(AdminPanelSettingsIcon),
  },
];

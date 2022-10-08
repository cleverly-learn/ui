import { TabProps } from 'components/Dashboard/components/Sidebar/types/tab-props.interface';
import { useLocation } from 'react-router-dom';

export function useTabsValue(tabs: TabProps[]): string | false {
  const { pathname } = useLocation();

  return tabs.map(({ to }) => to).includes(pathname) ? pathname : false;
}

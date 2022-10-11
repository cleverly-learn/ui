import { ReactElement } from 'react';

export interface TabProps {
  to?: string;
  href?: string;
  label: string;
  icon?: ReactElement;
}

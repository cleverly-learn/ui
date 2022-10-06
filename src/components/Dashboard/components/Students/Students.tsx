import { List } from 'components/Dashboard/components/Students/components/List';
import { PaperPanel } from 'components/_common/PaperPanel';
import React, { FC } from 'react';

export const Students: FC = () => {
  return (
    <PaperPanel sx={{ display: 'flex', flexDirection: 'column' }}>
      <List />
    </PaperPanel>
  );
};

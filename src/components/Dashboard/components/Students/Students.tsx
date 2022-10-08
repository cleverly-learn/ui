import { Create } from 'components/Dashboard/components/Students/components/Create/Create';
import { List } from 'components/Dashboard/components/Students/components/List';
import { PaperPanel } from 'components/_common/PaperPanel';
import React, { FC, useState } from 'react';

export const Students: FC = () => {
  const [isCreation, setIsCreation] = useState(false);

  return (
    <PaperPanel sx={{ display: 'flex', flexDirection: 'column' }}>
      {isCreation ? (
        <Create open={isCreation} onComplete={() => setIsCreation(false)} />
      ) : (
        <List open={!isCreation} onComplete={() => setIsCreation(true)} />
      )}
    </PaperPanel>
  );
};

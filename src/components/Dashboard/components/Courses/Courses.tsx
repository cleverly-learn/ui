import { CreateDialog } from 'components/Dashboard/components/Courses/components/CreateDialog/CreateDialog';
import { PanelFab } from 'components/_common/PanelFab/styled';

import AddIcon from '@mui/icons-material/Add';
import React, { FC, useState } from 'react';

export const Courses: FC = () => {
  const [isCreating, setIsCreating] = useState(false);

  return (
    <>
      <CreateDialog open={isCreating} onClose={() => setIsCreating(false)} />
      <PanelFab color="primary" onClick={() => setIsCreating(true)}>
        <AddIcon />
      </PanelFab>
    </>
  );
};

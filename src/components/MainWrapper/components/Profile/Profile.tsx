import { Edit } from 'components/MainWrapper/components/Profile/components/Edit/Edit';
import { PaperPanel } from 'components/_common/PaperPanel/styled';
import { View } from 'components/MainWrapper/components/Profile/components/View/View';
import React, { FC, useState } from 'react';

export const Profile: FC = () => {
  const [isEditMode, setIsEditMode] = useState(false);

  return (
    <PaperPanel sx={{ display: 'flex', flexDirection: 'column' }}>
      {isEditMode ? (
        <Edit open={isEditMode} onComplete={() => setIsEditMode(false)} />
      ) : (
        <View open={!isEditMode} onComplete={() => setIsEditMode(true)} />
      )}
    </PaperPanel>
  );
};

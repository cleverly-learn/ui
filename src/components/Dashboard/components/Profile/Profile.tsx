import { Edit } from 'components/Dashboard/components/Profile/components/Edit/Edit';
import { PaperPanel } from 'components/_common/PaperPanel';
import { View } from 'components/Dashboard/components/Profile/components/View/View';
import React, { FC, useState } from 'react';

export const Profile: FC = () => {
  const [isEditMode, setIsEditMode] = useState(false);

  return (
    <PaperPanel>
      {isEditMode ? (
        <Edit open={isEditMode} onComplete={() => setIsEditMode(false)} />
      ) : (
        <View open={!isEditMode} onComplete={() => setIsEditMode(true)} />
      )}
    </PaperPanel>
  );
};

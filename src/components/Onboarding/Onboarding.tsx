import { Box, SxProps } from '@mui/material';
import { Logo } from 'components/_common/Logo';
import { PaperPanel } from 'components/_common/PaperPanel';
import { RegistrationStepper } from 'components/Onboarding/components/RegistrationStepper/RegistrationStepper';
import { Welcome } from 'components/Onboarding/components/Welcome';
import { successPaper } from 'components/_common/Paper/styles';
import React, { FC, useState } from 'react';

const Onboarding: FC = () => {
  const [isStepper, setIsStepper] = useState(false);
  const [isFinish, setIsFinish] = useState(false);

  return (
    <Box mx="auto" mt="10%" width={700} height={500}>
      <Box display="flex" justifyContent="center" mb={2}>
        <Logo />
      </Box>
      <PaperPanel paperSx={successPaper(isFinish) as SxProps}>
        {isStepper ? (
          <RegistrationStepper
            open={isStepper}
            onComplete={() => setIsFinish(true)}
          />
        ) : (
          <Welcome open={!isStepper} onComplete={() => setIsStepper(true)} />
        )}
      </PaperPanel>
    </Box>
  );
};

// eslint-disable-next-line import/no-default-export
export default Onboarding;

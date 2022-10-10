import { Box, alpha, useTheme } from '@mui/material';
import { Logo } from 'components/_common/Logo';
import { PaperPanel } from 'components/_common/PaperPanel';
import { RegistrationStepper } from 'components/Onboarding/components/RegistrationStepper/RegistrationStepper';
import { Welcome } from 'components/Onboarding/components/Welcome';
import React, { FC, useState } from 'react';

const Onboarding: FC = () => {
  const theme = useTheme();

  const [isStepper, setIsStepper] = useState(false);
  const [isFinish, setIsFinish] = useState(false);

  return (
    <Box mx="auto" mt="10%" width={700} height={500}>
      <Box display="flex" justifyContent="center" mb={2}>
        <Logo />
      </Box>
      <PaperPanel
        paperSx={{
          bgcolor: isFinish
            ? alpha(theme.palette.primary.light, 0.5)
            : undefined,
          transition: `1s`,
        }}
      >
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

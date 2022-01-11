import React from 'react';
import usePersistedState from '../../../misc/usePersistedState';
import OnboardingDialog from './OnboardingDialog';

import WelcomeStep from './WelcomeStep';
import CreateWalletDialog from './CreateWalletDialog';
import { useState } from 'react';
import Button from '../../Element/button';

interface Props {}

const GetStarted = (props: Props) => {
  const [isOnboardingDialogOpen, setIsOnboardingDialogOpen] = useState(false);
  const [isCreateWalletDialogOpen, setIsCreateWalletDialogOpen] =
    useState(false);

  return (
    <div className='relative'>
      <WelcomeStep />
      <div className='flex justify-center'>
        <div className='pt-10 max-w-sm w-full'>
          <Button text='Get Started' onClick={() => {
              setIsOnboardingDialogOpen(true);
            }} />
        </div>
      </div>

      <OnboardingDialog
        open={isOnboardingDialogOpen}
        onClose={() => setIsOnboardingDialogOpen(false)}
        onSubmit={(password) => {
          setIsOnboardingDialogOpen(false);
          setIsCreateWalletDialogOpen(true);
        }}
      />
      <CreateWalletDialog
        open={isCreateWalletDialogOpen}
        onClose={() => setIsCreateWalletDialogOpen(false)}
      />
    </div>
  );
};

export default GetStarted;

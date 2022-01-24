import React from 'react';
import Dialog from '../../../Element/dialog';
import useStateHistory from '../../../../background/misc/useStateHistory';
import StartStage from './CommonStage/StartStage';
import WhatIsMnemonicStage from './CommonStage/WhatIsMnemonicStage';
import SelectStage from './ImportStage/SelectStage';
import ConfirmMnemonicStage from './CommonStage/ConfirmMnemonicStage';

interface Props {
  open: boolean;
  onClose: (open: boolean) => void;
}

export enum ImportStage {
  SelectStage = 'Select',
  ImportMnemonicPhraseStage = 'import secret recovery phrase',
  MnemonicPhraseBackupStage = 'use secret recovery phrase backup',
  ConnectLedgerDeviceStage = 'connect ledger device',
}

export enum CommonStage {
  StartStage = 'start',
  AccessMyWalletStage = 'access my wallet',
  CreateWalletStage = 'create wallet',
  ConfirmMnemonicStage = 'confirm secret recovery',
  SetSecurityPasswordStage = 'set security password',
  ImportWalletStage = 'import wallet',
  ImportLedgerWalletStage = 'import ledger wallet',
  WhatIsMnemonicStage = 'what is secret recovery phrase',
}

interface Content {
  title: string;
  content: React.ReactNode;
}

export type Stage = CommonStage | ImportStage;

const CreateWalletDialog = ({ open, onClose }: Props) => {
  const [stage, setStage, toPrevStage, isPrevStageAvailable] =
    useStateHistory<Stage>(CommonStage.StartStage);

  const content: Content = React.useMemo(() => {
    switch (stage) {
      case CommonStage.StartStage:
        return {
          title: 'Getting Started',
          content: <StartStage setStage={setStage} />,
        };
      case CommonStage.WhatIsMnemonicStage:
        return {
          title: 'Wallet Mnemonic',
          content: (
            <WhatIsMnemonicStage
              mnemonic={
                'test1 test2 test3 test4 test5 test6 test7 test8 test9 test10 test11 test12 test13 test14 test15 test16 test17 test18 test19 test20 test21 test22 test23 test24'
              } 
              setStage={() => {setStage(CommonStage.ConfirmMnemonicStage)}}
            />
          ),
        };
      case CommonStage.ConfirmMnemonicStage:
        return {
          title: 'Confirm Mnemonic',
          content: (
            <ConfirmMnemonicStage
              mnemonic={
                'test test test test test test test test test test test test test test test test test test test test test test test test '
              }
              setStage={() => {setStage(CommonStage.ConfirmMnemonicStage)}}
            />
          ),
        };
      case ImportStage.SelectStage:
        return {
          title: 'Access My Wallet',
          content: <SelectStage />,
        };
    }
  }, [stage]);

  return (
    <Dialog
      title={content.title}
      open={open}
      onClose={() => {
        onClose(false);
        setStage(CommonStage.StartStage);
      }}
      toPrevStage={isPrevStageAvailable ? toPrevStage : null}
    >
      <>{content.content}</>
    </Dialog>
  );
};

export default CreateWalletDialog;

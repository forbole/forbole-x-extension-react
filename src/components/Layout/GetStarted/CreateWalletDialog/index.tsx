import React from 'react';
import Dialog from '../../../Element/dialog';
import useStateHistory from '../../../../background/misc/useStateHistory';
import Start from './start';
import WhatIsMnemonicStage from './CommonStage/WhatIsMnemonicStage';
import SelectStage from './ImportStage/SelectStage';

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
          content: <Start setStage={setStage} />,
        };
      case CommonStage.WhatIsMnemonicStage:
        return {
          title: 'Wallet Mnemonic',
          content: (
            <WhatIsMnemonicStage
              mnemonic={
                'test test test test test test test test test test test test test test test test test test test test test test test test '
              }
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
    >
      <>{content.content}</>
    </Dialog>
  );
};

export default CreateWalletDialog;

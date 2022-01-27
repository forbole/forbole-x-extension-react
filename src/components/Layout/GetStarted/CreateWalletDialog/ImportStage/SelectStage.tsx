import React from 'react';
import ButtonArea from '../../../../Element/buttonArea';
import { Stage, ImportStage } from '../index';

interface Props {
  setStage: (
    state: Stage,
    resetHistory?: boolean,
    replaceHistory?: boolean
  ) => void;
}

const SelectStage = ({ setStage }) => {
  const methods = [
    {
      title: 'Import Secret Recovery Phrase to restore a wallet',
      description:
        'If you would like to restore a previous wallet, please import the 24-word secret recovery phrase.',
      stage: ImportStage.ImportMnemonicPhraseStage,
    },
    {
      title: 'Use Secret Recovery Phrase Backup',
      description:
        'Secret Recovery Phrase Backup is your secret recovery phrase encrypted with a password set by yourself. A wallet can be restored from the decrypted backup.',
        stage: ImportStage.MnemonicPhraseBackupStage,
      },
    {
      title: 'Connect with Ledger Hardware Wallet',
      description: 'Connect your Ledger Nano S or Nano X to start.',
    },
  ];

  return (
    <div className='px-6'>
      <div className='text-center text-gray-500 my-5'>
        <p>
          Welcome to Forbole X, import existing wallet to manage your assets,
        </p>
        <p>control your multi assets in a single interface</p>
      </div>
      <div className='space-y-4'>
        {methods.map((m) => (
          <ButtonArea
            onClick={() => {
              m.stage && setStage(m.stage);
            }}
          >
            <div className='p-4'>
              <h5>{m.title}</h5>
              <p className='text-sm text-gray-500 mt-2'>{m.description}</p>
            </div>
          </ButtonArea>
        ))}
      </div>
    </div>
  );
};

export default SelectStage;

import React from 'react';
import MnemonicPhraseInput from '../../../../CreateWallet/MnemonicPhraseInput';

interface Props {
  mnemonic: string;
}

const WhatIsMnemonicStage = ({ mnemonic }: Props) => {
  return (
    <div className='p-4'>
      <MnemonicPhraseInput disabled mnemonic={mnemonic} />
    </div>
  );
};

export default WhatIsMnemonicStage;

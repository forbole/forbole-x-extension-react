import React from 'react'
import MnemonicPhraseInput from '../../../../CreateWallet/MnemonicPhraseInput'
import Button from '../../../../Element/button'
import { Stage } from '../index'

interface Props {
  mnemonic: string
  setStage: () => void
}

const WhatIsMnemonicStage = ({ mnemonic, setStage }: Props) => {
  return (
    <div className="p-4 space-y-5">
      <MnemonicPhraseInput disabled mnemonic={mnemonic} />
      <Button text="Next" onClick={setStage} />
    </div>
  )
}

export default WhatIsMnemonicStage

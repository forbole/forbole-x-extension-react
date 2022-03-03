import React, { useState } from 'react'
import MnemonicPhraseInput from '../../../../CreateWallet/MnemonicPhraseInput'
import Button from '../../../../Element/button'

interface Props {
  mnemonic: string
  setStage: () => void
}

const ConfirmMnemonicStage = ({ mnemonic, setStage }: Props) => {
  const [confirmMnemonic, setConfirmMnmonic] = useState('')

  return (
    <div className="p-4 space-y-5">
      <MnemonicPhraseInput mnemonic={confirmMnemonic} onChange={setConfirmMnmonic} />
      <Button
        text="Next"
        onClick={() => {
          if (confirmMnemonic === mnemonic) {
            setStage()
          } else {
          }
        }}
      />
    </div>
  )
}

export default ConfirmMnemonicStage

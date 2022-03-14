import React, { useState } from 'react'
import MnemonicPhraseInput from '../../../../CreateWallet/MnemonicPhraseInput'
import Button from '../../../../Element/button'

interface Props {
  mnemonic: string
  onSubmit: () => void
}

const ConfirmMnemonicStage = ({ mnemonic, onSubmit }: Props) => {
  const [confirmMnemonic, setConfirmMnmonic] = useState('')
  const [error, setError] = useState('')

  return (
    <div className="p-4 space-y-5">
      <p className="text-sm text-gray-700 text-center mb-8">
        Please enter your recovery phrase in order and
        <br />
        make sure your recovery phrase is written correctly
      </p>
      <MnemonicPhraseInput mnemonic={confirmMnemonic} onChange={setConfirmMnmonic} />
      {error && <span className="text-red-500">{error}</span>}
      <Button
        text="Next"
        onClick={() => {
          if (confirmMnemonic === mnemonic) {
            onSubmit()
          } else {
            setError('Incorrect recovery phrase')
          }
        }}
      />
    </div>
  )
}

export default ConfirmMnemonicStage

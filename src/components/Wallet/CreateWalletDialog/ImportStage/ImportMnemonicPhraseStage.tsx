import { DirectSecp256k1HdWallet } from '@cosmjs/proto-signing'
import React from 'react'
import MnemonicPhraseInput from '../../../CreateWallet/MnemonicPhraseInput'
import Button from '../../../Element/button'

interface Props {
  onSubmit(mnemonic: string): void
  mnemonic: string
}

const ImportMnemonicPhraseStage = ({ onSubmit, mnemonic: defaultMnemonic }: Props) => {
  const [mnemonic, setMnemonic] = React.useState(defaultMnemonic)
  const [error, setError] = React.useState('')

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault()
        try {
          await DirectSecp256k1HdWallet.fromMnemonic(mnemonic)
          onSubmit(mnemonic)
        } catch (err) {
          setError('Invalid recovery phrase')
        }
      }}
    >
      <div className="p-4 space-y-5 flex flex-col items-center">
        <p className="text-sm text-gray-700 text-center mb-8">
          Please enter your recovery phrase in order and
          <br />
          make sure your recovery phrase is written correctly
        </p>
        <div className="px-4">
          <MnemonicPhraseInput mnemonic={mnemonic} onChange={setMnemonic} />
          {error && <span className="text-red-500">{error}</span>}
        </div>
        <Button text="Next" type="submit" />
      </div>
    </form>
  )
}

export default ImportMnemonicPhraseStage

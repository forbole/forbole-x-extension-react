import React from 'react'
import MnemonicPhraseInput from '../../../../CreateWallet/MnemonicPhraseInput'
import Button from '../../../../Element/button'
import classNames from 'classnames'

interface Props {
  onSubmit(mnemonic: string): void
  mnemonic: string
}

const ImportMnemonicPhraseStage = ({ onSubmit, mnemonic: defaultMnemonic }: Props) => {
  const [mnemonic, setMnemonic] = React.useState(defaultMnemonic)

  return (
    <div className="p-4 space-y-5 flex flex-col items-center">
      <div className="px-4">
        <MnemonicPhraseInput mnemonic={mnemonic} onChange={setMnemonic} />
      </div>
      <Button text="Next" onClick={() => onSubmit(mnemonic)} />
    </div>
  )
}

export default ImportMnemonicPhraseStage

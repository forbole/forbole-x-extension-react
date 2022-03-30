import MnemonicPhraseInput from '../../../CreateWallet/MnemonicPhraseInput'
import Button from '../../../Element/button'

interface Props {
  mnemonic: string
  onSubmit: () => void
}

const CreateWalletStage = ({ mnemonic, onSubmit }: Props) => {
  return (
    <div className="p-6 space-y-5">
      <p className="text-sm text-gray-700 text-center mb-12">
        Please write down and store your recovery phrase safe. <br />
        This is the <b>ONLY WAY</b> to restore your account.
      </p>
      <MnemonicPhraseInput mnemonic={mnemonic} disabled />
      <Button text="Next" onClick={onSubmit} />
    </div>
  )
}

export default CreateWalletStage

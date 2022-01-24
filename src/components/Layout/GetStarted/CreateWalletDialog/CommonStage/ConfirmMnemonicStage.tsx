import React from 'react'
import MnemonicPhraseInput from '../../../../CreateWallet/MnemonicPhraseInput'

interface Props {
    mnemonic: string;
    setStage: () => void;
}

const ConfirmMnemonicStage = ({ setStage }: Props) => {
    const [mnemonic, setMnemonic] = React.useState('')

    return (
        <div className='p-4 space-y-5'>
            <MnemonicPhraseInput mnemonic={mnemonic} onChange={setMnemonic} />
        </div>
    )
}

export default ConfirmMnemonicStage

import React from 'react'
import ButtonArea from '../../../../Element/buttonArea'
import { Stage, ImportStage } from '../index'
import { ReactComponent as ImportPhraseImg } from '../../../../../assets/images/import_phrase.svg'
import { ReactComponent as ImportBackupImg } from '../../../../../assets/images/import_backup.svg'
import { ReactComponent as ImportLedgerImg } from '../../../../../assets/images/import_ledger.svg'
import { ReactComponent as ImportKeyImg } from '../../../../../assets/images/import_key.svg'

interface Props {
  setStage: (state: Stage, resetHistory?: boolean, replaceHistory?: boolean) => void
}

const SelectStage = ({ setStage }) => {
  const methods = [
    {
      title: 'Import Secret Recovery Phrase',
      description: 'Restore your wallet by entering the 12 or 24-word secret recovery phrase',
      image: <ImportPhraseImg />,
      stage: ImportStage.ImportMnemonicPhraseStage,
    },
    {
      title: 'Use Recovery Phrase Backup',
      description:
        'Restore your wallet by entering your password & an encrypted secret recovery phrase backup which was created by you',
      image: <ImportBackupImg />,
      stage: ImportStage.MnemonicPhraseBackupStage,
    },
    {
      title: 'Connect with Ledger',
      description: 'Connect your Ledger Nano S or Nano X to start',
      image: <ImportLedgerImg />,
    },
    {
      title: 'Import Private Key',
      description:
        'Restore your wallet by entering strings of alphanumeric characters to decrypt from your public key',
      image: <ImportKeyImg />,
    },
  ]

  return (
    <div className="px-6">
      <div className="text-center text-gray-500 my-5 text-sm">
        <p>Welcome to Forbole X, import existing wallet to manage your assets,</p>
        <p>control your multi assets in a single interface</p>
      </div>
      <div className="space-y-4">
        {methods.map((m) => (
          <ButtonArea
            className="rounded-xl"
            onClick={() => {
              m.stage && setStage(m.stage)
            }}
          >
            <div className="p-4 flex">
              <div className="min-w-min flex justify-center items-center">
                <div className="mr-4">{m.image}</div>
              </div>
              <div>
                <h5>{m.title}</h5>
                <p className="text-sm text-gray-500 mt-2">{m.description}</p>
              </div>
            </div>
          </ButtonArea>
        ))}
      </div>
    </div>
  )
}

export default SelectStage

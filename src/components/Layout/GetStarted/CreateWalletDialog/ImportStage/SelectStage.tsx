import React from 'react'
import { ReactComponent as RecoveryPhraseIconLight } from '../../../../../assets/images/onboard/enter_passphase_light.svg'
import { ReactComponent as RecoveryPhraseIconDark } from '../../../../../assets/images/onboard/enter_passphase_dark.svg'
import { ReactComponent as BackupPhraseIconLight } from '../../../../../assets/images/onboard/backup_phrase_light.svg'
import { ReactComponent as BackupPhraseIconDark } from '../../../../../assets/images/onboard/backup_phrase_dark.svg'
import { ReactComponent as ConnectLedgerIconLight } from '../../../../../assets/images/onboard/connect_ledger_light.svg'
import { ReactComponent as ConnectLedgerIconDark } from '../../../../../assets/images/onboard/connect_ledger_dark.svg'
import { ReactComponent as PrivateKeyIconLight } from '../../../../../assets/images/onboard/private_key_light.svg'
import { ReactComponent as PrivateKeyIconDark } from '../../../../../assets/images/onboard/private_key_dark.svg'
import ButtonArea from '../../../../Element/buttonArea'
import { Stage, ImportStage } from '../index'
import { useRecoilValue } from 'recoil'
import { themeState } from '../../../../../recoil/general'

interface Props {
  setStage: (state: Stage, resetHistory?: boolean, replaceHistory?: boolean) => void
}

const SelectStage: React.FC<Props> = ({ setStage }) => {
  const theme = useRecoilValue(themeState)
  const methods = [
    {
      image:
        theme === 'light' ? (
          <RecoveryPhraseIconLight width={40} height={40} />
        ) : (
          <RecoveryPhraseIconDark width={40} height={40} />
        ),
      title: 'Import Secret Recovery Phrase',
      description: 'Restore your wallet by entering the 12 or 24-word secret recovery phrase',
      stage: ImportStage.ImportMnemonicPhraseStage,
    },
    {
      image:
        theme === 'light' ? (
          <BackupPhraseIconLight width={40} height={40} />
        ) : (
          <BackupPhraseIconDark width={40} height={40} />
        ),
      title: 'Use Secret Recovery Phrase Backup',
      description:
        'Restore your wallet by entering your password & an encrypted secret recovery phrase backup which was created by you',
      stage: ImportStage.MnemonicPhraseBackupStage,
    },
    {
      image:
        theme === 'light' ? (
          <ConnectLedgerIconLight width={40} height={40} />
        ) : (
          <ConnectLedgerIconDark width={40} height={40} />
        ),
      title: 'Connect with Ledger',
      description: 'Connect your Ledger Nano S or Nano X to start',
      stage: ImportStage.ImportLedgerWalletStage,
    },
    {
      image:
        theme === 'light' ? (
          <PrivateKeyIconLight width={40} height={40} />
        ) : (
          <PrivateKeyIconDark width={40} height={40} />
        ),
      title: 'Import Private Key',
      description:
        'Restore your wallet by entering strings of alphanumeric characters to decrypt from your public key.',
      stage: ImportStage.ImportPrivateKeyStage,
    },
  ]

  return (
    <div className="px-6">
      <div className="text-center text-gray-500 my-5 text-sm">
        <p>
          Welcome to Forbole X, import existing wallet to manage your assets, control your multi
          assets in a single interface
        </p>
      </div>
      <div className="space-y-4 flex flex-col items-center">
        {methods.map((m) => (
          <ButtonArea
            className="rounded-xl"
            key={m.title}
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
        <span className='text-center text-primary-100 text-sm cursor-pointer'>What is secret recovery phrase?</span>
      </div>
    </div>
  )
}

export default SelectStage

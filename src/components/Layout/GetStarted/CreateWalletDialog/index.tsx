import React, { useCallback, useState } from 'react'
import Dialog from '../../../Element/dialog'
import useStateHistory from '../../../../misc/useStateHistory'
import StartStage from './CommonStage/StartStage'
import WhatIsMnemonicStage from './CommonStage/WhatIsMnemonicStage'
import SelectStage from './ImportStage/SelectStage'
import ConfirmMnemonicStage from './CommonStage/ConfirmMnemonicStage'
import ImportMnemonicPhraseStage from './ImportStage/ImportMnemonicPhraseStage'
import SecretRecoveryPhraseStage from './ImportStage/SecretRecoveryPhraseStage'
import SetSecurityPasswordStage from './CommonStage/SetSecurityPasswordStage'
import ImportWalletStage from './CommonStage/ImportWalletStage'
import { useCreateWallet } from '../../../../recoil/wallets'
import getWalletAddress from '../../../../misc/getWalletAddress'
import { DirectSecp256k1HdWallet } from '@cosmjs/proto-signing'

interface Props {
  open: boolean
  onClose: () => void
}

export enum ImportStage {
  SelectStage = 'Select',
  ImportMnemonicPhraseStage = 'import secret recovery phrase',
  MnemonicPhraseBackupStage = 'use secret recovery phrase backup',
  ConnectLedgerDeviceStage = 'connect ledger device',
}

export enum CommonStage {
  StartStage = 'start',
  AccessMyWalletStage = 'access my wallet',
  CreateWalletStage = 'create wallet',
  ConfirmMnemonicStage = 'confirm secret recovery',
  SetSecurityPasswordStage = 'set security password',
  ImportWalletStage = 'import wallet',
  ImportLedgerWalletStage = 'import ledger wallet',
  WhatIsMnemonicStage = 'what is secret recovery phrase',
}

interface Content {
  title: string
  content: React.ReactNode
}

export type Stage = CommonStage | ImportStage

const CreateWalletDialog = ({ open, onClose }: Props) => {
  const [stage, setStage, toPrevStage, isPrevStageAvailable] = useStateHistory<Stage>(
    CommonStage.StartStage
  )

  const [mnemonic, setMnemonic] = useState('')
  const [securityPassword, setSecurityPassword] = useState('')
  const createWallet = useCreateWallet()

  const onCreateWithMnemionicOrPrivKey = useCallback(
    async (name: string, chains: Chain[]) => {
      const addresses = await Promise.all(
        chains.map((c) =>
          getWalletAddress({
            prefix: c.prefix,
            mnemonic,
            // privateKey: ,
            hdPath: {
              coinType: c.coinType,
            },
          })
        )
      )
      await createWallet({
        type: 'mnemonic',
        name,
        mnemonic,
        privateKey: '',
        securityPassword,
        accounts: chains.map((c, i) => ({
          chain: c.chainId,
          address: addresses[i],
        })),
      })
      onClose()
    },
    [mnemonic, securityPassword, createWallet, onClose]
  )

  const content: Content = React.useMemo(() => {
    switch (stage) {
      case CommonStage.StartStage:
        return {
          title: 'Getting Started',
          content: (
            <StartStage
              onImportWalet={() => setStage(ImportStage.SelectStage)}
              onCreateWallet={async () => {
                const newWallet = await DirectSecp256k1HdWallet.generate(24)
                setMnemonic(newWallet.mnemonic)
                setStage(ImportStage.ImportMnemonicPhraseStage)
              }}
            />
          ),
        }
      case CommonStage.WhatIsMnemonicStage:
        return {
          title: 'Wallet Mnemonic',
          content: (
            <WhatIsMnemonicStage
              mnemonic={mnemonic}
              setStage={() => {
                setStage(CommonStage.ConfirmMnemonicStage)
              }}
            />
          ),
        }
      case CommonStage.ConfirmMnemonicStage:
        return {
          title: 'Confirm Mnemonic',
          content: (
            <ConfirmMnemonicStage
              mnemonic={mnemonic}
              setStage={() => {
                setStage(CommonStage.SetSecurityPasswordStage)
              }}
            />
          ),
        }
      case CommonStage.SetSecurityPasswordStage:
        return {
          title: 'Set Security Password',
          content: (
            <SetSecurityPasswordStage
              onSubmit={(pw) => {
                setSecurityPassword(pw)
                setStage(CommonStage.ImportWalletStage)
              }}
            />
          ),
        }
      case CommonStage.ImportWalletStage:
        return {
          title: 'Import Wallet',
          content: <ImportWalletStage onSubmit={onCreateWithMnemionicOrPrivKey} />,
        }
      case ImportStage.ImportMnemonicPhraseStage:
        return {
          title: 'Import Mnemonic Phrase',
          content: (
            <ImportMnemonicPhraseStage
              mnemonic={mnemonic}
              onSubmit={(m) => {
                setMnemonic(m)
                setStage(CommonStage.SetSecurityPasswordStage)
              }}
            />
          ),
        }
      case ImportStage.SelectStage:
        return {
          title: 'Access My Wallet',
          content: <SelectStage setStage={setStage} />,
        }
      case ImportStage.MnemonicPhraseBackupStage:
        return {
          title: 'Secret Recovery Phrase Backup',
          content: <SecretRecoveryPhraseStage />,
        }
    }
  }, [stage, onCreateWithMnemionicOrPrivKey, mnemonic, setStage])

  return (
    <Dialog
      title={content.title}
      open={open}
      onClose={() => {
        onClose()
        setStage(CommonStage.StartStage)
      }}
      toPrevStage={isPrevStageAvailable ? toPrevStage : null}
    >
      <>{content.content}</>
    </Dialog>
  )
}

export default CreateWalletDialog

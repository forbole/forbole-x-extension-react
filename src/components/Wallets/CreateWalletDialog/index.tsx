import React, { useCallback, useEffect, useState } from 'react'
import Dialog from '../../Element/dialog'
import useStateHistory from '../../../misc/useStateHistory'
import StartStage from './CommonStage/StartStage'
import SelectStage from './ImportStage/SelectStage'
import ConfirmMnemonicStage from './CommonStage/ConfirmMnemonicStage'
import ImportMnemonicPhraseStage from './ImportStage/ImportMnemonicPhraseStage'
import SecretRecoveryPhraseStage from './ImportStage/SecretRecoveryPhraseStage'
import SetSecurityPasswordStage from './CommonStage/SetSecurityPasswordStage'
import ImportWalletStage from './CommonStage/ImportWalletStage'
import { useCreateWallet } from '../../../recoil/wallets'
import getWalletAddress from '../../../misc/getWalletAddress'
import { DirectSecp256k1HdWallet } from '@cosmjs/proto-signing'
import CreateWalletStage from './CommonStage/CreateWalletStage'
import ImportPrivateKeyStage from './ImportStage/ImportPrivateKey'
import ImportLedgerStage, { closeAllLedgerConnections } from './ImportStage/ImportLedgerStage'

let ledgerTransport

interface Props {
  open: boolean
  onClose: () => void
}

export enum ImportStage {
  SelectStage = 'Select',
  ImportMnemonicPhraseStage = 'import secret recovery phrase',
  ImportPrivateKeyStage = 'import private key',
  ImportLedgerWalletStage = 'import ledger wallet',
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
  const [ledgerChains, setLedgerChains] = useState([])
  const [ledgerAddresses, setLedgerAddresses] = useState([])
  const [walletName, setWalletName] = useState('')

  const [mnemonic, setMnemonic] = useState('')
  const [privateKey, setPrivateKey] = useState('')
  const [securityPassword, setSecurityPassword] = useState('')

  useEffect(() => {
    if (!open) {
      setLedgerChains([])
      setLedgerAddresses([])
      setWalletName('')
      setMnemonic('')
      setPrivateKey('')
      setSecurityPassword('')
      setStage(CommonStage.StartStage, true)
      closeAllLedgerConnections()
      ledgerTransport = undefined
    }
  }, [open])

  const createWallet = useCreateWallet()

  const onCreateWallet = useCallback(
    async (name: string, chains: Chain[], ledgerAddresses?: string[]) => {
      const addresses =
        ledgerAddresses ||
        (await Promise.all(
          chains.map((c) =>
            getWalletAddress({
              prefix: c.prefix,
              mnemonic,
              privateKey,
              ledgerTransport,
              ledgerAppName: '',
              hdPath: {
                coinType: c.coinType,
              },
            })
          )
        ))
      closeAllLedgerConnections()
      onClose()
      await createWallet({
        type: ledgerTransport ? 'ledger' : privateKey ? 'private key' : 'mnemonic',
        name,
        mnemonic,
        privateKey,
        securityPassword,
        accounts: chains.map((c, i) => ({
          chain: c.chainId,
          address: addresses[i],
        })),
      })
    },
    [mnemonic, privateKey, securityPassword, createWallet, onClose]
  )

  const content: Content = React.useMemo(() => {
    switch (stage) {
      case CommonStage.StartStage:
        return {
          title: 'Getting Started',
          content: (
            <StartStage
              onImportWalet={() => {
                setMnemonic('')
                setPrivateKey('')
                setStage(ImportStage.SelectStage)
              }}
              onCreateWallet={async () => {
                const newWallet = await DirectSecp256k1HdWallet.generate(24)
                setMnemonic(newWallet.mnemonic)
                setPrivateKey('')
                setStage(CommonStage.CreateWalletStage)
              }}
            />
          ),
        }
      case CommonStage.CreateWalletStage:
        return {
          title: 'Create Wallet',
          content: (
            <CreateWalletStage
              mnemonic={mnemonic}
              onSubmit={() => setStage(CommonStage.ConfirmMnemonicStage)}
            />
          ),
        }
      case CommonStage.ConfirmMnemonicStage:
        return {
          title: 'Confirm Recovery Phrase',
          content: (
            <ConfirmMnemonicStage
              mnemonic={mnemonic}
              onSubmit={() => setStage(CommonStage.SetSecurityPasswordStage)}
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
          content: (
            <ImportWalletStage
              onSubmit={(name, chains) => {
                if (ledgerTransport) {
                  setWalletName(name)
                  setLedgerChains(chains)
                  setLedgerAddresses([])
                  setStage(ImportStage.ImportLedgerWalletStage)
                } else {
                  onCreateWallet(name, chains)
                }
              }}
            />
          ),
        }
      case ImportStage.ImportMnemonicPhraseStage:
        return {
          title: 'Recovery Phrase',
          content: (
            <ImportMnemonicPhraseStage
              mnemonic={mnemonic}
              onSubmit={(m) => {
                setMnemonic(m)
                setPrivateKey('')
                setStage(CommonStage.SetSecurityPasswordStage)
              }}
            />
          ),
        }
      case ImportStage.ImportPrivateKeyStage:
        return {
          title: 'Import Private Key',
          content: (
            <ImportPrivateKeyStage
              onSubmit={(p) => {
                setPrivateKey(p)
                setMnemonic('')
                setStage(CommonStage.SetSecurityPasswordStage)
              }}
            />
          ),
        }
      case ImportStage.ImportLedgerWalletStage:
        return {
          title: ledgerChains.length ? 'Open Ledger App' : 'Unlock Ledger',
          content: (
            <ImportLedgerStage
              onConnect={
                ledgerChains.length
                  ? undefined
                  : (transport) => {
                      ledgerTransport = transport
                      setStage(CommonStage.ImportWalletStage)
                    }
              }
              onAppOpen={
                ledgerChains.length
                  ? async (transport) => {
                      ledgerTransport = transport
                      if (ledgerAddresses.length === ledgerChains.length) {
                        onCreateWallet(walletName, ledgerChains, ledgerAddresses)
                      } else {
                        const address = await getWalletAddress({
                          prefix: ledgerChains[ledgerAddresses.length].prefix,
                          ledgerTransport,
                          ledgerAppName: ledgerChains[ledgerAddresses.length].ledgerAppName,
                          hdPath: {
                            coinType: ledgerChains[ledgerAddresses.length].coinType,
                          },
                        })
                        setLedgerAddresses((a) => [...a, address])
                      }
                    }
                  : undefined
              }
              ledgerApp={
                ledgerChains.length
                  ? ledgerChains[Math.min(ledgerAddresses.length, ledgerChains.length - 1)]
                      .ledgerAppName
                  : undefined
              }
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
          title: 'Recovery Phrase Backup',
          content: (
            <SecretRecoveryPhraseStage
              onSubmit={(m) => {
                setMnemonic(m)
                setPrivateKey('')
                setStage(CommonStage.SetSecurityPasswordStage)
              }}
            />
          ),
        }
    }
  }, [stage, onCreateWallet, mnemonic, setStage, ledgerAddresses, ledgerChains, walletName])

  return (
    <Dialog
      title={content.title}
      open={open}
      onClose={() => {
        onClose()
        setStage(CommonStage.StartStage)
      }}
      toPrevStage={
        isPrevStageAvailable
          ? () => {
              toPrevStage()
              ledgerTransport = null
              closeAllLedgerConnections()
            }
          : null
      }
    >
      <>{content.content}</>
    </Dialog>
  )
}

export default CreateWalletDialog

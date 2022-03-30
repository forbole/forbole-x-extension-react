import React, { useCallback, useState } from 'react'
import Dialog from '../../Element/dialog'
import useStateHistory from '../../../misc/useStateHistory'
import { useCreateWallet } from '../../../recoil/wallets'
import getWalletAddress from '../../../misc/getWalletAddress'
import { DirectSecp256k1HdWallet } from '@cosmjs/proto-signing'
import ImportLedgerStage, { closeAllLedgerConnections } from './ImportLedgerStage'
import EnterSecurityPasswordStage from './EnterSecurityPasswordStage'

let ledgerTransport

interface Props {
  open: boolean
  onClose: () => void
  wallet: Wallet
}

export enum Stage {
  EnterSecurityPasswordStage = 'enter security password',
  ConnectLedgerStage = 'connect ledger',
  SelectAccount = 'select account',
  SelectHDPath = 'select hd path',
}

interface Content {
  title: string
  content: React.ReactNode
}

const CreateAccountDialog = ({ open, onClose, wallet }: Props) => {
  const [stage, setStage, toPrevStage, isPrevStageAvailable] = useStateHistory<Stage>(
    wallet.type === 'ledger' ? Stage.ConnectLedgerStage : Stage.EnterSecurityPasswordStage
  )

  const [securityPassword, setSecurityPassword] = useState('')
  const createWallet = useCreateWallet()

  const onCreateAccount = useCallback(
    async (name: string, chains: Chain[], ledgerAddresses?: string[]) => {
      // const address = getWalletAddress({
      //         prefix: c.prefix,
      //         mnemonic,
      //         privateKey,
      //         ledgerTransport,
      //         ledgerAppName: '',
      //         hdPath: {
      //           coinType: c.coinType,
      //         },
      //       })
      closeAllLedgerConnections()
      onClose()
      // await createWallet({
      //   type: ledgerTransport ? 'ledger' : privateKey ? 'private key' : 'mnemonic',
      //   name,
      //   mnemonic,
      //   privateKey,
      //   securityPassword,
      //   accounts: chains.map((c, i) => ({
      //     chain: c.chainId,
      //     address: addresses[i],
      //   })),
      // })
    },
    [securityPassword, onClose]
  )

  const content: Content = React.useMemo(() => {
    switch (stage) {
      case Stage.EnterSecurityPasswordStage:
        return {
          title: 'Getting Started',
          content: (
            <EnterSecurityPasswordStage
            // onImportWalet={() => {
            //   setMnemonic('')
            //   setPrivateKey('')
            //   setStage(ImportStage.SelectStage)
            // }}
            // onCreateWallet={async () => {
            //   const newWallet = await DirectSecp256k1HdWallet.generate(24)
            //   setMnemonic(newWallet.mnemonic)
            //   setPrivateKey('')
            //   setStage(CommonStage.CreateWalletStage)
            // }}
            />
          ),
        }
      case Stage.ConnectLedgerStage:
        return {
          title: 'Create Wallet',
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
      case Stage.SelectAccount:
        return {
          title: 'Confirm Recovery Phrase',
          content: (
            <ConfirmMnemonicStage
              mnemonic={mnemonic}
              onSubmit={() => setStage(CommonStage.SetSecurityPasswordStage)}
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
        setStage(
          wallet.type === 'ledger' ? Stage.ConnectLedgerStage : Stage.EnterSecurityPasswordStage
        )
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

export default CreateAccountDialog

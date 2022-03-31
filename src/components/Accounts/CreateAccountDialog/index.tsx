import React, { useCallback, useState } from 'react'
import Dialog from '../../Element/dialog'
import useStateHistory from '../../../misc/useStateHistory'
import { useCreateWallet } from '../../../recoil/wallets'
import getWalletAddress from '../../../misc/getWalletAddress'
import { DirectSecp256k1HdWallet } from '@cosmjs/proto-signing'
import ImportLedgerStage, { closeAllLedgerConnections } from './ImportLedgerStage'
import EnterSecurityPasswordStage from './EnterSecurityPasswordStage'
import SelectNetworkStage from './SelectNetworkStage'
import SelectAccountStage from './SelectAccountStage'

let ledgerTransport

interface Props {
  open: boolean
  onClose: () => void
  wallet: Wallet
}

export enum Stage {
  SelectNetworkStage = 'select network',
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
  const [stage, setStage, toPrevStage, isPrevStageAvailable] = useStateHistory(
    Stage.SelectNetworkStage
  )

  const [securityPassword, setSecurityPassword] = useState('')
  const [chain, setChain] = useState<Chain>()

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
      case Stage.SelectNetworkStage:
        return {
          title: 'Add Account',
          content: (
            <SelectNetworkStage
              onSubmit={(c) => {
                setChain(c)
                setStage(
                  wallet.type === 'ledger'
                    ? Stage.ConnectLedgerStage
                    : Stage.EnterSecurityPasswordStage
                )
              }}
            />
          ),
        }
      case Stage.EnterSecurityPasswordStage:
        return {
          title: 'Wallet Password',
          content: (
            <EnterSecurityPasswordStage
              onSubmit={(p) => {
                setSecurityPassword(p)
                setStage(Stage.SelectAccount)
              }}
              wallet={wallet}
            />
          ),
        }
      case Stage.ConnectLedgerStage:
        return {
          title: 'Connect Ledger',
          content: (
            <ImportLedgerStage
              onAppOpen={async (transport) => {
                ledgerTransport = transport
                setStage(Stage.SelectAccount)
              }}
              ledgerApp={chain?.ledgerAppName}
            />
          ),
        }
      case Stage.SelectAccount:
        return {
          title: 'Add Account',
          content: (
            <SelectAccountStage
              wallet={wallet}
              chain={chain}
              securityPassword={securityPassword}
              ledgerTransport={ledgerTransport}
              onSubmit={() => {}}
              onAdvanceClick={() => setStage(Stage.SelectHDPath)}
            />
          ),
        }
    }
  }, [stage, setStage, chain, wallet, securityPassword])

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

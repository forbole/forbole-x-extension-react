import React, { useCallback, useEffect, useState } from 'react'
import Dialog from '../../Element/dialog'
import useStateHistory from '../../../misc/useStateHistory'
import ImportLedgerStage, { closeAllLedgerConnections } from './ImportLedgerStage'
import EnterSecurityPasswordStage from './EnterSecurityPasswordStage'
import SelectNetworkStage from './SelectNetworkStage'
import SelectAccountStage from './SelectAccountStage'
import { useCreateAccounts } from '../../../recoil/accounts'

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

  useEffect(() => {
    if (!open) {
      setStage(Stage.SelectNetworkStage, true)
      setSecurityPassword('')
      setChain(undefined)
    }
  }, [open])

  const createAccounts = useCreateAccounts()

  const onCreateAccount = useCallback(
    async (accounts: { address: string; hdPath: HdPath }[]) => {
      closeAllLedgerConnections()
      onClose()
      await createAccounts(
        accounts.map((a) => ({
          walletId: wallet.id,
          address: a.address,
          chain: chain.chainId,
          hdPath: a.hdPath,
        }))
      )
    },
    [onClose, createAccounts, chain, wallet]
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
              onAppOpen={(transport) => {
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
              onSubmit={onCreateAccount}
              onAdvanceClick={() => setStage(Stage.SelectHDPath)}
            />
          ),
        }
    }
  }, [stage, setStage, chain, wallet, securityPassword, onCreateAccount])

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

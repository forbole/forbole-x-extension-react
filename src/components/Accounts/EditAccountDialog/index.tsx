import React, { useEffect } from 'react'
import Dialog from '../../Element/dialog'
import useStateHistory from '../../../misc/useStateHistory'
import SelectActionStage from './SelectActionStage'
import ChangeMonikerStage from './ChangeMonikerStage'
import RemoveAccountStage from './RemoveAccountStage'
import ShareAddressStage from './ShareAddressStage'
import { useChangeAccountName, useDeleteAccount } from '../../../recoil/accounts'

interface Props {
  open: boolean
  onClose: () => void
  account: Account
}

export enum Stage {
  SelectActionStage = 'select action',
  ChangeMonikerStage = 'change moniker',
  ShareAddressStage = 'share address',
  RemoveAccountStage = 'remove account',
}

interface Content {
  title: string
  content: React.ReactNode
}

const EditAccountDialog = ({ open, onClose, account }: Props) => {
  const changeAccountName = useChangeAccountName()
  const deleteAccount = useDeleteAccount()

  const [stage, setStage, toPrevStage, isPrevStageAvailable] = useStateHistory(
    Stage.SelectActionStage
  )

  useEffect(() => {
    if (!open) {
      setStage(Stage.SelectActionStage, true)
    }
  }, [open])

  const content: Content = React.useMemo(() => {
    switch (stage) {
      case Stage.SelectActionStage:
        return {
          title: 'Edit Account',
          content: (
            <SelectActionStage
              onChangeMoniker={() => setStage(Stage.ChangeMonikerStage)}
              onShareAddress={() => setStage(Stage.ShareAddressStage)}
              onRemove={() => setStage(Stage.RemoveAccountStage)}
            />
          ),
        }
      case Stage.ChangeMonikerStage:
        return {
          title: 'Change Account Moniker',
          content: (
            <ChangeMonikerStage
              onSubmit={(name: string) => {
                changeAccountName({ walletId: account.walletId, address: account.address, name })
                onClose()
              }}
              account={account}
            />
          ),
        }
      case Stage.ShareAddressStage:
        return {
          title: 'Address',
          content: <ShareAddressStage address={account.address} />,
        }
      case Stage.RemoveAccountStage:
        return {
          title: ' ',
          content: (
            <RemoveAccountStage
              onCancel={() => setStage(Stage.SelectActionStage)}
              onDelete={() => {
                deleteAccount({ walletId: account.walletId, address: account.address })
                onClose()
              }}
            />
          ),
        }
    }
  }, [stage, account, changeAccountName, deleteAccount, onClose, setStage])

  return (
    <Dialog
      title={content.title}
      open={open}
      onClose={onClose}
      toPrevStage={isPrevStageAvailable ? toPrevStage : null}
    >
      <>{content.content}</>
    </Dialog>
  )
}

export default EditAccountDialog

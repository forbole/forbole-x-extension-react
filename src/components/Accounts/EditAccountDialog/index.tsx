import React, { useEffect } from 'react'
import Dialog from '../../Element/dialog'
import useStateHistory from '../../../misc/useStateHistory'
import SelectActionStage from './SelectActionStage'
import ChangeMonikerStage from './ChangeMonikerStage'
import RemoveAccountStage from './RemoveAccountStage'
import { useChangeAccountName } from '../../../recoil/accounts'

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
      case Stage.RemoveAccountStage:
        return {
          title: ' ',
          content: <RemoveAccountStage onCancel={() => {}} onDelete={() => {}} />,
        }
    }
  }, [stage, account])

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

import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { ReactComponent as RemoveIcon } from '../../../assets/images/icons/icon_clear.svg'
import useIconProps from '../../../misc/useIconProps'
import Dialog from '../../Element/dialog'
import Button from '../../Element/button'
import useStateHistory from '../../../misc/useStateHistory'
import { formatCoins } from '../../../misc/utils'

interface Props {
  open: boolean
  onClose: () => void
  account: Account
}

export enum Stage {
  SelectAmountStage = 'select amount',
  ShareAddressStage = 'share address',
  RemoveAccountStage = 'remove account',
}

interface Content {
  title: string
  content: React.ReactNode
}

interface DelegationDialogProps {
  account: AccountDetail
  open: boolean
  onClose: (open: boolean) => void
}

const DelegationDialog: React.FC<DelegationDialogProps> = ({ open, onClose, account }) => {
  const [stage, setStage, toPrevStage, isPrevStageAvailable] = useStateHistory(
    Stage.SelectAmountStage
  )
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm()
  const iconProps = useIconProps()
  const { balances } = account
  const [recipients, setRecipients] = React.useState<
    Array<{ amount: string; denom: string; address: string }>
  >([{ amount: '', denom: 'DSM', address: '' }])
  const [memo, setMemo] = React.useState('')

  useEffect(() => {
    if (!open) {
      setStage(Stage.SelectAmountStage, true)
    }
  }, [open])

  const content: Content = React.useMemo(() => {
    switch (stage) {
      case Stage.SelectAmountStage:
        return {
          title: 'Delegate',
          content: (
            // <SelectAmountStage
            //   onChangeMoniker={() => setStage(Stage.ChangeMonikerStage)}
            //   onShareAddress={() => setStage(Stage.ShareAddressStage)}
            //   onRemove={() => setStage(Stage.RemoveAccountStage)}
            // />
            <></>
          ),
        }
    }
  }, [stage, account, onClose, setStage, toPrevStage])

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

export default DelegationDialog

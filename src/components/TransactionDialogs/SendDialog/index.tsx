import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import Dialog from '../../Element/dialog'
import Button from '../../Element/button'
import useStateHistory from '../../../misc/useStateHistory'

interface Props {
  open: boolean
  onClose: () => void
  account: Account
}

export enum Stage {
  SendStage = 'Send',
  ConfirmTxStage = 'Send',
  ShareAddressStage = 'share address',
  RemoveAccountStage = 'remove account',
}

interface Content {
  title: string
  content: React.ReactNode
}

interface SendDialogProps {
  account: Account
  availableTokens: AvailableTokens
  open: boolean
  onClose: (open: boolean) => void
}

const SendDialog: React.FC<SendDialogProps> = ({ open, onClose, account, availableTokens }) => {
  const [stage, setStage, toPrevStage, isPrevStageAvailable] = useStateHistory(Stage.SendStage)
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm()

  return (
    <Dialog
      open={open}
      onClose={() => {
        onClose(false)
      }}
      title={stage}
    >
      <div className="px-5 flex flex-row items-start">
        <p>Available amount</p>
        <p className="font-bold pl-2">{`${availableTokens.coins[0].amount}`}</p>
        <p className="font-bold pl-1">{`${availableTokens.coins[0].denom}`}</p>
      </div>
    </Dialog>
  )
}

export default SendDialog

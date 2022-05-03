import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import SelectAmount from './SelectAmount'
import { ReactComponent as RemoveIcon } from '../../../assets/images/icons/icon_clear.svg'
import useIconProps from '../../../misc/useIconProps'
import Dialog from '../../Element/dialog'
import Button from '../../Element/button'
import useStateHistory from '../../../misc/useStateHistory'
import { formatCoins } from '../../../misc/utils'
import { Loadable } from 'recoil'

interface Props {
  open: boolean
  onClose: () => void
  account: Account
}

export enum DelegationStage {
  SelectAmountStage = 'select amount',
  SelectValidatorsStage = 'select validators',
}

interface Content {
  title: string
  content: React.ReactNode
}

interface DelegationDialogProps {
  account: AccountDetail
  open: boolean
  onClose: (open: boolean) => void
  validators: Loadable<Validator[]>
  defaultValidator?: Validator
}

const DelegationDialog: React.FC<DelegationDialogProps> = ({
  open,
  onClose,
  account,
  validators,
  defaultValidator,
}) => {
  const [amount, setAmount] = React.useState(0)
  const [denom, setDenom] = React.useState('')
  const [delegations, setDelegations] = React.useState<
    Array<{ amount: number; validator: Validator }>
  >([])
  const [stage, setStage, toPrevStage, isPrevStageAvailable] = useStateHistory(
    DelegationStage.SelectAmountStage
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
  console.log('amount', amount)

  useEffect(() => {
    if (!open) {
      setStage(DelegationStage.SelectAmountStage, true)
    }
  }, [open])

  const confirmAmount = React.useCallback(
    (a: number, d: string) => {
      setAmount(a)
      setDenom(d)
      setDelegations([{ amount: a, validator: (defaultValidator || {}) as Validator }])
      setStage(DelegationStage.SelectValidatorsStage)
    },
    [setAmount, setStage, defaultValidator]
  )

  const content: Content = React.useMemo(() => {
    switch (stage) {
      case DelegationStage.SelectAmountStage:
        return {
          title: 'Delegate',
          content: <SelectAmount account={account} onConfirm={confirmAmount} />,
        }
      case DelegationStage.SelectValidatorsStage:
        return {
          title: 'Delegate',
          content: (
            //   <SelectValidators
            //   crypto={crypto}
            //   delegations={delegations}
            //   validators={validators}
            //   amount={amount}
            //   price={availableAmount[denom]?.price}
            //   denom={denom}
            //   onConfirm={confirmDelegations}
            //   loading={loading}
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
      onClose={() => {
        onClose(false)
      }}
      toPrevStage={isPrevStageAvailable ? toPrevStage : null}
    >
      <>{content.content}</>
    </Dialog>
  )
}

export default DelegationDialog

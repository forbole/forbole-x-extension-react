import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { ReactComponent as RemoveIcon } from '../../../assets/images/icons/icon_clear.svg'
import useIconProps from '../../../misc/useIconProps'
import Dialog from '../../Element/dialog'

interface SelectAmountProps {
  onConfirm(amount: number, denom: string): void
  account: AccountDetail
}

const SelectAmount: React.FC<SelectAmountProps> = ({ onConfirm, account }) => {
  const iconProps = useIconProps()
  const { balances } = account
  return <></>
}

export default SelectAmount

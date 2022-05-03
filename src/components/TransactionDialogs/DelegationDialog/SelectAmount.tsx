import React from 'react'
import { useForm } from 'react-hook-form'
import { ReactComponent as RemoveIcon } from '../../../assets/images/icons/icon_clear.svg'
import useIconProps from '../../../misc/useIconProps'
import Button from '../../Element/button'
import { formatCoins, sumCoinsValues } from '../../../misc/utils'
import { de } from 'date-fns/locale'

interface SelectAmountProps {
  onConfirm(amount: number, denom: string): void
  account: AccountDetail
}

const SelectAmount: React.FC<SelectAmountProps> = ({ onConfirm, account }) => {
  const iconProps = useIconProps()
  const { balances, prices } = account
  const [amount, setAmount] = React.useState('')
  const [denom, setDenom] = React.useState(prices[0].token.symbol)
  return (
    <form
      noValidate
      onSubmit={(e) => {
        e.preventDefault()
        onConfirm(Number(amount), denom)
      }}
    >
      <div className="px-5 flex flex-row items-start">
        <p>Available amount</p>
        <p className="font-bold pl-2">{formatCoins(account.chain, balances.available)}</p>
      </div>
      <div className="px-5 flex flex-col items-start">
        <p>Target Delegation Amount</p>
        <input
          className="bg-gray-200 p-1 rounded w-full mt-2"
          value={amount}
          placeholder={prices[0].token.symbol}
          onChange={(e) => {
            setAmount(e.target.value)
          }}
        />
      </div>
      <div className="w-full pt-20 px-5">
        <Button disabled={amount.length <= 0} text="Next" type="submit" />
      </div>
    </form>
  )
}

export default SelectAmount

import React from 'react'
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
  SendStage = 'Send',
  ShareAddressStage = 'share address',
  RemoveAccountStage = 'remove account',
}

interface Content {
  title: string
  content: React.ReactNode
}

interface SendDialogProps {
  account: AccountDetail
  open: boolean
  onClose: (open: boolean) => void
}

const SendDialog: React.FC<SendDialogProps> = ({ open, onClose, account }) => {
  const [stage, setStage, toPrevStage, isPrevStageAvailable] = useStateHistory(Stage.SendStage)
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

  return (
    <Dialog
      open={open}
      onClose={() => {
        onClose(false)
      }}
      title={stage}
    >
      <div className="flex flex-col">
        <div className="px-5 flex flex-row items-start">
          <p>Available amount</p>
          {balances.available.map((x, y) => {
            // const { amount, denom } = x
            return (
              <>
                <p className="font-bold pl-2">{formatCoins(account.chain, balances.available)}</p>
              </>
            )
          })}
        </div>
        <div className="px-5 pt-5 flex flex-row items-center">
          <div className="w-1/2">
            <p>Recipient address</p>
          </div>
          <div className="w-1/2 pl-2">
            <p>Amount</p>
          </div>
        </div>
        {recipients.map((v, i) => (
          <div className="px-5 pb-5 flex flex-row items-center">
            {recipients.length <= 1 ? null : (
              <button onClick={() => setRecipients((d) => d.filter((a, j) => j !== i))}>
                <RemoveIcon className={`${iconProps} mr-2 flex items-center`} key={i} />
              </button>
            )}
            <div className="flex flex-row items-center justify-between w-full">
              <input
                className="form-input bg-gray-200 p-1 rounded w-1/2"
                value={v.address}
                onChange={(e) =>
                  setRecipients((rs) =>
                    rs.map((r, j) => (i === j ? { ...r, address: e.target.value } : r))
                  )
                }
              />
              <input
                className="form-input bg-gray-200 p-1 rounded w-1/2 ml-2"
                value={v.amount}
                placeholder={v.denom}
                onChange={(e) =>
                  setRecipients((rs) =>
                    rs.map((r, j) => (i === j ? { ...r, amount: e.target.value } : r))
                  )
                }
              />
            </div>
          </div>
        ))}{' '}
        <button
          onClick={() => {
            setRecipients((d) => [...d, { address: '', amount: '', denom: 'DSM' }])
          }}
          className="px-5 text-primary-100 hover:opacity-80 text-left"
        >
          Add address
        </button>
        <div className="ml-5 mt-5">
          <div className="w-1/2">
            <p>Memo</p>
          </div>
          <input
            className="form-input bg-gray-200 p-2 rounded w-1/2 h-[10rem]"
            value={memo}
            onChange={(e) => setMemo(e.target.value)}
            placeholder="Memo"
          ></input>
        </div>
      </div>
      <div className="w-full pt-20 px-5">
        <Button
          disabled={recipients.length <= 0}
          text="Next"
          type="submit"
          onClick={() => {
            // onSubmit(recipients)
          }}
        />
      </div>
    </Dialog>
  )
}

export default SendDialog

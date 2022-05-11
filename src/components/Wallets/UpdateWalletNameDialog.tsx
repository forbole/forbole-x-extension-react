import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useUpdateWallet } from '../../recoil/wallets'
import Button from '../Element/button'
import Dialog from '../Element/dialog'

interface Props {
  wallet: Wallet
  onClose(): void
  open: boolean
}

const UpdateWalletNameDialog = ({ wallet, open, onClose }: Props) => {
  const updateWallet = useUpdateWallet()
  const { register, handleSubmit, watch, reset } = useForm<{ name: string }>()

  const onFormSubmit = async (data) => {
    updateWallet(wallet.id, { name: data.name })
    onClose()
    reset()
  }

  useEffect(() => {
    reset()
  }, [open, reset])

  return (
    <Dialog title="Change Wallet Moniker" open={open} onClose={onClose}>
      <form onSubmit={handleSubmit(onFormSubmit)}>
        <div className="flex flex-col mt-5 px-4">
          <p className="max-w-sm mb-2">Wallet moniker</p>
          <input
            key="name"
            {...register('name', { required: true })}
            className="form-input shadow-sm focus:ring-primary-100 focus:border-primary-100 block w-full text-sm border-gray-300 rounded-sm px-3 py-2 bg-popup-100"
          />
        </div>
        <div className="absolute bottom-4 left-4 right-4">
          <Button disabled={!watch('name')} text="Save" type="submit" />
        </div>
      </form>
    </Dialog>
  )
}

export default UpdateWalletNameDialog

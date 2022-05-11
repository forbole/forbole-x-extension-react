import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useUpdateWallet } from '../../recoil/wallets'
import Button from '../Element/button'
import Dialog from '../Element/dialog'

interface Props {
  wallet: Wallet
  onClose(): void
  open: boolean
}

const UpdateWalletPasswordDialog = ({ wallet, open, onClose }: Props) => {
  const updateWallet = useUpdateWallet()
  const [error, setError] = useState('')
  const { register, handleSubmit, watch, reset } = useForm<{ password: string }>()

  const [stage, setStage] = useState<'old' | 'new' | 'confirm'>('old')
  const [oldPassword, setOldPassword] = useState('')
  const [password, setPassword] = useState('')

  const onFormSubmit = async (data) => {
    setError('')
    try {
      if (stage === 'old') {
        updateWallet(wallet.id, { oldPassword: data.password })
        reset()
        setOldPassword(data.password)
        setStage('new')
      } else if (stage === 'new') {
        reset()
        setPassword(data.password)
        setStage('confirm')
      } else {
        if (password !== data.password) {
          throw new Error('Password does not match')
        }
        updateWallet(wallet.id, { oldPassword, password })
        reset()
        setStage('old')
        onClose()
      }
    } catch (err) {
      setError(err.message)
      reset()
    }
  }

  useEffect(() => {
    setError('')
    setPassword('')
    setOldPassword('')
    setStage('old')
    reset()
  }, [open, reset])

  return (
    <Dialog title="Wallet Security Password" open={open} onClose={onClose}>
      <form onSubmit={handleSubmit(onFormSubmit)}>
        <div className="flex flex-col mt-5 px-4">
          <p className="max-w-sm mb-2">
            {stage === 'old'
              ? 'Enter current wallet security password'
              : stage === 'new'
              ? 'Enter new wallet security password'
              : 'Confirm new wallet security password'}
          </p>
          <input
            key="password"
            type="password"
            {...register('password', { required: true })}
            className="form-input shadow-sm focus:ring-primary-100 focus:border-primary-100 block w-full text-sm border-gray-300 rounded-sm px-3 py-2 bg-popup-100"
          />
          {!!error && <p className="text-sm mt-2 text-red-500 nightwind-prevent">{error}</p>}
        </div>
        <div className="absolute bottom-4 left-4 right-4">
          <Button disabled={!watch('password')} text="Save" type="submit" />
        </div>
      </form>
    </Dialog>
  )
}

export default UpdateWalletPasswordDialog

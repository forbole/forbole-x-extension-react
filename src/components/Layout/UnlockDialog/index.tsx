import React from 'react'
import Button from '../../Element/button'
import Dialog from '../../Element/dialog'
import { useForm } from 'react-hook-form'
import { useUnlockWallets } from '../../../recoil/general'

interface Props {
  open: boolean
}

type Inputs = {
  password: string
}

const UnlockDialog = ({ open }: Props) => {
  const [error, setError] = React.useState('')
  const unlockWallets = useUnlockWallets()

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<Inputs>()

  const onFormSubmit = async (data) => {
    try {
      setError('')
      await unlockWallets(watch('password'))
      reset({ password: '' })
    } catch (err) {
      setError('Incorrect Password')
    }
  }

  return (
    <Dialog open={open} title="Unlock Password">
      <form onSubmit={handleSubmit(onFormSubmit)}>
        <div className="flex flex-col items-center mt-5">
          <p className="max-w-sm text-center">Enter password to unlock your application</p>
          <div className="w-full flex justify-center">
            <div className="w-full px-10 py-7">
              <input
                key="password"
                type="password"
                {...register('password', { required: true })}
                className="form-input shadow-sm focus:ring-primary-100 focus:border-primary-100 block w-full text-sm border-gray-300 rounded-sm px-3 py-2 bg-popup-100"
              />
              {!!error && <p className="text-sm mt-2 text-red-500 nightwind-prevent">{error}</p>}
              <p className="text-sm mt-2">* Require after 15 minutes</p>
              <div className="mt-24">
                <Button text="Next" type="submit" />
              </div>
            </div>
          </div>
        </div>
      </form>
    </Dialog>
  )
}

export default UnlockDialog

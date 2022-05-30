import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDecryptWallet } from '../../../recoil/wallets'
import Button from '../../Element/button'

type Props = {
  onSubmit: (password: string) => void
  wallet: Wallet
}

type Input = {
  password: string
}

const EnterSecurityPasswordStage = ({ onSubmit, wallet }: Props) => {
  const { register, handleSubmit, watch } = useForm<Input>()
  const [error, setError] = useState('')
  const decryptWallet = useDecryptWallet()

  const onFormSubmit = (data) => {
    try {
      decryptWallet(wallet.id, data.password)
      onSubmit(data.password)
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <form onSubmit={handleSubmit(onFormSubmit)}>
      <div className="flex flex-col mt-5 px-4">
        <p className="max-w-sm mb-2">Enter wallet security password</p>
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
  )
}

export default EnterSecurityPasswordStage

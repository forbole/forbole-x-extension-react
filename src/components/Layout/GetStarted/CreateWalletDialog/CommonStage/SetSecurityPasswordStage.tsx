import React from 'react'
import PasswordStrengthDisplay from '../../../../CreateWallet/PasswordStrengthDisplay'
import { passwordStrength } from 'check-password-strength'
import { useForm } from 'react-hook-form'
import Button from '../../../../Element/button'

type Props = {
  onSubmit: (password: string) => void
}

type Input = {
  password: string
}

const SetSecurityPasswordStage = ({ onSubmit }: Props) => {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<Input>()

  const passwordSecurityLevel = React.useMemo(() => {
    return watch('password') ? passwordStrength(watch('password')).id : 0
  }, [watch('password')])

  const onFormSubmit = (data) => {
    onSubmit(watch('password'))
  }

  return (
    <form onSubmit={handleSubmit(onFormSubmit)}>
      <div className="p-5 space-y-6 flex flex-col items-center">
        <p className="text-sm text-gray-700 text-center mb-8">
          Create a password to access your wallet
        </p>
        <input
          key="password"
          type="password"
          placeholder="Password"
          {...register('password', { required: true })}
          className="shadow-sm focus:ring-primary-100 focus:border-primary-100 block w-full text-sm border-gray-300 rounded-sm px-3 py-2 bg-popup-100"
        />
        <PasswordStrengthDisplay passwordSecurityLevel={passwordSecurityLevel} />

        <p className="w-full text-sm">* at least 6 characters in length</p>

        <div className="w-full pt-20">
          <Button
            text="Next"
            disabled={watch('password') ? watch('password').length < 6 : true}
            type="submit"
          />
        </div>
      </div>
    </form>
  )
}

export default SetSecurityPasswordStage

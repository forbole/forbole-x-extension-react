import CryptoJS from 'crypto-js'
import { Controller, useForm } from 'react-hook-form'
import get from 'lodash/get'
import Button from '../../../../Element/button'
import { Input } from '../../../../Element/input'
import Textarea from '../../../../Element/textarea'
import { DirectSecp256k1HdWallet } from '@cosmjs/proto-signing'

interface Props {
  onSubmit: (mnemonic: string) => void
}

const SecretRecoveryPhraseStage = ({ onSubmit }: Props) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm()

  const submitForm = async (data) => {
    try {
      const mnemonic = CryptoJS.AES.decrypt(data.backupPhrase, data.password).toString(
        CryptoJS.enc.Utf8
      )
      await DirectSecp256k1HdWallet.fromMnemonic(mnemonic)
      onSubmit(mnemonic)
    } catch (err) {
      setError('password', { message: 'Invalid recovery phrase backup or password' })
    }
  }

  return (
    <div className="p-4 space-y-5 mt-4">
      <form onSubmit={handleSubmit(submitForm)}>
        <p className="mb-1">Recovery phrase backup</p>
        <Controller
          name="backupPhrase"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <Textarea className="h-32" placeholder="Recovery phrase backup" {...field} />
          )}
        />
        <p className="mt-4 mb-1">Encryption Password</p>
        <Controller
          name="password"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <Input type="password" placeholder="Encryption Password" {...field} />
          )}
        />
        {errors.password && (
          <p className="mt-4 text-red-500">Invalid recovery phrase backup or password</p>
        )}
        <div className="w-full pt-28">
          <Button text="Next" type="submit" />
        </div>
      </form>
    </div>
  )
}

export default SecretRecoveryPhraseStage

import { DirectSecp256k1HdWallet } from '@cosmjs/proto-signing'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useUpdateWallet, useDecryptWallet } from '../../recoil/wallets'
import Button from '../Element/button'
import Dialog from '../Element/dialog'
import CryptoJS from 'crypto-js'
import MnemonicPhraseInput from '../CreateWallet/MnemonicPhraseInput'
import Textarea from '../Element/textarea'
import toast from 'react-hot-toast'

interface Props {
  wallet: Wallet
  onClose(): void
  open: boolean
}

const UpdateWalletPasswordDialog = ({ wallet, open, onClose }: Props) => {
  const [error, setError] = useState('')
  const { register, handleSubmit, watch, reset } = useForm<{ password: string }>()

  const [stage, setStage] = useState<'password' | 'mnemonic' | 'encryption' | 'export'>('password')

  const [mnemonic, setMnemonic] = useState<string>('')
  const [mnemonicPhraseBackup, setMnemonicPhraseBackup] = useState<string>('')

  const decrypted = useDecryptWallet()

  const onFormSubmit = async (data) => {
    switch (stage) {
      case 'password':
        try {
          const decryptedMnemonic = decrypted(wallet?.id, data.password)
          setMnemonic(decryptedMnemonic.mnemonic)
          setStage('mnemonic')
          setError('')
        } catch (err) {
          console.log(err)
          setError(err.message)
        }
        break

      case 'mnemonic':
        setStage('encryption')
        break
      case 'encryption':
        const encryptedPhraseBackup = CryptoJS.AES.encrypt(
          mnemonic,
          data.encryptedPassword
        ).toString()
        setMnemonicPhraseBackup(encryptedPhraseBackup)
        setStage('export')
        break

      default:
        break
    }
  }

  useEffect(() => {
    setError('')
    setStage('password')
    reset()
  }, [open, reset])

  return (
    <Dialog
      title={
        stage === 'password'
          ? 'Wallet Security Password'
          : stage === 'mnemonic'
          ? 'Mnemonic phrase'
          : 'Export mnemonic'
      }
      description={
        stage === 'mnemonic' ? (
          <p>
            Please write down and safe your mnemonic phrase <br /> It’s the ONLY WAY to restore your
            account
          </p>
        ) : stage === 'encryption' ? (
          'In oder to export your mnemonic properly, we need a password with it will be encrypted for security reasons. Please insert below passwords that you will also be required later when importing it.'
        ) : stage === 'export' ? (
          'You can export this data whenever you want, even sending it to a friend of yours for backup, if you have used a strong enough password.'
        ) : (
          ''
        )
      }
      open={open}
      onClose={onClose}
    >
      <form onSubmit={handleSubmit(onFormSubmit)}>
        <div className="flex flex-col mt-5 px-4">
          <p className="max-w-sm mb-2">
            {stage === 'password'
              ? 'Enter current wallet security password'
              : stage === 'mnemonic'
              ? ''
              : stage === 'encryption'
              ? 'Set encryption password'
              : 'Mnemonic phrase backup'}
          </p>
          {stage === 'password' && (
            <input
              key="password"
              type="password"
              {...register('password', { required: true })}
              className="form-input shadow-sm focus:ring-primary-100 focus:border-primary-100 block w-full text-sm border-gray-300 rounded-sm px-3 py-2 bg-popup-100"
            />
          )}
          {stage === 'mnemonic' && <MnemonicPhraseInput disabled={true} mnemonic={mnemonic} />}
          {stage === 'encryption' && (
            <input
              key="encryptedPassword"
              type="password"
              {...register('encryptedPassword', { required: true })}
              className="form-input shadow-sm focus:ring-primary-100 focus:border-primary-100 block w-full text-sm border-gray-300 rounded-sm px-3 py-2 bg-popup-100"
            />
          )}
          {stage === 'export' && (
            <Textarea rows={6} value={mnemonicPhraseBackup} disabled={true} className="text-base" />
          )}

          {!!error && <p className="text-sm mt-2 text-red-500 nightwind-prevent">{error}</p>}
        </div>
        <div className="absolute bottom-4 left-4 right-4">
          {stage === 'export' ? (
            <div className="space-y-5">
              <Button
                text="Copy"
                secondary
                onClick={() => {
                  navigator.clipboard.writeText(mnemonicPhraseBackup)
                  toast.success('Copied to Clipboard!', { position: 'top-center' })
                }}
              />
              <Button text={'Share'} type="submit" />
            </div>
          ) : (
            <Button disabled={!watch('password')} text={'Next'} type="submit" />
          )}
        </div>
      </form>
    </Dialog>
  )
}

export default UpdateWalletPasswordDialog

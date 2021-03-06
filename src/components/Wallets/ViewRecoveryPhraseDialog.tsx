import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDecryptWallet } from '../../recoil/wallets'
import Button from '../Element/button'
import Dialog from '../Element/dialog'
import CryptoJS from 'crypto-js'
import MnemonicPhraseInput from '../CreateWallet/MnemonicPhraseInput'
import Textarea from '../Element/textarea'
import { useTranslation } from 'react-i18next'
import { Alert, Snackbar } from '@mui/material'
import ShareList from './ShareList'
import useStateHistory from '../../misc/useStateHistory'

interface Props {
  wallet: Wallet
  onClose(): void
  open: boolean
}

const UpdateWalletPasswordDialog = ({ wallet, open, onClose }: Props) => {
  const { t } = useTranslation(['settings', 'common'])

  const stageDetails: Record<string, any> = {
    password: {
      title: t('general.viewRecoveryPhraseDialog.passwordStage.title'),
      description: t('general.viewRecoveryPhraseDialog.passwordStage.description'),
      heading: t('general.viewRecoveryPhraseDialog.passwordStage.heading'),
    },
    mnemonic: {
      title: t('general.viewRecoveryPhraseDialog.mnemonicStage.title'),
      description: t('general.viewRecoveryPhraseDialog.mnemonicStage.description'),
      heading: t('general.viewRecoveryPhraseDialog.mnemonicStage.heading'),
    },
    encryption: {
      title: t('general.viewRecoveryPhraseDialog.encryptionStage.title'),
      description: t('general.viewRecoveryPhraseDialog.encryptionStage.description'),
      heading: t('general.viewRecoveryPhraseDialog.encryptionStage.heading'),
    },
    export: {
      title: t('general.viewRecoveryPhraseDialog.exportStage.title'),
      description: t('general.viewRecoveryPhraseDialog.exportStage.description'),
      heading: t('general.viewRecoveryPhraseDialog.exportStage.heading'),
    },
    share: {
      title: t('general.viewRecoveryPhraseDialog.shareStage.title'),
      description: t('general.viewRecoveryPhraseDialog.shareStage.description'),
      heading: t('general.viewRecoveryPhraseDialog.shareStage.heading'),
    },
  }

  const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false)

  const [error, setError] = useState('')
  const { register, handleSubmit, watch, reset } =
    useForm<{ password: string; encryptedPassword: string }>()

  const [stage, setStage, toPrevStage, isPrevStageAvailable] = useStateHistory<
    'password' | 'mnemonic' | 'encryption' | 'export' | 'share'
  >('password')

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

      case 'export':
        setStage('share')
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
      title={stageDetails[stage].title}
      description={stageDetails[stage].description}
      open={open}
      onClose={onClose}
      toPrevStage={
        isPrevStageAvailable
          ? () => {
              reset()
              toPrevStage()
            }
          : null
      }
    >
      <form onSubmit={handleSubmit(onFormSubmit)}>
        <div className="flex flex-col mt-5 px-4">
          <p className="max-w-sm mb-2">{stageDetails[stage].heading}</p>
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
          {stage === 'share' && <ShareList mnemonicPhraseBackup={mnemonicPhraseBackup} />}

          {!!error && <p className="text-sm mt-2 text-red-500 nightwind-prevent">{error}</p>}
        </div>
        <div className="absolute bottom-4 left-4 right-4">
          {stage === 'share' ? (
            ''
          ) : stage === 'export' ? (
            <div className="space-y-5">
              <Button
                type="button"
                text="Copy"
                secondary
                onClick={() => {
                  navigator.clipboard.writeText(mnemonicPhraseBackup)
                  setSnackbarOpen(true)
                }}
              />
              <Button text={t('share')} type="submit" />
            </div>
          ) : (
            <Button disabled={!watch('password')} text={t('next')} type="submit" />
          )}
        </div>
      </form>
      <Snackbar
        open={snackbarOpen}
        onClose={() => {
          setSnackbarOpen(false)
        }}
        autoHideDuration={2500}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert
          onClose={() => {
            setSnackbarOpen(false)
          }}
          severity="success"
        >
          {t('common:snackbar.copied')}
        </Alert>
      </Snackbar>
    </Dialog>
  )
}

export default UpdateWalletPasswordDialog

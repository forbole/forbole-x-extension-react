import React from 'react'
import {
  Box,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
  Typography,
  Button,
  Dialog,
} from '@mui/material'
import { useTranslation } from 'react-i18next'
import { useUnlockWallets, useUpdatePassword } from '../../../../../../recoil/general'
import PasswordInput from '../../../../../../components/inputs/PasswordInput'

type Props = {
  /**
   * Should the dialog be shown?
   */
  isOpen: boolean

  /**
   * What to do when the dialog is closed
   */
  onClose?: () => void
}
// false positive
// eslint-disable-next-line no-shadow
enum DialogStages {
  ENTER_CURRENT_PW = 0,

  ENTER_NEW_PW = 1,

  SUCCESS = 2,
}

const ChangePasswordDialog = ({ isOpen, onClose }: Props) => {
  const { t } = useTranslation('settings')

  const [stage, setStage] = React.useState<DialogStages>(DialogStages.ENTER_CURRENT_PW)

  const [oldPassword, setOldPassword] = React.useState('')

  const [newPassword, setNewPassword] = React.useState('')

  const [error, setError] = React.useState('')

  const unlockWallet = useUnlockWallets()

  const updatePassword = useUpdatePassword()

  React.useEffect(() => {
    // reset error on stage change
    setError('')
  }, [stage])

  const resetDialog = React.useCallback(() => {
    setStage(DialogStages.ENTER_CURRENT_PW)
    setError('')
    setOldPassword('')
    setNewPassword('')
    onClose()
  }, [])

  const onSubmit = React.useCallback(async () => {
    if (stage === DialogStages.ENTER_CURRENT_PW) {
      try {
        await unlockWallet(oldPassword)
        setStage(DialogStages.ENTER_NEW_PW)
      } catch (err) {
        setError(t('general.changePwDialog.errorIncorrect'))
      }
    } else if (stage === DialogStages.ENTER_NEW_PW) {
      if (newPassword.length < 6) {
        setError(t('general.changePwDialog.error6Char'))
      } else {
        try {
          await updatePassword(oldPassword, newPassword)
          setStage(DialogStages.SUCCESS)
        } catch (err) {
          console.log(err)
        }
      }
    }
  }, [stage, oldPassword, newPassword])

  if (stage === DialogStages.SUCCESS)
    return (
      <Dialog fullWidth open={isOpen} onClose={resetDialog}>
        <DialogTitle>{t('general.changePwDialog.stage3.title')}</DialogTitle>
        <DialogContent>
          <DialogContentText>{t('general.changePwDialog.stage3.description')}</DialogContentText>
        </DialogContent>
      </Dialog>
    )

  return (
    <Dialog fullWidth open={isOpen} onClose={resetDialog}>
      <form
        noValidate
        onSubmit={(e) => {
          e.preventDefault()
          onSubmit()
        }}
      >
        <DialogTitle>{t('general.changePwDialog.stage1.title')}</DialogTitle>
        <DialogContent>
          <Box mb={18}>
            <Typography gutterBottom>
              {t(
                stage === DialogStages.ENTER_CURRENT_PW
                  ? 'general.changePwDialog.stage1.label'
                  : 'general.changePwDialog.stage2.label'
              )}
            </Typography>
            {stage === DialogStages.ENTER_CURRENT_PW ? (
              <PasswordInput
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                placeholder={t('general.changePwDialog.stage1.placeholder')}
                error={!!error}
                helperText={error}
              />
            ) : (
              <PasswordInput
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder={t('general.changePwDialog.stage2.placeholder')}
                error={!!error}
                helperText={error}
                withSecurityLevel
              />
            )}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button
            sx={(theme) => ({ margin: theme.spacing(4, 2), color: 'white' })}
            fullWidth
            variant="contained"
            color="primary"
            type="submit"
          >
            {t(stage === DialogStages.ENTER_NEW_PW ? 'save' : 'next')}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}

export default ChangePasswordDialog

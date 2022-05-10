import React from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useTheme, Box, Button, CircularProgress, Typography } from '@mui/material'
import CustomInput from '../../../../components/CustomInput'
import SuccessDialog from './components/SuccessDialog'

const FeedbackTab = () => {
  const { t } = useTranslation('settings')
  const { register, handleSubmit, reset } = useForm()
  const [loading, setLoading] = React.useState(false)
  const [showSuccessDialog, setShowSuccessDialog] = React.useState(false)
  const theme = useTheme()

  const onSubmit = React.useCallback(
    async (args: { name: string; subject: string; message: string }) => {
      try {
        setLoading(true)

        await fetch('/api/contact-us', {
          method: 'POST',
          body: JSON.stringify(args),
        })

        setLoading(false)
        setShowSuccessDialog(true)
        reset()

        setLoading(false)
      } catch (err) {
        // Todo: improve error handling
        setLoading(false)
        console.log(err)
      }
    },
    []
  )

  return (
    <Box
      sx={(_theme) => ({
        paddingLeft: _theme.spacing(2),
        paddingRight: _theme.spacing(2),
      })}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <CustomInput
          label={t('feedback.email.label')}
          placeholder={t('feedback.email.placeholder')}
          register={register}
          name="name"
          options={{ required: true }}
        />
        <CustomInput
          label={t('feedback.subject.label')}
          placeholder={t('feedback.subject.placeholder')}
          register={register}
          name="subject"
          options={{ required: true }}
        />

        <CustomInput
          label={t('feedback.message.label')}
          placeholder={t('feedback.message.placeholder')}
          register={register}
          name="message"
          multiline
        />

        <Button type="submit" variant="contained" fullWidth disabled={loading}>
          {loading ? (
            <CircularProgress size={theme.spacing(3.5)} />
          ) : (
            <Typography variant="subtitle2">{t('next')}</Typography>
          )}
        </Button>
      </form>
      <SuccessDialog isOpen={showSuccessDialog} onClose={() => setShowSuccessDialog(false)} />
    </Box>
  )
}

export default FeedbackTab

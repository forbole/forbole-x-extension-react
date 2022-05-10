import React from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { Box, Button, Typography } from '@mui/material'
import CustomInput from '../../../../components/CustomInput'

const FeedbackTab = () => {
  const { t } = useTranslation('settings')
  const { register, handleSubmit } = useForm()

  const onSubmit = React.useCallback((args: any) => {
    // to do: implementation
    console.log(args)
  }, [])

  return (
    <Box
      sx={(theme) => ({
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2),
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

        <Button type="submit" variant="contained" fullWidth>
          <Typography variant="subtitle2">{t('next')}</Typography>
        </Button>
      </form>
    </Box>
  )
}

export default FeedbackTab

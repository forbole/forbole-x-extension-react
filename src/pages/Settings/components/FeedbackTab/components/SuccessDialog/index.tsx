import React from 'react'
import { Dialog, DialogContent, DialogTitle, Typography, Box } from '@mui/material'
import { useTranslation } from 'react-i18next'

type Props = {
  /**
   * Should the dialog be shown
   */
  isOpen: boolean

  /**
   * What to do when the dialog is closed
   */
  onClose: () => void
}

const SuccessDialog = ({ isOpen, onClose }: Props) => {
  const { t } = useTranslation('settings')

  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogTitle>
        <Typography variant="h4" align="center">
          {t('feedback.successDialog.title')}
        </Typography>
      </DialogTitle>
      <DialogContent>
        <Box mb={2}>
          <Typography align="center">{t('feedback.successDialog.content')}</Typography>
        </Box>
      </DialogContent>
    </Dialog>
  )
}

export default SuccessDialog

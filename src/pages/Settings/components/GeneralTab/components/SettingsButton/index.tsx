import React from 'react'
import { Box, Button, Typography } from '@mui/material'

type Props = {
  label: string

  buttonLabel: string

  handleClick: () => void
}

const SettingsButton = ({ label, buttonLabel, handleClick }: Props) => {
  return (
    <Box
      mx={2}
      my={2}
      padding={(theme) => `0 ${theme.spacing(1)}`}
      display="flex"
      alignItems="center"
      justifyContent="space-between"
    >
      <Typography variant="subtitle1">{label}</Typography>

      <Button
        sx={(theme) => ({
          width: theme.spacing(20),
        })}
        onClick={handleClick}
        variant="contained"
      >
        <Typography variant="subtitle2">{buttonLabel}</Typography>
      </Button>
    </Box>
  )
}

export default SettingsButton

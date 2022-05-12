import React from 'react'
import { Box, Switch, Typography } from '@mui/material'

type Props = {
  label: string

  handleChange: () => void

  isChecked: boolean
}

const SettingsSwitch = ({ label, handleChange, isChecked }: Props) => {
  return (
    <Box
      padding={(theme) => theme.spacing(2)}
      display="flex"
      alignItems="center"
      justifyContent="space-between"
    >
      <Typography variant="subtitle1">{label}</Typography>

      <Switch checked={isChecked} onChange={() => handleChange()} />
    </Box>
  )
}

export default SettingsSwitch

import React from 'react'
import { Box, TextField, Typography } from '@mui/material'

type Props = {
  label: string

  defaultValue?: string

  placeholder?: string

  register: any

  options?: any

  name: string

  multiline?: boolean
}

const CustomInput = ({
  label,
  defaultValue,
  placeholder,
  register,
  name,
  options,
  multiline,
  ...rest
}: Props) => {
  return (
    <Box
      sx={(theme) => ({
        display: 'flex',
        flex: 1,
        flexDirection: 'column',
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2),
      })}
    >
      <Typography variant="subtitle1">{label}</Typography>
      <TextField
        sx={(theme) => ({
          padding: '4px',
          borderRadius: '4px',
          backgroundColor: theme.palette.background.paper,
        })}
        InputProps={{
          disableUnderline: true,
          border: 'none',
          autoComplete: false,
        }}
        fullWidth
        defaultValue={defaultValue}
        placeholder={placeholder}
        variant="standard"
        multiline={multiline}
        rows={10}
        {...register(name, options)}
        {...rest}
      />
    </Box>
  )
}

export default CustomInput

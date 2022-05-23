import React from 'react'
import { useTheme } from '@mui/material'
import { ReactComponent as Icon } from '../../assets/images/icons/arrow_right.svg'

const DropdownIcon = () => {
  const theme = useTheme()

  return (
    <Icon width="16px" height="16px" fill={theme.palette.grey[300]} style={{ marginTop: '4px' }} />
  )
}

export default DropdownIcon

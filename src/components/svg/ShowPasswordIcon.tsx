import React from 'react'
import { useTheme } from '@mui/material'
import { ReactComponent as Icon } from '../../assets/images/icons/icon_show.svg'

const ShowPasswordIcon = () => {
  const theme = useTheme()

  return <Icon width="24px" height="24px" fill={theme.palette.grey[300]} />
}

export default ShowPasswordIcon

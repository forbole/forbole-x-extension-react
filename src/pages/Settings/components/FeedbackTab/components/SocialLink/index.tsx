import React from 'react'
import { Link, Box, Typography } from '@mui/material'

type Props = {
  /**
   * The url the link will open a window to.
   */
  URL: string

  /**
   * The svg icon of the link
   */
  Icon: any

  /**
   * The name of the external site the URL redirects to
   */
  siteName: string

  /**
   * The label of the link
   */
  label: string
}

const SocialLink = ({ URL, Icon, label, siteName }: Props) => {
  return (
    <Link
      sx={(_theme) => ({
        color: _theme.palette.text.primary,
        paddingLeft: _theme.spacing(2),
        paddingRight: _theme.spacing(2),
        textDecoration: 'none',
        display: 'flex',
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
        '&:hover': {
          textDecoration: 'underline',
        },
      })}
      href={URL}
      target="_blank"
      rel="noopener noreferrer"
    >
      <Box
        sx={{
          display: 'flex',
        }}
      >
        <Icon />
        <Typography marginLeft={(_theme) => _theme.spacing(1)} variant="subtitle1">
          {siteName}
        </Typography>
      </Box>

      <Typography>{label}</Typography>
    </Link>
  )
}

export default SocialLink

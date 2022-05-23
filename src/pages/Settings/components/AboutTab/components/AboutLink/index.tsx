import React from 'react'
import { Link, Typography } from '@mui/material'
import ArrowRight from '../../../../../../components/svg/ArrowRight'

type Props = {
  URL: string

  label: string
}

const AboutLink = ({ URL, label }: Props) => {
  return (
    <Link
      sx={(theme) => ({
        color: theme.palette.text.primary,
        padding: theme.spacing(2),
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
      <Typography>{label}</Typography>

      <ArrowRight />
    </Link>
  )
}

export default AboutLink

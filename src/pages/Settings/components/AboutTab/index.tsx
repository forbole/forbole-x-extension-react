import React from 'react'
import { useTranslation } from 'react-i18next'
import { Box, Divider, Paper, Typography } from '@mui/material'
import AboutLink from './components/AboutLink'
import pkg from '../../../../../package.json'

const AboutUsTab = () => {
  const { t } = useTranslation('settings')

  const links: React.ComponentProps<typeof AboutLink>[] = [
    {
      URL: 'https://x.forbole.com/settings/about-forbole-x',
      label: t('about.aboutFbx'),
    },
    {
      URL: 'https://www.forbole.com/privacy-policy',
      label: t('about.privacyPolicy'),
    },
    {
      URL: 'https://www.forbole.com/terms-and-conditions',
      label: t('about.toc'),
    },
  ]

  return (
    <Paper
      sx={(theme) => ({
        paddingBottom: theme.spacing(2),
      })}
    >
      {links.map((x) => (
        <>
          <AboutLink key={x.label} {...x} />

          <Divider />
        </>
      ))}

      <Box
        sx={(theme) => ({
          color: theme.palette.text.primary,
          paddingTop: theme.spacing(2),
          paddingLeft: theme.spacing(2),
          paddingRight: theme.spacing(2),
          textDecoration: 'none',
          display: 'flex',
          flex: 1,
          justifyContent: 'space-between',
          alignItems: 'center',
        })}
      >
        <Typography>{t('about.version')}</Typography>

        <Typography>{pkg.version}</Typography>
      </Box>
    </Paper>
  )
}

export default AboutUsTab

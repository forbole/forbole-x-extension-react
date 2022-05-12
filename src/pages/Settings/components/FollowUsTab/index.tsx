import React from 'react'
import { Divider, Paper } from '@mui/material'
import { useTranslation } from 'react-i18next'
import SocialLink from './components/SocialLink'
import BigDipperIcon from '../../../../components/svg/BigDipperIcon'
import TwitterIcon from '../../../../components/svg/TwitterIcon'
import TelegramIcon from '../../../../components/svg/TelegramIcon'
import ForboleIcon from '../../../../components/svg/ForboleIcon'
import GithubIcon from '../../../../components/svg/GithubIcon'

const FollowUsTab = () => {
  const { t } = useTranslation('settings')

  const links: React.ComponentProps<typeof SocialLink>[] = React.useMemo(
    () => [
      {
        URL: 'https://twitter.com/forboleX',
        Icon: () => <TwitterIcon />,
        siteName: t('followUs.twitter.site'),
        label: t('followUs.twitter.name'),
      },
      {
        URL: 'https://t.me/forbole',
        Icon: () => <TelegramIcon />,
        siteName: t('followUs.telegram.site'),
        label: t('followUs.telegram.name'),
      },
      {
        URL: 'https://www.forbole.com/blog',
        Icon: () => <ForboleIcon />,
        siteName: t('followUs.forboleBlog.site'),
        label: t('followUs.forboleBlog.name'),
      },
      {
        URL: 'https://desmos.bigdipper.live/',
        Icon: () => <BigDipperIcon />,
        siteName: t('followUs.bigDipper.site'),
        label: t('followUs.bigDipper.name'),
      },
      {
        URL: 'https://github.com/forbole',
        Icon: () => <GithubIcon />,
        siteName: t('followUs.github.site'),
        label: t('followUs.github.name'),
      },
    ],
    []
  )

  return (
    <Paper>
      {links.map((x, index) => (
        <>
          <SocialLink key={x.label} {...x} />
          {index < links.length - 1 && <Divider />}
        </>
      ))}
    </Paper>
  )
}

export default FollowUsTab

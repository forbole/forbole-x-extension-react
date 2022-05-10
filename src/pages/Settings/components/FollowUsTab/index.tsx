import React from 'react'
import { Divider, Paper } from '@mui/material'
import SocialLink from '../FeedbackTab/components/SocialLink'
import BigDipperIcon from '../../../../components/svg/BigDipperIcon'
import TwitterIcon from '../../../../components/svg/TwitterIcon'
import TelegramIcon from '../../../../components/svg/TelegramIcon'
import ForboleIcon from '../../../../components/svg/ForboleIcon'
import GithubIcon from '../../../../components/svg/GithubIcon'

const FollowUsTab = () => {
  const links: React.ComponentProps<typeof SocialLink>[] = React.useMemo(
    () => [
      {
        URL: 'https://twitter.com/forboleX',
        Icon: () => <TwitterIcon />,
        siteName: 'Twitter',
        label: '@forboleX',
      },
      {
        URL: 'https://t.me/forbole',
        Icon: () => <TelegramIcon />,
        siteName: 'Telegram',
        label: '@forbole',
      },
      {
        URL: 'https://www.forbole.com/blog',
        Icon: () => <ForboleIcon />,
        siteName: 'Foroble Blog',
        label: 'forbole.com/blog',
      },
      {
        URL: 'https://desmos.bigdipper.live/',
        Icon: () => <BigDipperIcon />,
        siteName: 'Big Dipper Block Explorer',
        label: 'bigdipper.live',
      },
      {
        URL: 'https://github.com/forbole',
        Icon: () => <GithubIcon />,
        siteName: 'Github',
        label: 'github.com/forbole',
      },
    ],
    []
  )

  return (
    <Paper
      sx={(theme) => ({
        paddingTop: theme.spacing(2),
        paddingBottom: theme.spacing(2),
      })}
    >
      {links.map((x, index) => (
        <>
          <SocialLink key={x.label} {...x} />
          {index < links.length - 1 && (
            <Divider
              sx={(theme) => ({ marginTop: theme.spacing(2), marginBottom: theme.spacing(2) })}
            />
          )}
        </>
      ))}
    </Paper>
  )
}

export default FollowUsTab

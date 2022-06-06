import React from 'react';
import { Divider } from '@mui/material';
import { useTranslation } from 'react-i18next';
import BigDipperIcon from 'components/svg/BigDipperIcon';
import TwitterIcon from 'components/svg/TwitterIcon';
import TelegramIcon from 'components/svg/TelegramIcon';
import ForboleIcon from 'components/svg/ForboleIcon';
import GithubIcon from 'components/svg/GithubIcon';
import Layout from 'components/Layout/layout';
import SocialLink from './components/SocialLink';

const FollowUs = () => {
  const { t } = useTranslation('followus');

  const links: React.ComponentProps<typeof SocialLink>[] = React.useMemo(
    () => [
      {
        URL: 'https://twitter.com/forboleX',
        Icon: () => <TwitterIcon />,
        siteName: t('twitter.site'),
        label: t('twitter.name'),
      },
      {
        URL: 'https://t.me/forbole',
        Icon: () => <TelegramIcon />,
        siteName: t('telegram.site'),
        label: t('telegram.name'),
      },
      {
        URL: 'https://www.forbole.com/blog',
        Icon: () => <ForboleIcon />,
        siteName: t('forboleBlog.site'),
        label: t('forboleBlog.name'),
      },
      {
        URL: 'https://desmos.bigdipper.live/',
        Icon: () => <BigDipperIcon />,
        siteName: t('bigDipper.site'),
        label: t('bigDipper.name'),
      },
      {
        URL: 'https://github.com/forbole',
        Icon: () => <GithubIcon />,
        siteName: t('github.site'),
        label: t('github.name'),
      },
    ],
    []
  );

  return (
    <Layout title={t('tabName')} backPath="/">
      {links.map((x, index) => (
        <>
          <SocialLink key={x.label} {...x} />
          {index < links.length - 1 && <Divider />}
        </>
      ))}
    </Layout>
  );
};

export default FollowUs;

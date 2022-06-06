import React from 'react';
import { useTranslation } from 'react-i18next';
import { Box, Divider, Typography } from '@mui/material';
import Layout from 'components/Layout/layout';
import AboutLink from './components/AboutLink';
import pkg from '../../../package.json';

const About = () => {
  const { t } = useTranslation('about');

  const links: React.ComponentProps<typeof AboutLink>[] = [
    {
      URL: 'https://x.forbole.com/settings/about-forbole-x',
      label: t('aboutFbx'),
    },
    {
      URL: 'https://www.forbole.com/privacy-policy',
      label: t('privacyPolicy'),
    },
    {
      URL: 'https://www.forbole.com/terms-and-conditions',
      label: t('toc'),
    },
  ];

  return (
    <Layout title={t('tabName')} backPath="/">
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
        <Typography>{t('version')}</Typography>

        <Typography>{pkg.version}</Typography>
      </Box>
    </Layout>
  );
};

export default About;

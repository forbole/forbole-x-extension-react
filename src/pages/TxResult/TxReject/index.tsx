import React from 'react';
import Layout from 'components/Layout/layout';
import { Box, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Link, useParams } from 'react-router-dom';
import IconCross from 'components/svg/IconCross';
import TxFailedSvg from 'components/svg/TxFailedSvg';
import styles from '../styles';
import useHooks from '../useHooks';

/**
 * A page that displays a failure icon and reason for failure (error message).
 * The error message should be passed via URL query as "error"
 */
const TxReject = () => {
  // use shared hooks
  useHooks();

  const { t } = useTranslation('txResult');

  const { error } = useParams();

  return (
    <Layout
      hideLeftElement
      rightElement={
        <Link to="/">
          <IconCross />
        </Link>
      }
    >
      <Box sx={styles.container}>
        <TxFailedSvg />
        <Typography sx={styles.headerText}>{t('headerReject')}</Typography>
        <Typography>{error}</Typography>
      </Box>
    </Layout>
  );
};

export default TxReject;

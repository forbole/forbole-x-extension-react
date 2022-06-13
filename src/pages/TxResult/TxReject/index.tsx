import React from 'react';
import Layout from 'components/Layout/layout';
import { Box, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import TxSuccessSvg from 'components/svg/TxSuccessSvg';
import { useSearchParams } from 'react-router-dom';
import styles from '../styles';

/**
 * A page that displays a failure icon and reason for failure (error message).
 * The error message should be passed via URL query as "error"
 */
const TxReject = () => {
  const { t } = useTranslation('txSuccess');
  const [searchParams] = useSearchParams();

  const error = searchParams.get('error');

  return (
    <Layout hideLeftElement>
      <Box sx={styles.container}>
        <TxSuccessSvg />
        <Typography sx={styles.headerText}>{t('header')}</Typography>
        <Typography>{error}</Typography>
      </Box>
    </Layout>
  );
};

export default TxReject;

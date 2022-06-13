import React from 'react';
import Layout from 'components/Layout/layout';
import { Box, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useRecoilValue, useResetRecoilState } from 'recoil';
import { transactionState } from '@recoil/transaction';
import { formatCoin } from 'misc/utils';
import MsgUtils from 'lib/MsgUtils';
import TxSuccessSvg from 'components/svg/TxSuccessSvg';
import { useNavigate } from 'react-router';
import styles from '../styles';

/**
 * A page that indicates a successful tx. The content shown changes depending on the
 * type of transaction.
 */
const TxSuccess = () => {
  const { t } = useTranslation('txSuccess');
  const navigate = useNavigate();
  const txData = useRecoilValue(transactionState);
  const resetTxData = useResetRecoilState(transactionState);

  //  Redirects user to main page if txData is null
  React.useEffect(() => {
    if (txData.transactionData.msgs.length === 0) {
      navigate('/');
    }
  }, []);

  // Clear the transactionState atom on unmount
  React.useEffect(() => {
    return () => resetTxData();
  }, []);

  const i18nContent = React.useMemo(() => {
    const txType = txData.transactionData.msgs[0].typeUrl;
    if (txType === '/cosmos.staking.v1beta1.MsgDelegate')
      return t('successDelegation', {
        amount: formatCoin(
          txData.chainID,
          MsgUtils.calculateTotalTokens(txData.transactionData.msgs)
        ),
      });

    return '';
  }, [txData]);

  return (
    <Layout hideLeftElement>
      <Box sx={styles.container}>
        <TxSuccessSvg />
        <Typography sx={styles.headerText}>{t('header')}</Typography>
        <Typography>{t(i18nContent)}</Typography>
      </Box>
    </Layout>
  );
};

export default TxSuccess;

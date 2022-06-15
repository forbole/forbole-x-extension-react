import React from 'react';
import Layout from 'components/Layout/layout';
import { Box, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useRecoilValue } from 'recoil';
import { transactionState } from '@recoil/transaction';
import { formatCoin } from 'misc/utils';
import MsgUtils from 'lib/MsgUtils';
import TxSuccessSvg from 'components/svg/TxSuccessSvg';
import IconCross from 'components/svg/IconCross';
import { Link } from 'react-router-dom';
import styles from '../styles';
import useHooks from '../useHooks';

/**
 * A page that indicates a successful tx. The content shown changes depending on the
 * type of transaction.
 */
const TxSuccess = () => {
  // use shared hooks
  useHooks();

  const { t } = useTranslation('txResult');
  const txData = useRecoilValue(transactionState);

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
    <Layout
      hideLeftElement
      rightElement={
        <Link to="/">
          <IconCross />
        </Link>
      }
    >
      <Box sx={styles.container}>
        <TxSuccessSvg />
        <Typography sx={styles.headerText}>{t('headerSuccess')}</Typography>
        <Typography>{t(i18nContent)}</Typography>
      </Box>
    </Layout>
  );
};

export default TxSuccess;

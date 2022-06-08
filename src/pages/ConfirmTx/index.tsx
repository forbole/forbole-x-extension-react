import React from 'react';
import { useNavigate } from 'react-router';
import Layout from 'components/Layout/layout';
import ConfirmTxRow from 'pages/ConfirmTx/components/ConfirmTxRow';
import { Typography, Box } from '@mui/material';
import { useRecoilValue } from 'recoil';
import { transactionState } from '@recoil/transaction';
import IconDelegateTx from 'components/svg/IconDelegateTx';
import MsgUtils from 'lib/MsgUtils';
import { formatCoin, formatCoins } from 'misc/utils';
import { useTranslation } from 'react-i18next';
import _ from 'lodash';
import ConfirmTxValidatorList from 'pages/ConfirmTx/components/ConfirmTxValidatorList';
import useGasEstimation from 'hooks/useGasEstimation';

const ConfirmTx = () => {
  const { t } = useTranslation('confirmtx');
  const navigate = useNavigate();

  const { estimatedGas, loading: isPendingGasEstimation } = useGasEstimation();

  const {
    address,
    chainID,
    transactionData: { memo, msgs },
  } = useRecoilValue(transactionState);

  const txType = MsgUtils.getTxTypeFromMsgArr(msgs);

  const icon = React.useMemo(() => {
    switch (txType) {
      case '/cosmos.staking.v1beta1.MsgDelegate':
        return <IconDelegateTx />;

      default:
        return <IconDelegateTx />;
    }
  }, []);

  const titleText = React.useMemo(() => {
    if (txType === '/cosmos.staking.v1beta1.MsgDelegate') {
      return t('delegate.delegateAmount', {
        amount: formatCoin(
          MsgUtils.getChainIDWithDenom(_.get(msgs, '[0].value.amount.denom')),
          MsgUtils.calculateTotalTokens(msgs)
        ),
      });
    }
    return '';
  }, []);

  return (
    <Layout backCallback={() => navigate(-1)}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          marginBottom: 2,
        }}
      >
        {icon}

        <Typography variant="h3" sx={{ marginTop: 2 }}>
          {titleText}
        </Typography>
      </Box>

      <ConfirmTxRow label={t('address')} content={address} />

      {txType === '/cosmos.staking.v1beta1.MsgDelegate' && <ConfirmTxValidatorList msgs={msgs} />}

      <ConfirmTxRow
        label={t('amount')}
        content={formatCoin(chainID, MsgUtils.calculateTotalTokens(msgs))}
      />

      <ConfirmTxRow label={t('note')} content={memo} />

      <ConfirmTxRow
        label={t('fee')}
        content={
          isPendingGasEstimation ? t('estimatingGas') : formatCoins(chainID, estimatedGas.amount)
        }
      />
    </Layout>
  );
};

export default ConfirmTx;

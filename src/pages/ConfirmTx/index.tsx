import React from 'react';
import { useNavigate } from 'react-router';
import Layout from 'components/Layout/layout';
import ConfirmTxRow from 'pages/ConfirmTx/components/ConfirmTxRow';
import { Typography, Box } from '@mui/material';
import { useRecoilValue } from 'recoil';
import { transactionState } from '@recoil/transaction';
import IconDelegateTx from 'components/svg/IconDelegateTx';
import MsgUtils from 'lib/MsgUtils';
import { formatCoin } from 'misc/utils';
import { useTranslation } from 'react-i18next';
import _ from 'lodash';
import ConfirmTxValidatorList from 'pages/ConfirmTx/components/ConfirmTxValidatorList';
import GasEstimation from 'pages/ConfirmTx/components/GasEstimation';
import { transformFee } from 'lib/estimateGasFees';
import chains from 'misc/chains';
import styles from './styles';

const ConfirmTx = () => {
  const { t } = useTranslation('confirmtx');
  const navigate = useNavigate();

  const {
    address,
    chainID,
    transactionData: { memo, msgs },
  } = useRecoilValue(transactionState);

  const [gas, setGas] = React.useState(0);

  const computedFee = React.useMemo(() => {
    return transformFee(chains[chainID], Number(gas));
  }, [gas]);

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
      <Box sx={styles.container}>
        {icon}

        <Typography variant="h3" sx={styles.titleText}>
          {titleText}
        </Typography>
      </Box>

      <ConfirmTxRow label={t('address')} content={address} />

      {txType === '/cosmos.staking.v1beta1.MsgDelegate' && <ConfirmTxValidatorList msgs={msgs} />}

      <ConfirmTxRow
        label={t('amount')}
        content={formatCoin(chainID, MsgUtils.calculateTotalTokens(msgs))}
      />

      <ConfirmTxRow label={t('note')} content={memo || t('NA')} />

      <GasEstimation chainID={chainID} gasFee={computedFee} onGasChanged={setGas} />
    </Layout>
  );
};

export default ConfirmTx;

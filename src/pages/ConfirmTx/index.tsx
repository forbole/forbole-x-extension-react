import React from 'react';
import { useNavigate } from 'react-router';
import Layout from 'components/Layout/layout';
import ConfirmTxRow from 'pages/ConfirmTx/components/ConfirmTxRow';
import { Typography, Box, Divider, Button, CircularProgress } from '@mui/material';
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
import TxDataView from 'pages/ConfirmTx/components/TxDataView';
import useSignerInfo from 'hooks/useSignerInfo';
import useGasEstimation from 'hooks/useGasEstimation';
import styles from './styles';

/**
 * Page where user confirms the transaction. Users can also change the gas fee here.
 * This is also where the final gas fee gets appended to the recoil transactionState atom.
 *
 * Goes to EnterWalletPasswordPage
 */
const ConfirmTx = () => {
  const { t } = useTranslation('confirmtx');
  const navigate = useNavigate();

  const {
    address,
    chainID,
    transactionData: { memo, msgs },
  } = useRecoilValue(transactionState);

  const { loading: signerInfoLoading, signerInfo } = useSignerInfo(address);

  const { estimatedGas, loading: gasEstimationLoading } = useGasEstimation();

  const [gas, setGas] = React.useState(0);

  React.useEffect(() => {
    if (!gasEstimationLoading) setGas(estimatedGas.gas);
  }, [gasEstimationLoading]);

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

  const isLoading = gasEstimationLoading || signerInfoLoading;

  return (
    <Layout backCallback={() => navigate(-1)}>
      <Box sx={styles.container}>
        {icon}

        <Typography variant="h3" sx={styles.titleText}>
          {titleText}
        </Typography>
      </Box>

      <Box sx={styles.contentContainer}>
        <Divider sx={styles.divider} />

        <ConfirmTxRow label={t('address')} content={address} />

        <Divider sx={styles.divider} />

        {txType === '/cosmos.staking.v1beta1.MsgDelegate' && <ConfirmTxValidatorList msgs={msgs} />}

        <Divider sx={styles.divider} />

        <ConfirmTxRow
          label={t('amount')}
          content={formatCoin(chainID, MsgUtils.calculateTotalTokens(msgs))}
        />

        <Divider sx={styles.divider} />

        <ConfirmTxRow label={t('note')} content={memo || t('NA')} />

        <Divider sx={styles.divider} />

        <GasEstimation
          estimatedGas={estimatedGas}
          estimateGasLoading={gasEstimationLoading}
          chainID={chainID}
          gasFee={computedFee}
          onGasChanged={setGas}
        />

        <Divider sx={styles.divider} />

        <TxDataView txData={{ ...msgs, ...signerInfo }} fee={computedFee} />

        <Button variant="contained" fullWidth disabled={isLoading}>
          {isLoading ? <CircularProgress /> : <Typography>{t('common:confirm')}</Typography>}
        </Button>
      </Box>
    </Layout>
  );
};

export default ConfirmTx;

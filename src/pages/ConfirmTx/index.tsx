import React from 'react';
import { useNavigate } from 'react-router';
import Layout from 'components/Layout/layout';
import ConfirmTxRow from 'pages/ConfirmTx/components/ConfirmTxRow';
import { Typography, Box, Divider, Button, CircularProgress } from '@mui/material';
import { useRecoilState } from 'recoil';
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

  const [txData, setTxData] = useRecoilState(transactionState);

  const {
    address,
    chainID,
    transactionData: { memo, msgs },
  } = txData;

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

  const content = React.useMemo(() => {
    switch (txType) {
      case '/cosmos.staking.v1beta1.MsgDelegate':
        return {
          icon: <IconDelegateTx />,
          title: t('delegate.delegateAmount', {
            amount: formatCoin(
              MsgUtils.getChainIDWithDenom(_.get(msgs, '[0].value.amount.denom')),
              MsgUtils.calculateTotalTokens(msgs)
            ),
          }),
          details: <ConfirmTxValidatorList msgs={msgs} />,
        };

      default:
        return {
          icon: null,
          title: '',
        };
    }
  }, []);

  const isLoading = gasEstimationLoading || signerInfoLoading;

  const handleConfirm = React.useCallback(() => {
    setTxData({ ...txData, ...computedFee, ...signerInfo });
    navigate('/confirm-tx-unlock-wallet');
  }, [computedFee, signerInfo]);

  return (
    <Layout hideLeftElement>
      <Box sx={styles.contentContainer}>
        <Box sx={styles.titleContainer}>
          {content.icon}

          <Typography variant="h3" sx={styles.titleText}>
            {content.title}
          </Typography>
        </Box>

        <Divider sx={styles.divider} />

        <ConfirmTxRow label={t('address')} content={address} />

        <Divider sx={styles.divider} />

        {content.details}

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

        <Box sx={styles.buttonContainer}>
          <Button variant="contained" fullWidth disabled={isLoading} onClick={handleConfirm}>
            {isLoading ? <CircularProgress /> : <Typography>{t('common:confirm')}</Typography>}
          </Button>
        </Box>
      </Box>
    </Layout>
  );
};

export default ConfirmTx;

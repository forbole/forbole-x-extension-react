import React from 'react';
import Layout from 'components/Layout/layout';
import { useRecoilValue } from 'recoil';
import { transactionState } from '@recoil/transaction';
import { useDecryptWallet } from '@recoil/wallets';
import { accountsState } from '@recoil/accounts';
import { Box, Button, CircularProgress, Typography } from '@mui/material';
import signAndBroadcastTransaction from 'misc/tx/signAndBroadcastTransaction';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';
import PasswordInput from 'components/inputs/PasswordInput';
import styles from './styles';

/**
 * A dialog where users enter their wallet password to decrypt their wallets for transaction signing.
 *
 * Goes to either TxSuccess or TxReject depending on the tx result.
 */
const EnterWalletPassword = () => {
  const navigate = useNavigate();
  const { address, transactionData } = useRecoilValue(transactionState);
  const decryptWallet = useDecryptWallet();
  const { t } = useTranslation('enterWalletPW');

  const [loading, setLoading] = React.useState(false);
  const [password, setPassword] = React.useState('');
  const [error, setError] = React.useState('');

  const accounts = useRecoilValue(accountsState);

  const onSubmit = async () => {
    setError('');
    // Get walletID
    const account = accounts.find((_account) => _account.address === address);
    const walletID = account.walletId;

    let mnemonic;
    try {
      setLoading(true);
      const decryptedWallet = decryptWallet(walletID, password);

      mnemonic = decryptedWallet.mnemonic;
    } catch (err) {
      console.log(err);
      setError(t('error:incorrectPw'));
    }

    try {
      await signAndBroadcastTransaction(mnemonic, password, account, transactionData, undefined);

      navigate('/tx-success');
    } catch (err) {
      console.log(err);
      navigate('/tx-reject', { state: { error: err.toString() } });
    } finally {
      setLoading(false);
    }
  };

  return (
    // need to change this if tx is coming from external source
    <Layout backCallback={() => navigate(-1)}>
      <Box sx={styles.container}>
        <Typography sx={styles.titleText} variant="h3">
          {t('title')}
        </Typography>
        <Box sx={styles.formInnerContainer}>
          <div>
            <Typography sx={styles.inputLabel}>{t('inputLabel')}</Typography>
            <PasswordInput
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder={t('placeholder')}
            />
            {error && <Typography sx={styles.errorText}>{error}</Typography>}
          </div>

          <Button fullWidth onClick={onSubmit} variant="contained">
            {loading ? <CircularProgress /> : <Typography>{t('common:next')}</Typography>}
          </Button>
        </Box>
      </Box>
    </Layout>
  );
};

export default EnterWalletPassword;

import React from 'react';
import { useNavigate } from 'react-router';
import Layout from 'components/Layout/layout';
import { useTranslation } from 'react-i18next';
import { Box, Button, CircularProgress, TextField, Typography } from '@mui/material';
import MultiFunctionStaking from 'components/MultiFunctionStaking';
import CoinCurrency from 'components/CoinCurrency';
import _ from 'lodash';
import { useRecoilValue } from 'recoil';
import { currencyState } from '@recoil/settings';
import { formatCoinV2 } from 'misc/utils';
import useHooks from './useHooks';
import styles from './styles';

const UndelegatePage = () => {
  const { t } = useTranslation('staking');
  const {
    account,
    currencyValue,
    delegatedAmount,
    memo,
    setMemo,
    validatorAddress,
    undelegateAmount,
    setUndelegateAmount,
    onConfirm,
  } = useHooks();

  const navigate = useNavigate();
  const currency = useRecoilValue(currencyState);
  const formattedCoin = formatCoinV2(account.chain, delegatedAmount);

  return (
    <Layout
      title={t('undelegate')}
      backCallback={() => {
        navigate(-1);
      }}
    >
      <Box px={2}>
        <MultiFunctionStaking
          type="undelegate"
          totalDelegation={delegatedAmount}
          account={account}
          preSelectedValidators={[validatorAddress]}
          onChange={setUndelegateAmount}
        />

        <Box>
          <Typography sx={styles.memoLabel}>{t('note')}</Typography>

          <TextField
            sx={styles.memoInput}
            InputProps={{
              sx: {
                padding: 1,
              },
              disableUnderline: true,
            }}
            fullWidth
            variant="filled"
            placeholder={t('memoPlaceholder')}
            value={memo}
            multiline
            rows={5}
            onChange={(event) => setMemo(event.target.value)}
          />
        </Box>
      </Box>

      <Box sx={styles.bottomGroup}>
        {!currencyValue ? (
          <CircularProgress />
        ) : (
          <CoinCurrency
            amount={undelegateAmount[validatorAddress] || 0}
            symbol={formattedCoin.token.symbol}
            currencyValue={currencyValue}
            currency={currency}
          />
        )}

        <Button
          disabled={
            !undelegateAmount[validatorAddress] ||
            _.get(undelegateAmount, `[${validatorAddress}]`) > formattedCoin.amount
          }
          sx={styles.nextButton}
          variant="contained"
          type="button"
          onClick={onConfirm}
        >
          <Typography>{t('common:next')}</Typography>
        </Button>
      </Box>
    </Layout>
  );
};

export default UndelegatePage;

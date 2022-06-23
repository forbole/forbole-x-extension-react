import React from 'react';
import { useNavigate } from 'react-router';
import Layout from 'components/Layout/layout';
import { Trans, useTranslation } from 'react-i18next';
import { Box, Button, CircularProgress, TextField, Typography } from '@mui/material';
import CoinCurrency from 'components/CoinCurrency';
import { useRecoilValue, useRecoilValueLoadable } from 'recoil';
import { currencyState } from '@recoil/settings';
import { validatorsState } from '@recoil/validators';
import DelegationInput from 'components/DelegationInput';
import useHooks from './useHooks';
import styles from './styles';

const UndelegatePage = () => {
  const { t } = useTranslation('staking');
  const {
    account,
    currencyValue,
    memo,
    setMemo,
    validatorAddress,
    undelegateAmount,
    onConfirm,
    percent,
    formattedCoin,
    handleChange,
  } = useHooks();

  const navigate = useNavigate();
  const currency = useRecoilValue(currencyState);
  const validators = useRecoilValueLoadable(validatorsState({ chainId: account.chain }));

  const { formatted, token } = formattedCoin;

  return (
    <Layout
      title={t('undelegate')}
      backCallback={() => {
        navigate(-1);
      }}
    >
      <Box px={2}>
        <Box sx={styles.container}>
          <Typography variant="body1" sx={styles.titleBold}>
            <Trans
              i18nKey="staking:totalDelegationAmount"
              values={{
                amount: formatted,
              }}
              components={{
                bold: <Typography sx={{ fontWeight: '500' }} variant="body1" />,
              }}
            />
          </Typography>
          <Box sx={styles.validatorList}>
            <DelegationInput
              key={validatorAddress}
              validatorLabel={t('undelegateFrom')}
              validator={validators.contents.find((x) => x.address === validatorAddress)}
              chainID={account.chain}
              delegationAmount={undelegateAmount}
              percent={percent}
              tokenDenom={token.symbol}
              handleAmountChange={handleChange('amount')}
              handleSliderChanged={handleChange('slider')}
              handlePercentChanged={handleChange('percent')}
            />
          </Box>
        </Box>

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
            amount={undelegateAmount || 0}
            symbol={formattedCoin.token.symbol}
            currencyValue={currencyValue}
            currency={currency}
          />
        )}

        <Button
          disabled={undelegateAmount <= 0 || undelegateAmount > formattedCoin.amount}
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

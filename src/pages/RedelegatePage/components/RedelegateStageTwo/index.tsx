import React from 'react';
import { Box, Button, CircularProgress, Typography } from '@mui/material';
import { shuffle } from 'lodash';
import SelectValidatorList from 'components/SelectValidatorList';
import AmountInput from 'components/DelegationInput/components/AmountInput';
import { formatCoinV2 } from 'misc/utils';
import FormatUtils from 'lib/FormatUtils';
import MemoInput from 'components/MemoInput';
import { Trans, useTranslation } from 'react-i18next';
import CoinCurrency from 'components/CoinCurrency';
import styles from '../styles';

type Props = {
  validators: Validator[];

  account: Account;

  maxDelegation: Coin;

  onChange: any;

  onConfirm: any;

  currency: string;

  currencyValue: number;
};

const RedelegateStageTwo = ({
  currency,
  currencyValue,
  validators,
  account,
  maxDelegation,
  onChange,
  onConfirm,
}: Props) => {
  const { t } = useTranslation();

  const { amount, token, formatted } = formatCoinV2(account.chain, maxDelegation);

  const randomizedValidators = React.useMemo(() => shuffle(validators), []);

  const [redelegateValidator, setRedelegateValidator] = React.useState<string>('');

  const [redelegateAmount, setRedelegateAmount] = React.useState(amount);

  const [percent, setPercent] = React.useState(100);

  const [memo, setMemo] = React.useState('');

  const [memoConsent, setMemoConsent] = React.useState(true);

  const handleChange = React.useCallback(
    (inputType: 'amount' | 'percent' | 'slider') => (event: any, value?: any) => {
      const targetValue = event.target.value;

      if (inputType === 'amount') {
        setRedelegateAmount(targetValue);
        setPercent(Number(FormatUtils.decimalToPercent(targetValue / amount)));
      }
      if (inputType === 'percent') {
        setRedelegateAmount(amount * (Number(targetValue) / 100));

        setPercent(targetValue);
      }
      if (inputType === 'slider') {
        setPercent(Number(FormatUtils.decimalToPercent(Number(value))));

        setRedelegateAmount(amount * Number(value));
      }
    },
    [redelegateAmount, percent]
  );

  const handleConfirm = React.useCallback(() => {
    console.log(redelegateValidator);
  }, []);

  return (
    <Box sx={styles.container}>
      <Typography variant="body1" sx={styles.headerText}>
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

      <Box sx={styles.inputGroup}>
        <Box sx={{ width: '50%' }}>
          <Typography sx={styles.labelText}>{t('staking:redelegateTo')}</Typography>

          <SelectValidatorList
            validators={randomizedValidators}
            onChange={setRedelegateValidator}
          />
        </Box>

        <Box mx={1} />

        <Box>
          <Typography sx={styles.labelText}>{t('amount')}</Typography>
          <AmountInput
            amount={redelegateAmount}
            denomSymbol={token.symbol}
            percent={percent}
            handleAmountChanged={handleChange('amount')}
            handleSliderChanged={handleChange('slider')}
            handlePercentChanged={handleChange('percent')}
          />
        </Box>
      </Box>

      <Typography sx={styles.labelText}>{t('memo')}</Typography>

      <MemoInput
        value={memo}
        setValue={setMemo}
        consent={memoConsent}
        setConsent={setMemoConsent}
      />

      <Box sx={styles.bottomGroup}>
        {!currencyValue ? (
          <CircularProgress />
        ) : (
          <CoinCurrency
            amount={redelegateAmount}
            symbol={token.symbol}
            currencyValue={currencyValue}
            currency={currency}
          />
        )}

        <Button
          disabled={
            !redelegateValidator ||
            !memoConsent ||
            redelegateAmount === 0 ||
            redelegateAmount > amount
          }
          sx={styles.nextButton}
          variant="contained"
          type="button"
          onClick={handleConfirm}
        >
          <Typography>{t('common:next')}</Typography>
        </Button>
      </Box>
    </Box>
  );
};

export default RedelegateStageTwo;

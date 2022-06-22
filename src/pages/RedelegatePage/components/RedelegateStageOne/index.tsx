import React from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { Box, Button, CircularProgress, Typography } from '@mui/material';
import _ from 'lodash';
import { formatCoin } from 'misc/utils';
import DelegationInput from 'components/DelegationInput';
import CoinCurrency from 'components/CoinCurrency';
import FormatUtils from 'lib/FormatUtils';
import styles from '../styles';

type Props = {
  /**
   * The select validator to redelegate from
   */
  validator: Validator;

  formattedCoin: any;

  chainID: string;

  /**
   * The amount that has been delegated to the validator
   */
  delegatedAmount: Coin;

  /**
   * The amount to redelegate. This is set by the user.
   */
  amountToRedelegate: number;

  /**
   * Set the amountToRedelegate value, which should be a useState value
   * from the parent container.
   */
  setAmountToRedelegate: (value: number) => void;

  /**
   * Callback for when the user confirms the inputs during this stage
   */
  onConfirm: (redelegationAmount: number) => void;

  currency: string;

  currencyValue: number;
};

/**
 * Stage one of the redelegate stage.
 * Users select the amount of currency to redelegate.
 */
const RedelegateStageOne = ({
  chainID,
  currency,
  currencyValue,
  validator,
  delegatedAmount,
  onConfirm,
  amountToRedelegate,
  setAmountToRedelegate,
  formattedCoin,
}: Props) => {
  const { t } = useTranslation('staking');

  /**
   * Percent in decimal format 1 = 100%, 0.1 = 10%, etc
   */
  const [percent, setPercent] = React.useState<any>(
    FormatUtils.decimalToPercent(amountToRedelegate / Number(delegatedAmount.amount))
  );

  const handleChange = React.useCallback(
    (inputType: 'amount' | 'percent' | 'slider') =>
      (
        event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
        value?: number | number[]
      ) => {
        const _value = _.get(event, 'target.value');
        if (inputType === 'amount') {
          setPercent(((_value / formattedCoin.amount) * 100).toFixed(2));
          setAmountToRedelegate(_value);
        }
        if (inputType === 'percent') {
          const _percent = _value;
          setAmountToRedelegate(formattedCoin.amount * (Number(_percent) / 100));
          setPercent(_percent);
        }
        if (inputType === 'slider') {
          setPercent((Number(value) * 100).toFixed(2));
          setAmountToRedelegate(formattedCoin.amount * Number(value));
        }
      },
    [amountToRedelegate, percent]
  );

  const handleConfirm = React.useCallback(() => {
    onConfirm(amountToRedelegate);
  }, [amountToRedelegate]);

  return (
    <Box sx={styles.container}>
      <Typography variant="body1" sx={styles.headerText}>
        <Trans
          i18nKey="staking:totalDelegationAmount"
          values={{
            amount: formatCoin(chainID, delegatedAmount),
          }}
          components={{
            bold: <Typography sx={{ fontWeight: '500' }} variant="body1" />,
          }}
        />
      </Typography>

      <DelegationInput
        validatorLabel={t('staking:redelegate')}
        validator={validator}
        chainID={chainID}
        delegationAmount={amountToRedelegate}
        tokenDenom={formattedCoin.token.symbol}
        percent={percent}
        handleAmountChange={handleChange('amount')}
        handlePercentChanged={handleChange('percent')}
        handleSliderChanged={handleChange('slider')}
      />

      <Box sx={styles.bottomGroup}>
        {!currencyValue ? (
          <CircularProgress />
        ) : (
          <CoinCurrency
            amount={amountToRedelegate || 0}
            symbol={formattedCoin.token.symbol}
            currencyValue={currencyValue}
            currency={currency}
          />
        )}

        <Button
          disabled={amountToRedelegate === 0 || amountToRedelegate > formattedCoin.amount}
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

export default RedelegateStageOne;

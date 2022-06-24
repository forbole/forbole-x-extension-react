import React from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { Box, Button, CircularProgress, Typography } from '@mui/material';
import _ from 'lodash';
import DelegationInput from 'components/DelegationInput';
import CoinCurrency from 'components/CoinCurrency';
import FormatUtils from 'lib/FormatUtils';
import styles from '../styles';

type Props = {
  /**
   * The select validator to redelegate from
   */
  validator: Validator;

  /**
   * Formatted version of the current delegation amount.
   */
  formattedCurrentDelegatedAmount: {
    formatted: string;
    token: Token;
    amount: number;
    chainID: string;
  };

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
  onConfirm: () => void;

  currency: string;

  currencyValue: number;
};

/**
 * Stage one of the redelegate stage.
 * Users select the amount of currency to redelegate.
 */
const RedelegateStageOne = ({
  currency,
  currencyValue,
  validator,
  onConfirm,
  amountToRedelegate,
  setAmountToRedelegate,
  formattedCurrentDelegatedAmount,
}: Props) => {
  const { t } = useTranslation('staking');

  /**
   * Percent in decimal format 1 = 100%, 0.1 = 10%, etc
   */
  const [percent, setPercent] = React.useState<any>(
    FormatUtils.decimalToPercent(
      amountToRedelegate / Number(formattedCurrentDelegatedAmount.amount)
    )
  );

  const handleChange = React.useCallback(
    (inputType: 'amount' | 'percent' | 'slider') =>
      (
        event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
        value?: number | number[]
      ) => {
        const _value = _.get(event, 'target.value');
        if (inputType === 'amount') {
          setPercent(((_value / formattedCurrentDelegatedAmount.amount) * 100).toFixed(2));
          setAmountToRedelegate(_value);
        }
        if (inputType === 'percent') {
          const _percent = _value;
          setAmountToRedelegate(formattedCurrentDelegatedAmount.amount * (Number(_percent) / 100));
          setPercent(_percent);
        }
        if (inputType === 'slider') {
          setPercent((Number(value) * 100).toFixed(2));
          setAmountToRedelegate(formattedCurrentDelegatedAmount.amount * Number(value));
        }
      },
    [amountToRedelegate, percent]
  );

  return (
    <Box sx={styles.container}>
      <Typography variant="body1" sx={styles.headerText}>
        <Trans
          i18nKey="staking:totalDelegationAmount"
          values={{
            amount: formattedCurrentDelegatedAmount.formatted,
          }}
          components={{
            bold: <Typography sx={{ fontWeight: '500' }} variant="body1" />,
          }}
        />
      </Typography>

      <DelegationInput
        validatorLabel={t('staking:redelegate')}
        validator={validator}
        chainID={formattedCurrentDelegatedAmount.chainID}
        delegationAmount={amountToRedelegate}
        tokenDenom={formattedCurrentDelegatedAmount.token.symbol}
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
            symbol={formattedCurrentDelegatedAmount.token.symbol}
            currencyValue={currencyValue}
            currency={currency}
          />
        )}

        <Button
          disabled={
            amountToRedelegate === 0 || amountToRedelegate > formattedCurrentDelegatedAmount.amount
          }
          sx={styles.nextButton}
          variant="contained"
          type="button"
          onClick={onConfirm}
        >
          <Typography>{t('common:next')}</Typography>
        </Button>
      </Box>
    </Box>
  );
};

export default RedelegateStageOne;

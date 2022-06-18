import React from 'react';
import { Trans } from 'react-i18next';
import { Box, Typography } from '@mui/material';
import _ from 'lodash';
import { formatCoin, formatCoinV2 } from 'misc/utils';
import DelegationInput from 'components/DelegationInput';

type Props = {
  /**
   * The select validator to redelegate from
   */
  validator: Validator;

  /**
   * The amount that has been delegated to the validator
   */
  delegatedAmount: Coin;

  /**
   * Callback for when the user confirms the inputs during this stage
   */
  onConfirm: any;

  /**
   * The chainID of the delegating account. Used to build an external link to the
   * blockexplorer of the user's choice
   */
  chainID: string;
};

/**
 * Stage one of the redelegate stage.
 * Users select the amount of currency to redelegate.
 */
const RedelegateStageOne = ({ validator, delegatedAmount, onConfirm, chainID }: Props) => {
  const actualDenoms = React.useMemo(() => {
    return formatCoinV2(chainID, delegatedAmount);
  }, [delegatedAmount]);

  const [amountToRedelegate, setAmountToRedelegate] = React.useState(actualDenoms.amount);

  /**
   * Percent in decimal format 1 = 100%, 0.1 = 10%, etc
   */
  const [percent, setPercent] = React.useState<any>(100);

  const handleChange = React.useCallback(
    (inputType: 'amount' | 'percent' | 'slider') =>
      (
        event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
        value?: number | number[]
      ) => {
        const _value = _.get(event, 'target.value');
        if (inputType === 'amount') {
          setPercent(((_value / actualDenoms.amount) * 100).toFixed(2));
        }
        if (inputType === 'percent') {
          const _percent = _value;
          setAmountToRedelegate(actualDenoms.amount * (Number(_percent) / 100));
          setPercent(_percent);
        }
        if (inputType === 'slider') {
          setPercent((Number(value) * 100).toFixed(2));
          setAmountToRedelegate(actualDenoms.amount * Number(value));
        }
      },
    [amountToRedelegate, percent]
  );

  return (
    <Box sx={{ px: 2 }}>
      <Typography variant="body1" sx={{ display: 'flex' }}>
        <Trans
          i18nKey="redelegate:totalDelegationAmount"
          values={{
            amount: formatCoin(chainID, delegatedAmount),
          }}
          components={{
            bold: <Typography sx={{ fontWeight: '500' }} variant="body1" />,
          }}
        />
      </Typography>

      <DelegationInput
        validator={validator}
        chainID={chainID}
        delegationAmount={amountToRedelegate}
        tokenDenom={actualDenoms.token.symbol}
        percent={percent}
        type="redelegate"
        handleChange={handleChange('amount')}
        handlePercentChanged={handleChange('percent')}
        handleSliderChanged={handleChange('slider')}
      />
    </Box>
  );
};

export default RedelegateStageOne;

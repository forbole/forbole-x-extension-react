import React from 'react';
import { Box, Typography } from '@mui/material';
import { Trans, useTranslation } from 'react-i18next';
import { formatCoinV2 } from 'misc/utils';
import DelegationInput from 'components/DelegationInput';

type Props = {
  validators: Validator[];

  totalDelegation: Coin;

  account: Account;

  preSelectedValidators?: string[];

  /**
   * The component type. Controls the label that will be rendered above the validator's name.
   */
  type: 'delegate' | 'redelegate' | 'undelegate';

  /**
   * Callback to bubble new delegation values to the parent container
   */
  onChange: (newDelegations: { [index: string]: number }) => void;
};

const formatPercent = (decimal: number) => {
  return (decimal * 100).toFixed(2);
};

const MultiFunctionStaking = ({
  validators,
  account,
  totalDelegation,
  preSelectedValidators = [],
  type,
  onChange,
}: Props) => {
  const { t } = useTranslation('staking');

  const [selectedValidators, setSelectedValidators] = React.useState<any>([]);

  const [delegatedAmounts, setDelegatedAmounts] = React.useState({});

  const [percents, setPercents] = React.useState({});

  const { formatted, amount, token } = formatCoinV2(account.chain, totalDelegation);

  React.useEffect(() => {
    if (preSelectedValidators.length === 0) return;
    setSelectedValidators(preSelectedValidators);

    const percentPerValidator = ((1 / preSelectedValidators.length) * 100).toFixed(2);

    const percentsMap = preSelectedValidators.reduce((acc, cur) => {
      return {
        ...acc,
        [cur]: percentPerValidator,
      };
    }, {});

    console.log('amount', amount);
    const amountMap = preSelectedValidators.reduce((acc, cur) => {
      return {
        ...acc,
        [cur]: amount * (Number(percentPerValidator) / 100),
      };
    }, {});

    setDelegatedAmounts(amountMap);
    setPercents(percentsMap);
  }, [preSelectedValidators.length]);

  const chainID = account.chain;

  const validatorLabel = () => {
    switch (type) {
      case 'undelegate':
        return t('undelegateFrom');
      case 'redelegate':
        return t('redelegateFrom');
      default:
        return '';
    }
  };

  const handleChange = React.useCallback(
    (address: string) =>
      (inputType: 'amount' | 'percent' | 'slider') =>
      (event: any, value?: any) => {
        const targetValue = event.target.value;

        if (inputType === 'amount') {
          setDelegatedAmounts((prev) => ({
            ...prev,
            [address]: targetValue,
          }));
          setPercents((prev) => ({
            ...prev,
            [address]: formatPercent(targetValue / amount),
          }));
        }
        if (inputType === 'percent') {
          setDelegatedAmounts((prev) => ({
            ...prev,
            [address]: amount * (Number(targetValue) / 100),
          }));

          setPercents((prev) => ({
            ...prev,
            [address]: targetValue,
          }));
        }
        if (inputType === 'slider') {
          setPercents((prev) => ({
            ...prev,
            [address]: (Number(value) * 100).toFixed(2),
          }));

          setDelegatedAmounts((prev) => ({
            ...prev,
            [address]: amount * Number(value),
          }));
        }
      },
    [delegatedAmounts, percents]
  );

  React.useEffect(() => {
    onChange(delegatedAmounts);
  }, [delegatedAmounts]);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      <Typography variant="body1" sx={{ display: 'flex' }}>
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
      <Box
        sx={{
          display: 'flex',
        }}
      >
        {selectedValidators.map((validatorAddress) => {
          return (
            <DelegationInput
              key={validatorAddress}
              validatorLabel={validatorLabel()}
              validator={validators.find((x) => x.address === validatorAddress)}
              chainID={chainID}
              delegationAmount={delegatedAmounts[validatorAddress]}
              percent={percents[validatorAddress]}
              tokenDenom={token.symbol}
              handleChange={handleChange(validatorAddress)('amount')}
              handleSliderChanged={handleChange(validatorAddress)('slider')}
              handlePercentChanged={handleChange(validatorAddress)('percent')}
            />
          );
        })}
      </Box>
    </Box>
  );
};

export default MultiFunctionStaking;

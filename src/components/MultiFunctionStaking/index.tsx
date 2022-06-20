import React from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';
import { Trans, useTranslation } from 'react-i18next';
import { formatCoinV2 } from 'misc/utils';
import DelegationInput from 'components/DelegationInput';
import { useRecoilValueLoadable } from 'recoil';
import { validatorsState } from '@recoil/validators';
import styles from './styles';

type Props = {
  /**
   * The list of validators for the chain.
   */
  // validators: Validator[];

  /**
   * The total (max) delegation available for this component to manage.
   */
  totalDelegation: Coin;

  /**
   * The staking account.
   */
  account: Account;

  /**
   * Preselected validators that will appear in the list on mount. Should be
   * an array of addresses
   */
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

/**
 * A component for staking type transactions where users can select validators
 * to delegate to/redelegate to/undelegate from
 */
const MultiFunctionStaking = ({
  account,
  totalDelegation,
  preSelectedValidators = [],
  type,
  onChange,
}: Props) => {
  const { t } = useTranslation('staking');

  const validators = useRecoilValueLoadable(validatorsState({ chainId: account.chain }));

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

  /**
   * Bubble the delegated amount value to parent state.
   * This is done in a useEffect instead of the callback
   * so we don't have to deal with the async nature of setState.
   */
  React.useEffect(() => {
    onChange(delegatedAmounts);
  }, [delegatedAmounts]);

  if (validators.state !== 'hasValue') {
    return <CircularProgress />;
  }

  return (
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
        {selectedValidators.map((validatorAddress) => {
          return (
            <DelegationInput
              key={validatorAddress}
              validatorLabel={validatorLabel()}
              validator={validators.contents.find((x) => x.address === validatorAddress)}
              chainID={chainID}
              delegationAmount={delegatedAmounts[validatorAddress]}
              percent={percents[validatorAddress]}
              tokenDenom={token.symbol}
              handleAmountChange={handleChange(validatorAddress)('amount')}
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

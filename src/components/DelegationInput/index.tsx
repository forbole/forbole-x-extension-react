import { Box, Typography } from '@mui/material';
import RedelegateValidatorLink from 'pages/RedelegatePage/components/RedelegateStageOne/components/RedelegateValidatorLink';
import BlockExplorerUtils from 'lib/BlockExplorerUtils';
import React from 'react';
import AmountInput from 'components/DelegationInput/components/AmountInput';
import { useTranslation } from 'react-i18next';
import styles from './styles';

type Props = {
  /**
   * The validator.
   */
  validator: Validator;

  /**
   * The chainID of the currency. Refer to chains.ts for valid keys.
   */
  chainID: string;

  /**
   * The amount to delegate to the validator.
   */
  delegationAmount: number;

  /**
   * The currency's denomination.
   */
  tokenDenom: string;

  /**
   * Callback for when the amount input is changed.
   */
  handleAmountChange: (event: any) => void;

  validatorLabel: string;

  percent: number;

  handleSliderChanged: (event: any, newValue: number | number[]) => void;

  handlePercentChanged: (event: any) => void;
};

/**
 * A component that shows a clickable validator name and the
 * amount of currency to be delegated to them. For use in delegation/redelegation flows.
 */
const DelegationInput = ({
  validator,
  chainID,
  delegationAmount,
  tokenDenom,
  validatorLabel,
  percent,
  handleAmountChange,
  handleSliderChanged,
  handlePercentChanged,
}: Props) => {
  const { t } = useTranslation('staking');

  return (
    <Box sx={styles.container}>
      <Box sx={styles.labelContainer}>
        <Typography sx={styles.labelText}>{validatorLabel}</Typography>
        <RedelegateValidatorLink
          avatar={validator.image}
          name={validator.name}
          blockexplorerURL={BlockExplorerUtils.createValidatorURL({
            chainID,
            validatorAddr: validator.address,
          })}
        />
      </Box>

      <Box sx={styles.spacer} />

      <Box sx={styles.amountContainer}>
        <Typography sx={styles.labelText}>{t('amount')}</Typography>

        <AmountInput
          amount={delegationAmount}
          denomSymbol={tokenDenom}
          handleAmountChanged={handleAmountChange}
          percent={percent}
          handlePercentChanged={handlePercentChanged}
          handleSliderChanged={handleSliderChanged}
        />
      </Box>
    </Box>
  );
};

export default DelegationInput;

import React from 'react';
import { formatCoins } from 'misc/utils';
import { useTranslation } from 'react-i18next';
import { Box, IconButton, Slider, TextField, Typography } from '@mui/material';
import IconCross from 'components/svg/IconCross';
import IconEditGas from 'components/svg/IconEditGas';
import StringUtils from 'lib/StringUtils';
import styles from './styles';

type Props = {
  chainID: string;

  estimatedGas: {
    amount: { amount: string; denom: string }[];
    gas: string;
  };

  estimateGasLoading: boolean;

  gasFee: {
    amount: {
      amount: string;
      denom: string;
    }[];
    gas: string;
  };

  onGasChanged: (number) => void;
};

/**
 * A component that allows the user to see, and change the gas for a given transaction.
 * This is done by invoking the onGasChanged callback, which should be passed in from a parent
 * component. The parent component should keep track of the state of the actual gas value.
 *
 * The maximum gas is capped at x2 the original estimated gas, which can be calculated using the
 * useGasEstimation hook.
 */
const GasEstimation = ({
  estimateGasLoading,
  estimatedGas,
  chainID,
  onGasChanged,
  gasFee,
}: Props) => {
  const { t } = useTranslation('confirmTx');
  const [isEditGas, setIsEditGas] = React.useState(false);

  const onChange = React.useCallback(
    (newGas: number) => {
      onGasChanged(newGas);
    },
    [gasFee]
  );

  return (
    <>
      <Box sx={styles.container}>
        <Typography>{t('fee')}</Typography>

        <Box sx={styles.innerContainer}>
          <Typography sx={styles.feeText}>
            {estimateGasLoading ? t('estimatingGas') : formatCoins(chainID, gasFee.amount)}
          </Typography>

          <IconButton
            onClick={() => {
              setIsEditGas((prev) => !prev);
            }}
          >
            {isEditGas ? <IconCross /> : <IconEditGas />}
          </IconButton>
        </Box>
      </Box>
      {isEditGas && (
        <>
          <TextField
            sx={styles.textField}
            InputProps={{
              disableUnderline: true,
            }}
            fullWidth
            variant="standard"
            value={gasFee.gas}
            onChange={(event) => {
              onGasChanged(StringUtils.RemoveNonNumbers(event.target.value));
            }}
          />

          <Box px={1}>
            <Slider
              value={Number(gasFee.gas) / Number(estimatedGas.gas)}
              onChange={(e, v: number) => {
                onChange(Number(estimatedGas.gas) * v);
              }}
              min={1}
              max={2}
              step={0.01}
            />
          </Box>
        </>
      )}
    </>
  );
};

export default GasEstimation;

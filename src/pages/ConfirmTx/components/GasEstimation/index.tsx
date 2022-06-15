import React from 'react';
import { formatCoins } from 'misc/utils';
import { useTranslation } from 'react-i18next';
import { Box, IconButton, Slider, TextField, Typography } from '@mui/material';
import IconCross from 'components/svg/IconCross';
import IconEditGas from 'components/svg/IconEditGas';
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
              onGasChanged(event.target.value.replace(/[^0-9]+/g, ''));
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

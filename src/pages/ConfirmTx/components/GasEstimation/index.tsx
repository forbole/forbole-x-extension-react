import React from 'react';
import { formatCoins } from 'misc/utils';
import useGasEstimation from 'hooks/useGasEstimation';
import { useTranslation } from 'react-i18next';
import { Box, IconButton, Slider, TextField, Typography } from '@mui/material';
import IconCross from 'components/svg/IconCross';
import IconEditGas from 'components/svg/IconEditGas';

type Props = {
  chainID: string;

  gasFee: {
    amount: {
      amount: string;
      denom: string;
    }[];
    gas: string;
  };

  onGasChanged: (number) => void;
};

const GasEstimation = ({ chainID, onGasChanged, gasFee }: Props) => {
  const { t } = useTranslation('confirmtx');
  const [isEditGas, setIsEditGas] = React.useState(false);

  const { estimatedGas, loading } = useGasEstimation();

  React.useEffect(() => {
    if (!loading) onGasChanged(estimatedGas.gas);
  }, [loading]);

  const onChange = React.useCallback(
    (newGas: number) => {
      onGasChanged(newGas);
    },
    [gasFee]
  );

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Typography>{t('fee')}</Typography>

        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <Typography
            sx={{
              color: 'text.secondary',
            }}
          >
            {loading ? t('estimatingGas') : formatCoins(chainID, gasFee.amount)}
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
            sx={{
              padding: (theme) => `${theme.spacing(0.5)} ${theme.spacing(1)}`,
              borderRadius: 1,
              backgroundColor: 'background.paper',
            }}
            InputProps={{
              disableUnderline: true,
            }}
            fullWidth
            variant="standard"
            value={gasFee.gas}
            onChange={(event) => {
              onGasChanged(event.target.value.replace(/(s, "[^0-9.]", "")/g, ''));
            }}
          />

          <Box px={1}>
            <Slider
              value={Number(gasFee.gas) / estimatedGas.gas}
              onChange={(e, v: number) => {
                onChange(estimatedGas.gas * v);
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

import React from 'react';
import { Box, Card, InputAdornment, Slider, TextField } from '@mui/material';
import styles from './styles';

type Props = {
  /**
   * The amount that the user has selected.
   */
  amount: number;

  /**
   * The denomination of the coin/token being manipulated.
   */
  denomSymbol: string;

  /**
   * The percent of the maximum stakingable value.
   */
  percent: number;

  /**
   * Callback when the amount input is changed.
   */
  handleAmountChanged: (event: any) => void;

  /**
   * Callback when the percent input is changed.
   */
  handlePercentChanged: (event: any) => void;

  /**
   * Callback when the percent slider is changed.
   */
  handleSliderChanged: (event: any, newValue: any) => void;
};

/**
 * A component that provides the UI and inputs for the user to see and set the amount of
 * currency for delegation purposes.
 */
const AmountInput = ({
  handleAmountChanged,
  handlePercentChanged,
  handleSliderChanged,
  amount,
  percent,
  denomSymbol,
}: Props) => {
  const [showSlider, setShowSlider] = React.useState(false);

  return (
    <Box>
      <Box display="flex">
        <TextField
          sx={styles.amountInput}
          fullWidth
          variant="filled"
          placeholder="0"
          type="number"
          InputProps={{
            disableUnderline: true,
            endAdornment: <InputAdornment position="end">{denomSymbol}</InputAdornment>,
          }}
          value={amount}
          onChange={handleAmountChanged}
        />

        <TextField
          onFocus={() => {
            setShowSlider(true);
            const closeSlider = (e) => {
              if (!e.target.className.includes('MuiSlider')) {
                window.removeEventListener('click', closeSlider);
                setShowSlider(false);
              }
            };
            setTimeout(() => window.addEventListener('click', closeSlider), 100);
          }}
          sx={styles.percentInput}
          variant="filled"
          placeholder="0"
          type="number"
          InputProps={{
            disableUnderline: true,
            endAdornment: <InputAdornment position="end">%</InputAdornment>,
          }}
          // eslint-disable-next-line react/jsx-no-duplicate-props
          value={percent}
          onChange={handlePercentChanged}
        />
      </Box>

      {showSlider && (
        <Card sx={styles.sliderCard}>
          <Slider
            value={percent / 100}
            defaultValue={1}
            aria-labelledby="input-slider"
            step={0.1}
            marks
            min={0}
            max={1}
            onChange={handleSliderChanged}
          />
        </Card>
      )}
    </Box>
  );
};

export default AmountInput;

import React from 'react';
import { Box, Typography } from '@mui/material';

type Props = {
  amount: number;

  symbol: string;

  currencyValue: number;

  currency: string;
};

/**
 * A component that renders a given amount of token/coin as well as its equivalent value
 * in the specified currency
 */
const CoinCurrency = ({ amount, symbol, currencyValue, currency }: Props) => {
  return (
    <Box>
      <Typography variant="h3">
        {amount} {symbol}
      </Typography>
      <Typography variant="body1">
        {`$${(amount * currencyValue).toFixed(2)} ${currency}`}
      </Typography>
    </Box>
  );
};

export default CoinCurrency;

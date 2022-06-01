import React from 'react';
import { Box, Grid, Typography } from '@mui/material';
import { format } from 'date-fns';
import TxhashLink from './TxhashLink';
import useHooks from './useHooks';

type Props = {
  txhash: string;

  // height: string;

  timestamp: string;

  type: string;

  // code: number;

  detail: any;

  extraData: any;

  account: Account;
};

/**
 * A component that renders an individual transaction from a user's transaction history.
 * Due note that each message for transactions (such as delegation and reward withdrawal), is treated
 * as a individual transaction in forbole x.
 */
const TransactionRow = ({ txhash, timestamp, detail, type, extraData, account }: Props) => {
  const { content } = useHooks({
    detail,
    account,
    type,
    extraData,
  });

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        padding: 2,
      }}
    >
      <TxhashLink txhash={txhash} chainID={account.chain} />
      <Grid container>
        <Grid xs={1.5}>{content?.icon}</Grid>
        <Grid
          sx={{
            display: 'flex',
            flexDirection: 'column',
          }}
          xs={10.5}
        >
          <Typography
            sx={{
              color: 'text.primary',
            }}
            variant="body6"
          >
            {content?.title}
          </Typography>

          <Typography
            sx={{
              color: 'text.secondary',
              marginTop: 1,
            }}
            variant="body6"
          >
            {content?.description}
          </Typography>

          <Typography
            variant="body6"
            sx={{
              marginTop: 1,
              color: 'text.secondary',
            }}
          >
            {format(new Date(timestamp), 'dd MMM, HH:mm')}
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

export default TransactionRow;

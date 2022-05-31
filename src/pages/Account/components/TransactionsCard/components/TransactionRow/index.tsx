import React from 'react';
import { Box, Grid, Paper, Typography } from '@mui/material';
import { format } from 'date-fns';
import useHooks from './useHooks';

type Props = {
  txhash: string;
  //
  // height: string;

  timestamp: string;

  type: string;

  // code: number;

  detail: any;

  chainID: string;

  extraData: any;
};

/**
 * A component that renders an individual transaction from a user's transaction history.
 * Due note that each message for transactions (such as delegation and reward withdrawal), is treated
 * as a individual transaction in forbole x.
 */
const TransactionRow = ({ txhash, timestamp, detail, chainID, type, extraData }: Props) => {
  const { content } = useHooks({
    txhash,
    detail,
    chainID,
    type,
    extraData,
  });

  return (
    <Paper>
      <Grid
        sx={{
          padding: 2,
        }}
        container
      >
        <Grid xs={1.5}>{content?.icon}</Grid>
        <Grid xs={10.5}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            {content?.title}
            {content?.description}
            <Typography
              variant="body6"
              sx={{
                color: 'text.secondary',
              }}
            >
              {format(new Date(timestamp), 'dd MMM, HH:mm')}
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default TransactionRow;

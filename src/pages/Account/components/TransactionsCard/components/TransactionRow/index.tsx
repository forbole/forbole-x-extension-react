import React from 'react';
import { Box, Grid, Typography } from '@mui/material';
import { format } from 'date-fns';
import TxhashLink from './components/TxhashLink';
import useHooks from './useHooks';
import styles from './styles';

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

  const { container, contentCell, titleText, contentText } = styles;

  return (
    <Box sx={container}>
      <TxhashLink txhash={txhash} chainID={account.chain} />
      <Grid container>
        <Grid item xs={1.5}>
          {content?.icon}
        </Grid>
        <Grid item sx={contentCell} xs={10.5}>
          <Typography sx={titleText} variant="body6">
            {content?.title}
          </Typography>

          <Typography sx={contentText} variant="body6">
            {content?.description}
          </Typography>

          <Typography sx={contentText} variant="body6">
            {format(new Date(timestamp), 'dd MMM, HH:mm')}
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

export default TransactionRow;

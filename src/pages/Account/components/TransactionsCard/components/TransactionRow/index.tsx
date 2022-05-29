import React from 'react';
import { Box, Grid, Paper, Typography } from '@mui/material';
import IconDelegateTx from 'components/svg/IconDelegateTx';
import { useTranslation } from 'react-i18next';
import { formatCoin } from 'misc/utils';
import { format } from 'date-fns';

type Props = {
  // txhash: string;
  //
  // height: string;

  timestamp: string;

  type: string;

  // code: number;

  detail: any;

  chainID: string;
};

const TransactionRow = ({ timestamp, type, detail, chainID }: Props) => {
  const { t } = useTranslation('account');

  const content = React.useMemo(() => {
    if (type.includes('MsgVote')) {
      return {
        title: t('transactions.rows.voteProposal', {
          proposalNum: detail.proposal_id,
          choice: t(`transactions.rows.${detail.option}`),
        }),
        description: t('transactions.rows.proposeBy', {
          user: 'TODO',
        }),
      };
    }
    if (type.includes('MsgSend'))
      return {
        title: t('transactions.rows.send', {
          amount: formatCoin(chainID, detail.amount[0]),
        }),
        description: t('transactions.rows.toUser', {
          user: detail.to_address,
        }),
      };
    if (type.includes('MsgUndelegate'))
      return {
        title: t('transactions.rows.undelegate', {
          amount: formatCoin(chainID, detail.amount),
        }),
        description: t('transactions.rows.fromUser', {
          user: detail.validator_address,
        }),
      };
    return {
      title: 'hello',
      description: 'world',
    };
  }, [detail]);

  return (
    <Paper>
      <Grid
        sx={{
          padding: 2,
        }}
        container
      >
        <Grid xs={1.5}>
          <IconDelegateTx />
        </Grid>
        <Grid xs={10.5}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <Typography
              sx={{
                color: 'text.primary',
              }}
              variant="body1"
            >
              {content.title}
            </Typography>
            <Typography
              sx={{
                marginBottom: 2,
                color: 'text.secondary',
              }}
              variant="body6"
            >
              {content.description}
            </Typography>
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

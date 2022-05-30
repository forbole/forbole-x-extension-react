import React from 'react';
import { Box, Grid, Paper, Typography } from '@mui/material';
import IconDelegateTx from 'components/svg/IconDelegateTx';
import { useTranslation } from 'react-i18next';
import { formatCoin } from 'misc/utils';
import { format } from 'date-fns';
import IconSendTx from 'components/svg/IconSendTx';
import IconTx from 'components/svg/IconTx';

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

/**
 * A component that renders an individual transaction from a user's transaction history.
 * Due note that each message for transactions (such as delegation and reward withdrawal), is treated
 * as a individual transaction in forbole x.
 */
const TransactionRow = ({ timestamp, type, detail, chainID }: Props) => {
  const { t } = useTranslation('account');

  const content = React.useMemo(() => {
    if (type.includes('MsgVote')) {
      return {
        title: t('transactions.rows.voteProposal', {
          proposalNum: detail[0].proposal_id,
          choice: t(`transactions.rows.${detail[0].option}`),
        }),
        description: t('transactions.rows.proposeBy', {
          user: 'TODO',
        }),
        icon: <IconDelegateTx />,
      };
    }
    if (type.includes('MsgBeginRedelegate')) {
      return {
        title: t('transactions.rows.redelegate', {
          amount: formatCoin(chainID, detail[0].amount),
        }),
        description: t('transactions.rows.fromToUser', {
          userA: detail[0].validator_src_address,
          userB: detail[0].validator_dst_address,
        }),
        icon: <IconDelegateTx />,
      };
    }
    if (type.includes('MsgSend'))
      return {
        title: t('transactions.rows.send', {
          amount: formatCoin(chainID, detail[0].amount[0]),
        }),
        description: t('transactions.rows.toUser', {
          user: detail[0].to_address,
        }),
        icon: <IconTx />,
      };
    if (type.includes('MsgSetWithdrawAddress')) {
      return {
        title: t('transactions.rows.setWithdrawAddr'),
        description: t('transactions.rows.toAddr', { addr: detail[0].withdraw_address }),
        icon: <IconDelegateTx />,
      };
    }
    if (type.includes('MsgUndelegate')) {
      return {
        title: t('transactions.rows.undelegate', {
          amount: formatCoin(chainID, detail[0].amount),
        }),
        description: t('transactions.rows.fromUser', {
          user: detail[0].validator_address,
        }),
        icon: <IconDelegateTx />,
      };
    }
    if (type.includes('MsgUnjail'))
      return {
        title: t('transactions.rows.userUnjailed', {
          user: detail[0].validator_addr,
        }),
        description: t('transactions.rows.unjailed', {
          user: detail[0].validator_address,
        }),
        icon: <IconDelegateTx />,
      };
    // The format of these transactions is different in that detail is not an array
    if (type.includes('MsgWithdrawDelegatorReward'))
      return {
        title: t('transactions.rows.withdrawAmount', {
          amount: formatCoin(chainID, detail.amount),
        }),
        description: t('transactions.rows.fromUser', {
          user: detail.validator_address,
        }),
        icon: <IconTx />,
      };
    if (type.includes('MsgDelegate'))
      return {
        title: t('transactions.rows.delegateAmount', {
          amount: formatCoin(chainID, detail.amount),
        }),
        description: t('transactions.rows.toUser', {
          user: detail.validator_address,
        }),
        icon: <IconTx />,
      };
    return {
      title: '',
      description: '',
      icon: <IconSendTx />,
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
        <Grid xs={1.5}>{content.icon}</Grid>
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

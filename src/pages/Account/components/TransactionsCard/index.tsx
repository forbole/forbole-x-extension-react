import React from 'react';
import { Box, Card, CircularProgress, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import useTxForAddress from 'hooks/useTxForAddress';
import FormatUtils from 'lib/FormatUtils';
import TransactionRow from 'pages/Account/components/TransactionsCard/components/TransactionRow';
import TabButton from './components/TabButton';

type Props = {
  /**
   * The current account
   */
  account: Account;
};

const TransactionsCard = ({ account }: Props) => {
  const { t } = useTranslation('account');

  const [filterType, setFilterType] = React.useState(0);

  const { txData, error, loading } = useTxForAddress({
    address: account.address,
    chain: account.chain,
  });

  const activities = React.useMemo(() => {
    if (txData.length > 0) return FormatUtils.formatTx(txData);
    return [];
  }, [txData]);

  const filters = React.useMemo(() => {
    return [
      {
        label: t('transactions.tabs.all', {
          count: activities.length,
        }),
      },
      {
        label: t('transactions.tabs.transfer', {
          count: activities.filter((x) => x?.type.includes('bank')).length,
        }),
      },
      {
        label: t('transactions.tabs.staking', {
          count: activities.filter((x) => x?.type.includes('staking')).length,
        }),
      },
      {
        label: t('transactions.tabs.distribution', {
          count: activities.filter((x) => x?.type.includes('distribution')).length,
        }),
      },
      {
        label: t('transactions.tabs.governance', {
          count: activities.filter((x) => x?.type.includes('gov')).length,
        }),
      },
      {
        label: t('transactions.tabs.slashing', {
          count: activities.filter((x) => x?.type.includes('slashing')).length,
        }),
      },
    ];
  }, [activities]);

  if (error)
    return (
      <Card
        sx={(theme) => ({
          margin: `${theme.spacing(1)} ${theme.spacing(2.5)}`,
          borderRadius: 2,
        })}
      >
        <Typography>An error has occurred</Typography>
      </Card>
    );

  if (loading) {
    return (
      <Card
        sx={(theme) => ({
          margin: `${theme.spacing(1)} ${theme.spacing(2.5)}`,
          borderRadius: 2,
          display: 'flex',
          alignItems: 'center',
        })}
      >
        <CircularProgress />
      </Card>
    );
  }

  return (
    <Card
      sx={(theme) => ({
        margin: `${theme.spacing(1)} ${theme.spacing(2.5)}`,
        borderRadius: 2,
      })}
    >
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
        }}
      >
        {filters.map((x, idx) => (
          <TabButton
            isSelected={idx === filterType}
            label={x.label}
            onClick={() => setFilterType(idx)}
          />
        ))}
      </Box>
      <Box>
        {activities.map((activity) => (
          <TransactionRow {...activity} chainID={account.chain} />
        ))}
      </Box>
    </Card>
  );
};

export default TransactionsCard;

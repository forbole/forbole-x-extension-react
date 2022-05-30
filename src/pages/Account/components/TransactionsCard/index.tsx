import React from 'react';
import { Box, Card, CircularProgress, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import useTxForAddress from 'hooks/useTxForAddress';
import FormatUtils from 'lib/FormatUtils';
import TransactionRow from 'pages/Account/components/TransactionsCard/components/TransactionRow';
import TransactionDateSeparator from 'pages/Account/components/TransactionsCard/components/TransactionDateSeparator';
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

  const transactions = React.useMemo(() => {
    if (txData.length > 0) return FormatUtils.formatTx(txData);
    return [];
  }, [txData]);

  const filters = React.useMemo(() => {
    return [
      {
        label: t('transactions.tabs.all', {
          count: transactions.length,
        }),
      },
      {
        label: t('transactions.tabs.transfer', {
          count: transactions.filter((x) => x?.type.includes('bank')).length,
        }),
      },
      {
        label: t('transactions.tabs.staking', {
          count: transactions.filter((x) => x?.type.includes('staking')).length,
        }),
      },
      {
        label: t('transactions.tabs.distribution', {
          count: transactions.filter((x) => x?.type.includes('distribution')).length,
        }),
      },
      {
        label: t('transactions.tabs.governance', {
          count: transactions.filter((x) => x?.type.includes('gov')).length,
        }),
      },
      {
        label: t('transactions.tabs.slashing', {
          count: transactions.filter((x) => x?.type.includes('slashing')).length,
        }),
      },
    ];
  }, [transactions]);

  const filteredAndOrganizedTx = React.useMemo(() => {
    const filterArr = ['', 'bank', 'staking', 'distribution', 'gov', 'slashing'];

    if (filterType === 0) {
      return FormatUtils.organizeIntoDates(transactions);
    }
    return FormatUtils.organizeIntoDates(
      transactions.filter((tx) => tx.type.includes(filterArr[filterType]))
    );
  }, [transactions, filterType]);

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
            key={x.label}
            isSelected={idx === filterType}
            label={x.label}
            onClick={() => setFilterType(idx)}
          />
        ))}
      </Box>
      <Box>
        {Object.keys(filteredAndOrganizedTx).map((key) => (
          <>
            <TransactionDateSeparator daysFromPresent={Number(key)} />
            {filteredAndOrganizedTx[key].map((tx) => (
              <TransactionRow key={tx.uuid} {...tx} chainID={account.chain} />
            ))}
          </>
        ))}
      </Box>
    </Card>
  );
};

export default TransactionsCard;

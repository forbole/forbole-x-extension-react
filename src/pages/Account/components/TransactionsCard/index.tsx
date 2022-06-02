import React from 'react';
import { Box, Card, CircularProgress } from '@mui/material';
import { Loadable, useRecoilValue } from 'recoil';
import TransactionRow from './components/TransactionRow';
import TransactionDateSeparator from './components/TransactionDateSeparator';
import TabButton from './components/TabButton';
import './styles.css';
import styles from './styles';
import { themeState } from '../../../../recoil/general';
import useHooks from './useHooks';

type Props = {
  /**
   * The current account
   */
  account: Loadable<Account>;

  /**
   * Validators
   */
  validators: Loadable<Validator[]>;
};

const TransactionsCard = ({ account, validators }: Props) => {
  const theme = useRecoilValue(themeState);

  const {
    loading,
    filters,
    filterType,
    setFilterType,
    scrollRef,
    onScroll,
    filteredAndOrganizedTx,
    // false positive
    // @ts-ignore
  } = useHooks({ account, validators });

  if (loading || account.state !== 'hasValue') {
    return (
      <Card sx={styles.loadingContainer}>
        <CircularProgress />
      </Card>
    );
  }

  return (
    <Card sx={styles.container}>
      <Box sx={styles.tabsContainer}>
        {filters.map((x, idx) => (
          <TabButton
            key={x.label}
            isSelected={idx === filterType}
            label={x.label}
            onClick={() => setFilterType(idx)}
          />
        ))}
      </Box>
      <Box sx={styles.transactionCardScrollView} ref={scrollRef} onScroll={onScroll}>
        {Object.keys(filteredAndOrganizedTx).map((key) => (
          <>
            {filteredAndOrganizedTx[key].map((tx, idx) => (
              <Box key={tx.uuid} className={`TransactionCard-${theme}`}>
                {idx === 0 && <TransactionDateSeparator daysFromPresent={Number(key)} />}
                <TransactionRow {...tx} account={account.contents} />
              </Box>
            ))}
          </>
        ))}
      </Box>
    </Card>
  );
};

export default TransactionsCard;

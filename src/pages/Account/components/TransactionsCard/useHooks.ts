import React from 'react';
import useBottomScroll from 'hooks/useBottomScroll';
import useTxForAddress from 'hooks/useTxForAddress';
import FormatUtils from 'lib/FormatUtils';
import { Loadable } from 'recoil';
import { Account } from '@cosmjs/stargate';
import { useTranslation } from 'react-i18next';

const INITIAL_TXS_TO_SHOW = 10;

const TXS_PER_STEP = 3;

/**
 * Hooks for the TransactionsCard component
 */
const useHooks = ({
  account,
  validators,
}: {
  account: Loadable<Account>;
  validators: Loadable<Validator[]>;
}) => {
  const { t } = useTranslation('account');

  const [filterType, setFilterType] = React.useState(0);

  const [txsToShow, setTxsToShow] = React.useState(INITIAL_TXS_TO_SHOW);

  const scrollToBottomCallback = () => {
    const newTxLength = Math.min(txData.length, txsToShow + TXS_PER_STEP);
    setTxsToShow(newTxLength);
  };

  // @ts-ignore
  const { scrollRef, onScroll } = useBottomScroll(scrollToBottomCallback);

  const { txData, loading } = useTxForAddress({
    address: account?.contents?.address,
    chain: account?.contents?.chain,
  });

  const transactions = React.useMemo(() => {
    if (txData.length > 0 && validators.state === 'hasValue') {
      return FormatUtils.formatTx(txData, validators.contents);
    }
    return [];
  }, [txData, validators.state]);

  /**
   * Count the amount of transactions by type while building the tab buttons
   */
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

  /**
   * for infinite scroll
   */
  const truncatedTx = React.useMemo(() => {
    const txs = [...transactions];
    txs.length = txsToShow;
    return txs;
  }, [txsToShow, transactions]);

  /**
   * Format full transaction list by further separating based on date
   */
  const filteredAndOrganizedTx = React.useMemo(() => {
    const filterArr = ['', 'bank', 'staking', 'distribution', 'gov', 'slashing'];

    if (filterType === 0) {
      return FormatUtils.organizeIntoDates(truncatedTx);
    }
    return FormatUtils.organizeIntoDates(
      truncatedTx.filter((tx) => tx.type.includes(filterArr[filterType]))
    );
  }, [truncatedTx, filterType]);

  return {
    loading,
    filters,
    filterType,
    setFilterType,
    scrollRef,
    onScroll,
    filteredAndOrganizedTx,
  };
};

export default useHooks;

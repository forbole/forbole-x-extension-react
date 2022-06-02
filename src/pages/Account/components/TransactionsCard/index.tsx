import React from 'react';
import { Box, Card, CircularProgress } from '@mui/material';
import { useTranslation } from 'react-i18next';
import useTxForAddress from 'hooks/useTxForAddress';
import FormatUtils from 'lib/FormatUtils';
import { Loadable, useRecoilValue } from 'recoil';
import useBottomScroll from 'hooks/useBottomScroll';
import TransactionRow from './components/TransactionRow';
import TransactionDateSeparator from './components/TransactionDateSeparator';
import TabButton from './components/TabButton';
import './styles.css';
import { themeState } from '../../../../recoil/general';

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

const INITIAL_TXS_TO_SHOW = 10;

const TXS_PER_STEP = 3;

const TransactionsCard = ({ account, validators }: Props) => {
  const { t } = useTranslation('account');
  const theme = useRecoilValue(themeState);
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

  const truncatedTx = React.useMemo(() => {
    const txs = [...transactions];
    txs.length = txsToShow;
    return txs;
  }, [txsToShow, transactions]);

  const filteredAndOrganizedTx = React.useMemo(() => {
    const filterArr = ['', 'bank', 'staking', 'distribution', 'gov', 'slashing'];

    if (filterType === 0) {
      return FormatUtils.organizeIntoDates(truncatedTx);
    }
    return FormatUtils.organizeIntoDates(
      truncatedTx.filter((tx) => tx.type.includes(filterArr[filterType]))
    );
  }, [truncatedTx, filterType]);

  if (loading || account.state !== 'hasValue') {
    return (
      <Card
        sx={(_theme) => ({
          margin: `${_theme.spacing(1)} ${_theme.spacing(2.5)}`,
          borderRadius: 2,
          display: 'flex',
          justifyContent: 'center',
        })}
      >
        <CircularProgress />
      </Card>
    );
  }

  return (
    <Card
      sx={(_theme) => ({
        margin: `${_theme.spacing(1)} ${_theme.spacing(2.5)}`,
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
      <Box
        sx={{
          maxHeight: '400px',
          overflowY: 'scroll',
        }}
        ref={scrollRef}
        onScroll={onScroll}
      >
        {Object.keys(filteredAndOrganizedTx).map((key) => (
          <>
            {filteredAndOrganizedTx[key].map((tx, idx) => (
              <Box className={`TransactionCard-${theme}`}>
                {idx === 0 && <TransactionDateSeparator daysFromPresent={Number(key)} />}
                <TransactionRow key={tx.uuid} {...tx} account={account.contents} />
              </Box>
            ))}
          </>
        ))}
      </Box>
    </Card>
  );
};

export default TransactionsCard;

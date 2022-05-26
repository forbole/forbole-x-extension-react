import React from 'react';
import { Box, Card } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Loadable } from 'recoil';
import _ from 'lodash';
import TabButton from './components/TabButton';

type Props = {
  /**
   * The current account
   */
  account: Loadable<Account>;

  /**
   * Validator for the crypto
   */
  validators: Loadable<Validator[]>;
};

const TransactionsCard = ({ account, validators }: Props) => {
  const [filterType, setFilterType] = React.useState(0);
  const { t } = useTranslation('account');

  const validatorsMap = React.useMemo(() => {
    return _.keyBy(validators, 'address');
  }, [validators]);

  const activities = [];

  const filters = React.useMemo(() => {
    return [
      {
        label: t('transactions.tabs.all', {
          count: activities.length,
        }),
      },
      {
        label: t('transactions.tabs.transfer', {
          count: activities.filter((x) => x.tab === 'transfer').length,
        }),
      },
      {
        label: t('transactions.tabs.staking', {
          count: activities.filter((x) => x.tab === 'staking').length,
        }),
      },
      {
        label: t('transactions.tabs.distribution', {
          count: activities.filter((x) => x.tab === 'distribution').length,
        }),
      },
      {
        label: t('transactions.tabs.governance', {
          count: activities.filter((x) => x.tab === 'governance').length,
        }),
      },
      {
        label: t('transactions.tabs.slashing', {
          count: activities.filter((x) => x.tab === 'slashing').length,
        }),
      },
    ];
  }, []);

  // if (loading) {
  //   return (
  //     <Card
  //       sx={(theme) => ({
  //         margin: `${theme.spacing(1)} ${theme.spacing(2.5)}`,
  //         borderRadius: 2,
  //         display: 'flex',
  //         alignItems: 'center',
  //       })}
  //     >
  //       <CircularProgress />
  //     </Card>
  //   );
  // }

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
      {/* <TablePagination */}
      {/*  page={page} */}
      {/*  rowsPerPage={rowsPerPage} */}
      {/*  rowsCount={tabs[currentTab].rows.length} */}
      {/*  onPageChange={setPage} */}
      {/*  onRowsPerPageChange={setRowsPerPage} */}
      {/* /> */}
    </Card>
  );
};

export default TransactionsCard;

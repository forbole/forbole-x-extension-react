import React from 'react'
import { Box, Card } from '@mui/material'
import { useTranslation } from 'react-i18next'
import TabButton from './components/TabButton'

const TransactionsCard = () => {
  const [filterType, setFilterType] = React.useState(0)
  const { t } = useTranslation('account')

  const filters = React.useMemo(
    () => [
      {
        label: t('transactions.tabs.all', {
          count: 1,
        }),
      },
      {
        label: t('transactions.tabs.transfer', {
          count: 1,
        }),
      },
      {
        label: t('transactions.tabs.staking', {
          count: 1,
        }),
      },
      {
        label: t('transactions.tabs.distribution', {
          count: 1,
        }),
      },
      {
        label: t('transactions.tabs.governance', {
          count: 1,
        }),
      },
      {
        label: t('transactions.tabs.slashing', {
          count: 1,
        }),
      },
    ],
    []
  )

  return (
    <Card
      sx={(theme) => ({
        margin: `${theme.spacing(1)} ${theme.spacing(2.5)}`,
        borderRadius: 2,
      })}
    >
      <Box>
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
  )
}

export default TransactionsCard

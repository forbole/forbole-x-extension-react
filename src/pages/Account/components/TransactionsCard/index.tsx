import React from 'react'
import { Card, Tab, Tabs } from '@mui/material'
import { useTranslation } from 'react-i18next'

const TransactionsCard = () => {
  const [currentTab, setCurrentTab] = React.useState(0)
  const { t } = useTranslation('account')

  const tabs = React.useMemo(
    () => [
      {
        label: t('transactions.tabs.all', {
          count: 1,
        }),
      },
      {
        label: t('transactions.tabs.transfer'),
      },
      {
        label: t('transactions.tabs.staking'),
      },
      {
        label: t('transactions.tabs.distribution'),
      },
      {
        label: t('transactions.tabs.governance'),
      },
      {
        label: t('transactions.tabs.slashing'),
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
      <Tabs
        value={currentTab}
        sx={{
          indicator: {
            color: 'white',
            width: '8px',
          },
        }}
        onChange={(e, v) => setCurrentTab(v)}
        variant="scrollable"
      >
        {tabs.map((tab) => (
          <Tab key={tab.label} label={tab.label} />
        ))}
      </Tabs>
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

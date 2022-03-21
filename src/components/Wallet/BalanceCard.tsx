import React, { useMemo } from 'react'
import { PieChart, Pie, Cell } from 'recharts'
import { Loadable } from 'recoil'
import { ReactComponent as ArrowDownIcon } from '../../assets/images/icons/icon_arrow_down.svg'
import get from 'lodash/get'
import { formatCoins, formatCurrency, sumCoinsValues } from '../../misc/utils'

type Props = {
  account?: Loadable<AccountDetail>
}

const BalanceCard = ({ account }: Props) => {
  const colors = [
    { name: 'available', color: '#007FFF' },
    { name: 'delegated', color: '#6ED588' },
    { name: 'unbonding', color: '#F4B65A' },
    { name: 'rewards', color: '#DB39F5' },
    { name: 'commissions', color: '#FF7448' },
  ]

  const data = useMemo(() => {
    if (account.state !== 'hasValue') {
      return []
    }

    console.log(account)
    return Object.keys(account?.contents?.balances)
      .filter(
        (k) =>
          (k !== 'commissions' && k !== 'total') ||
          get(account, `balance.${k}.${account.contents?.chain}.amount`, 0) > 0
      )
      .map((k, i) => ({
        name: k,
        value: parseInt(get(account.contents, `balances.${k}.0.amount`, 0)),
      }))
  }, [account])

  return (
    <div className="mx-5 p-6 rounded-xl bg-popup-100">
      <div className="flex justify-between items-end">
        <h3>Balance</h3>
        <div className="flex text-icon-light dark:text-icon-dark space-x-1">
          <p>Vesting</p>
          <ArrowDownIcon />
        </div>
      </div>
      <div className="flex space-x-3 py-6">
        <PieChart width={144} height={144}>
          <Pie data={data} innerRadius={60} outerRadius={60} paddingAngle={12} dataKey="value">
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                stroke={colors.find((c) => c.name === entry.name).color}
                strokeLinejoin="round"
                strokeWidth={10}
              />
            ))}
          </Pie>
        </PieChart>
        <div className="w-full space-y-1">
          {data.map((e, index) => (
            <div className="flex w-full justify-between items-center" key={index}>
              <div className="flex items-center space-x-2">
                <div
                  className={`rounded-sm h-3 w-3`}
                  style={{ backgroundColor: colors.find((c) => c.name === e.name).color }}
                />
                <p>{e.name}</p>
              </div>
              <p className="self-end">
                {account.state === 'hasValue' &&
                  formatCoins(account.contents.chain, account.contents.balances[e.name], true)}
              </p>
            </div>
          ))}
        </div>
      </div>
      <div>
        <div className="w-full h-px bg-black bg-opacity-20 mb-6" />
        <div className="flex justify-between">
          <h2>Total balance</h2>
          <h2>
            {' '}
            {account.state === 'hasValue' &&
              formatCoins(account.contents.chain, account.contents.balances.total)}
          </h2>
        </div>
        <div className="flex justify-between">
          {account.state === 'hasValue' && (
            <p>
              ${account.contents?.prices[0].price} / {account.contents?.prices[0].token.symbol}
            </p>
          )}
          <p>
            {account.state === 'hasValue' &&
              formatCurrency(
                sumCoinsValues(account.contents.balances.total, account.contents.prices)
              )}
          </p>
        </div>
      </div>
    </div>
  )
}

export default BalanceCard

import chains from '../../misc/chains'
import { formatCoins, formatCurrency, sumCoinsValues } from '../../misc/utils'

interface Props {
  account: AccountDetail
}

const AccountStatCard = ({ account }: Props) => {
  return (
    <div className="bg-popup-100 p-6 rounded-md">
      <div className="w-full flex space-x-3 mb-3">
        <img src={chains[account.chain]?.image} className="w-12 h-12" alt={account.chain} />
        <div>
          <h4>{account.name}</h4>
          <p className="text-font-200 text-xs">{account.address}</p>
        </div>
      </div>
      <div className="divide-y divide-divider-100">
        <div className="mb-3">
          <h3>{formatCoins(account.chain, account.balances.total)}</h3>
          <p>{formatCurrency(sumCoinsValues(account.balances.total, account.prices))}</p>
        </div>
        <div className="flex space-x-10 pt-3">
          <div>
            <p className="text-font-200 text-sm">Pending Rewards</p>
            <h4>{formatCoins(account.chain, account.balances.rewards)}</h4>
          </div>
          <div>
            <p className="text-font-200 text-sm">Delegate (41% Inflation)</p>
            <h4>{formatCoins(account.chain, account.balances.delegated)}</h4>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AccountStatCard

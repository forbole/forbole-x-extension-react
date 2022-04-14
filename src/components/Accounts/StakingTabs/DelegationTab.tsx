import { formatCoin, formatCoins, formatPercentage } from '../../../misc/utils'
import Avatar from '../../Element/avatar'

interface Props {
  chain: Chain
  delegations: Delegation[]
  validatorsMap: { [address: string]: Validator }
}

const DelegationCard = ({
  chain,
  delegation,
  validator,
}: {
  chain: Chain
  delegation: Delegation
  validator?: Validator
}) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Avatar size={9} src={validator?.image} />
          <div className="ml-2">
            <h4 className="text-primary-100 leading-none">{validator?.name}</h4>
            <p>Commission: {formatPercentage(validator?.commission)}</p>
          </div>
        </div>
        <button className="bg-primary-100 rounded-md px-4 py-2 text-white nightwind-prevent hover:opacity-80">
          Manage
        </button>
      </div>
      <div>
        <div className="flex justify-between">
          <p>Delegated</p>
          <p>{formatCoin(chain.chainId, delegation.balance)}</p>
        </div>
        <div className="flex justify-between">
          <p>Rewards</p>
          <p>{formatCoins(chain.chainId, delegation.rewards)}</p>
        </div>
      </div>
    </div>
  )
}

const DelegationTab = ({ chain, validatorsMap, delegations }: Props) => {
  return (
    <div>
      {delegations.map((e, i) => (
        <div
          key={e.validator}
          className={`p-6 odd:bg-surface-200 even:bg-surface-100 last:rounded-b-xl text-black`}
        >
          <DelegationCard chain={chain} delegation={e} validator={validatorsMap[e.validator]} />
        </div>
      ))}
    </div>
  )
}

export default DelegationTab

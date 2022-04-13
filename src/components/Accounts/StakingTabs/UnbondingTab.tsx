import { formatDuration, intervalToDuration, format } from 'date-fns'
import { formatCoin, formatPercentage } from '../../../misc/utils'
import Avatar from '../../Element/avatar'

interface Props {
  chain: Chain
  unbonding: Unbonding[]
  validatorsMap: { [address: string]: Validator }
}

const UnbondingCard = ({
  chain,
  unbonding,
  validator,
}: {
  chain: Chain
  unbonding: Unbonding
  validator?: Validator
}) => {
  const duration = intervalToDuration({
    start: new Date(),
    end: unbonding.completion,
  })

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Avatar size={10} src={validator?.image} />
          <div className="ml-2">
            <h4 className="text-primary-100 leading-none">{validator?.name}</h4>
            <p>Commission: {formatPercentage(validator?.commission)}</p>
          </div>
        </div>
      </div>
      <div>
        <div className="flex justify-between">
          <p>Unbonded Amount</p>
          <p>{formatCoin(chain.chainId, unbonding.balance)}</p>
        </div>
        <div className="flex justify-between">
          <p>Expected Delivery</p>
          <p>
            {format(unbonding.completion, 'dd MMM, HH:mm')}{' '}
            <span className="text-secondary-100">
              (
              {formatDuration(duration, {
                format: [
                  Object.entries(duration)
                    .filter(([_, value]) => value)
                    .map(([unit, _]) => unit)[0],
                ],
                delimiter: ', ',
              })}
              )
            </span>
          </p>
        </div>
      </div>
    </div>
  )
}

const UnbondingTab = ({ unbonding, chain, validatorsMap }: Props) => {
  return (
    <div>
      {unbonding.map((e, i) => (
        <div
          key={e.completion}
          className={`p-6 odd:bg-surface-200 even:bg-surface-100 last:rounded-b-xl text-black`}
        >
          <UnbondingCard unbonding={e} chain={chain} validator={validatorsMap[e.validator]} />
        </div>
      ))}
    </div>
  )
}

export default UnbondingTab

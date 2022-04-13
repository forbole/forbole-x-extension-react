import React from 'react'
import { formatDuration, intervalToDuration, format } from 'date-fns'
import { formatCoin } from '../../../misc/utils'
import Avatar from '../../Element/avatar'

const RedelegationCard = ({
  chain,
  redelegation,
  fromValidator,
  toValidator,
}: {
  chain: Chain
  redelegation: Redelegation
  fromValidator?: Validator
  toValidator?: Validator
}) => {
  const duration = intervalToDuration({
    start: new Date(),
    end: new Date(redelegation.completion),
  })

  return (
    <div className="space-y-3">
      <div>
        <div className="flex justify-between w-full">
          <p>From</p>
          <div className="flex items-center">
            <Avatar size={6} src={fromValidator?.image} />
            <div className="ml-2">
              <p className="text-primary-100 leading-none">{fromValidator?.name}</p>
            </div>
          </div>
        </div>
        <div className="flex justify-between w-full">
          <p>To</p>
          <div className="flex items-center">
            <Avatar size={6} src={toValidator?.image} />
            <div className="ml-2">
              <p className="text-primary-100 leading-none">{toValidator?.name}</p>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div className="flex justify-between">
          <p>Redelegated</p>
          <p>{formatCoin(chain.chainId, redelegation.balance)}</p>
        </div>
        <div className="flex justify-between">
          <p>Expected Delivery</p>
          <p>
            {format(redelegation.completion, 'dd MMM, HH:mm')}{' '}
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

interface Props {
  chain: Chain
  redelegations: Redelegation[]
  validatorsMap: { [address: string]: Validator }
}

const RedelegationTab = ({ chain, redelegations, validatorsMap }: Props) => {
  return (
    <div>
      {redelegations.map((e, i) => (
        <div
          key={e.completion}
          className={`p-6 odd:bg-surface-200 even:bg-surface-100 last:rounded-b-xl text-black`}
        >
          <RedelegationCard
            redelegation={e}
            fromValidator={validatorsMap[e.fromValidator]}
            toValidator={validatorsMap[e.toValidator]}
            chain={chain}
          />
        </div>
      ))}
    </div>
  )
}

export default RedelegationTab

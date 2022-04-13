import React from 'react'
import { formatDuration, intervalToDuration, format } from 'date-fns'

type CardProps = {
  deliveryDate: any
}

type Props = {}

const UnbondingCard = (props: CardProps) => {
  const duration = intervalToDuration({
    start: new Date(),
    end: props.deliveryDate,
  })

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div>
          <h4 className="text-primary-100 leading-none">Forbole</h4>
          <p>Commission: 10%</p>
        </div>
      </div>
      <div>
        <div className="flex justify-between">
          <p>Redelegated</p>
          <p>100,211,613.340318 DSM</p>
        </div>
        <div className="flex justify-between">
          <p>Expected Delivery</p>
          <p>
            {format(props.deliveryDate, 'dd MMM, HH:mm')}{" "}
            <span className="text-secondary-100">
              ( 
              {formatDuration(duration, {
                format: [
                  Object.entries(duration)
                    .filter(([_, value]) => value || 0 > 0)
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

const UnbondingTab = (props: Props) => {
  const deliveryDate = new Date(2022, 12, 12, 11, 20, 15)

  return (
    <div>
      {[...Array(5)].map((e, i) => (
        <div className={`p-6 odd:bg-surface-200 even:bg-surface-100 last:rounded-b-xl text-black`}>
          <UnbondingCard deliveryDate={deliveryDate} />
        </div>
      ))}
    </div>
  )
}

export default UnbondingTab

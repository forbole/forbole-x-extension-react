import React from 'react'
import dayjs from 'dayjs'
let relativeTime = require('dayjs/plugin/relativeTime')
dayjs.extend(relativeTime)
declare module 'dayjs' {
  interface Dayjs {
    to(a: Dayjs, b: boolean)
  }
}

type CardProps = {
  deliveryDate: any
}

const RedelegationCard = (props: CardProps) => {
  return (
    <div className="space-y-3">
      <div>
        <div className="flex justify-between w-full">
          <p>From</p>
          <p>Stakefish</p>
        </div>
        <div className="flex justify-between w-full">
          <p>To</p>
          <p>Forbole</p>
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
            {props.deliveryDate.format('DD MMM, HH:mm')}
            <span className="text-secondary-100">({props.deliveryDate.to(dayjs(), true)})</span>
          </p>
        </div>
      </div>
    </div>
  )
}
type Props = {}

const RedelegationTab = (props: Props) => {
  const deliveryDate = dayjs('2022-12-12 11:20')

  return (
    <div>
      {[...Array(5)].map((e, i) => (
        <div className={`p-6 odd:bg-surface-200 even:bg-surface-100 last:rounded-b-xl text-black`}>
          <RedelegationCard deliveryDate={deliveryDate} />
        </div>
      ))}
    </div>
  )
}

export default RedelegationTab

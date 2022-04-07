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

type Props = {}

const UnbondingCard = (props: CardProps) => {
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
            {props.deliveryDate.format('DD MMM, HH:mm')}
            <span className="text-secondary-100">({props.deliveryDate.to(dayjs(), true)})</span>
          </p>
        </div>
      </div>
    </div>
  )
}

const UnbondingTab = (props: Props) => {
  const deliveryDate = dayjs('2022-12-12 11:40')
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

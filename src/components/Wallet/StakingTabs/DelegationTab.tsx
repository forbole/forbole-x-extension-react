import React from 'react'

type Props = {}

const DelegationCard = () => {
  return (
    <div className='space-y-3'>
      <div className="flex items-center justify-between">
        <div>
          <h4 className="text-primary-100 leading-none">Forbole</h4>
          <p>Commission: 10%</p>
        </div>
        <button className="bg-primary-100 rounded-md px-4 py-2 text-white nightwind-prevent">Manage</button>
      </div>
      <div>
        <div className="flex justify-between">
          <p>Delegated</p>
          <p>100,211,613.340318 DSM</p>
        </div>
        <div className="flex justify-between">
          <p>Rewards</p>
          <p>2,152.836301 DSM</p>
        </div>
      </div>
    </div>
  )
}

const DelegationTab = (props: Props) => {
  return (
    <div>
      {[...Array(5)].map((e, i) => (
        <div className={`p-6 odd:bg-surface-200 even:bg-surface-100 last:rounded-b-xl text-black`}>
          <DelegationCard />
        </div>
      ))}
    </div>
  )
}

export default DelegationTab

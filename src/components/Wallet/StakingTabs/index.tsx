import React from 'react'
import DelegationTab from './DelegationTab'
import RedelegationTab from './RedelegationTab'
import UnbondingTab from './UnbondingTab'

type Props = {
  tabIndex: number
}

const StakingTabs = ({ tabIndex }: Props) => {
  return (
    <div className='relative'>
      <div className={`${tabIndex === 0 ? 'opacity-100' : 'opacity-0 absolute'}`}>
        <DelegationTab />
      </div>
      <div className={`${tabIndex === 1 ? 'opacity-100' : 'opacity-0 absolute'}`}>
        <RedelegationTab />
      </div>
      <div className={`${tabIndex === 2 ? 'opacity-100' : 'opacity-0 absolute'}`}>
        <UnbondingTab />
      </div>
    </div>
  )
}

export default StakingTabs

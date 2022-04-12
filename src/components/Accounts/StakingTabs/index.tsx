import React from 'react'
import DelegationTab from './DelegationTab'
import RedelegationTab from './RedelegationTab'
import UnbondingTab from './UnbondingTab'

type Props = {
  tabIndex: number
}

const StakingTabs = ({ tabIndex }: Props) => {
  return (
    <div className="relative">
      {tabIndex === 0 && <DelegationTab />}
      {tabIndex === 1 && <RedelegationTab />}
      {tabIndex === 2 && <UnbondingTab />}
    </div>
  )
}

export default StakingTabs

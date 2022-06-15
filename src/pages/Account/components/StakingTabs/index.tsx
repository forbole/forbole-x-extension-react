import { keyBy } from 'lodash';
import React, { useMemo } from 'react';
import RedelegationTab from './components/RedelegationTab';
import DelegationTab from './components/DelegationTab';
import UnbondingTab from './components/UnbondingTab';

type Props = {
  tabIndex: number;
  chain: Chain;
  delegations: Delegation[];
  redelegations: Redelegation[];
  unbonding: Unbonding[];
  validators: Validator[];
};

const StakingTabs = ({
  tabIndex,
  chain,
  delegations,
  redelegations,
  unbonding,
  validators,
}: Props) => {
  const validatorsMap = useMemo(() => keyBy(validators, 'address'), [validators]);
  return (
    <div className="relative">
      {tabIndex === 0 && (
        <DelegationTab chain={chain} delegations={delegations} validatorsMap={validatorsMap} />
      )}
      {tabIndex === 1 && (
        <RedelegationTab
          chain={chain}
          redelegations={redelegations}
          validatorsMap={validatorsMap}
        />
      )}
      {tabIndex === 2 && (
        <UnbondingTab chain={chain} unbonding={unbonding} validatorsMap={validatorsMap} />
      )}
    </div>
  );
};

export default StakingTabs;

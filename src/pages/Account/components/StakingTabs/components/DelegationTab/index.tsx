import React from 'react';
import DelegationCard from './DelegationCard';

interface Props {
  chain: Chain;
  delegations: Delegation[];
  validatorsMap: { [address: string]: Validator };
}

const DelegationTab = ({ chain, validatorsMap, delegations }: Props) => {
  return (
    <div>
      {delegations.map((e) => (
        <div
          key={e.validator}
          className="p-6 odd:bg-surface-200 even:bg-surface-100 last:rounded-b-xl text-black"
        >
          <DelegationCard chain={chain} delegation={e} validator={validatorsMap[e.validator]} />
        </div>
      ))}
    </div>
  );
};

export default DelegationTab;

import React from 'react';
import RedelegationCard from './RedelegationCard';

interface Props {
  chain: Chain;
  redelegations: Redelegation[];
  validatorsMap: { [address: string]: Validator };
}

const RedelegationTab = ({ chain, redelegations, validatorsMap }: Props) => {
  return (
    <div>
      {redelegations.map((e) => (
        <div
          key={e.completion}
          className="p-6 odd:bg-surface-200 even:bg-surface-100 last:rounded-b-xl text-black"
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
  );
};

export default RedelegationTab;

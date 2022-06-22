import React from 'react';
import UnbondingCard from './UnbondingCard';

interface Props {
  chain: Chain;
  unbonding: Unbonding[];
  validatorsMap: { [address: string]: Validator };
}

const UnbondingTab = ({ unbonding, chain, validatorsMap }: Props) => {
  return (
    <div>
      {unbonding.map((e) => (
        <div
          key={e.completion}
          className="p-6 odd:bg-surface-200 even:bg-surface-100 last:rounded-b-xl text-black"
        >
          <UnbondingCard unbonding={e} chain={chain} validator={validatorsMap[e.validator]} />
        </div>
      ))}
    </div>
  );
};

export default UnbondingTab;

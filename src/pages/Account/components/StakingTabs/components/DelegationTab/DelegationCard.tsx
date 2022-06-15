import Avatar from 'components/Element/avatar';
import { formatCoin, formatCoins, formatPercentage } from 'misc/utils';
import React from 'react';

const DelegationCard = ({
  chain,
  delegation,
  validator,
}: {
  chain: Chain;
  delegation: Delegation;
  validator?: Validator;
}) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Avatar size={9} src={validator?.image} />
          <div className="ml-2">
            <h4 className="text-primary-100 leading-none">{validator?.name}</h4>
            <p>Commission: {formatPercentage(validator?.commission)}</p>
          </div>
        </div>
        <button
          type="button"
          className="bg-primary-100 rounded-md px-4 py-2 text-white nightwind-prevent hover:opacity-80"
        >
          Manage
        </button>
      </div>
      <div>
        <div className="flex justify-between">
          <p>Delegated</p>
          <p>{formatCoin(chain.chainId, delegation.balance)}</p>
        </div>
        <div className="flex justify-between">
          <p>Rewards</p>
          <p>{formatCoins(chain.chainId, delegation.rewards)}</p>
        </div>
      </div>
    </div>
  );
};

export default DelegationCard;

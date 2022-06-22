import { format, formatDuration, intervalToDuration } from 'date-fns';
import Avatar from 'components/Element/avatar';
import { formatCoin, formatPercentage } from 'misc/utils';
import React from 'react';

const UnbondingCard = ({
  chain,
  unbonding,
  validator,
}: {
  chain: Chain;
  unbonding: Unbonding;
  validator?: Validator;
}) => {
  const duration = intervalToDuration({
    start: new Date(),
    end: unbonding.completion,
  });

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Avatar size={9} src={validator?.image} />
          <div className="ml-2">
            <h4 className="text-primary-100 leading-none">{validator?.name}</h4>
            <p>Commission: {formatPercentage(validator?.commission)}</p>
          </div>
        </div>
      </div>
      <div>
        <div className="flex justify-between">
          <p>Unbonded Amount</p>
          <p>{formatCoin(chain.chainId, unbonding.balance)}</p>
        </div>
        <div className="flex justify-between">
          <p>Expected Delivery</p>
          <p>
            {format(unbonding.completion, 'dd MMM, HH:mm')}{' '}
            <span className="text-secondary-100">
              (
              {formatDuration(duration, {
                format: [
                  Object.entries(duration)
                    .filter(([_, value]) => value)
                    .map(([unit]) => unit)[0],
                ],
                delimiter: ', ',
              })}
              )
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default UnbondingCard;

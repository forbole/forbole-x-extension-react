import _ from 'lodash';
import chains from 'misc/chains';
import ChainUtils from 'lib/ChainUtils';

/**
 * Get the tx type from an array of messages.
 * Assumes the tx type of the first message is the same across all messages.
 */
const getTxTypeFromMsgArr = (msgs: TransactionMsg[]) => {
  const [firstMsg] = msgs;

  return firstMsg.typeUrl;
};

/**
 * Calculate the total amount of tokens used in a transaction and return the formatted
 * data in an {amount, denom} object
 */
const calculateTotalTokens = (msgs: TransactionMsg[]): { amount: string; denom: string } => {
  const denom = _.get(msgs, '[0].value.amount.denom');

  const totalAmount = msgs.reduce((a, c) => {
    return a + Number(_.get(c, 'value.amount.amount', 0));
  }, 0);

  return {
    amount: String(totalAmount),
    denom,
  };
};

/**
 * Get the chainID of a chain using the denom
 */
const getChainIDWithDenom = (denom: string) => {
  try {
    return Object.values(chains).find((chain) => chain.stakingDenom === denom).chainId;
  } catch (err) {
    console.log('no chainID found for denom:', denom);
    return '';
  }
};

const createDelegateTxMsg = ({
  delegatorAddress,
  delegations,
  denom,
}: {
  delegatorAddress: string;
  delegations: {
    validator: Validator;
    amount: number;
  }[];
  denom: string;
}): TransactionMsgDelegate[] => {
  const exponent = ChainUtils.getExponentByStakingDenom(denom);

  return delegations.map((d) => ({
    typeUrl: '/cosmos.staking.v1beta1.MsgDelegate',
    value: {
      delegatorAddress,
      validatorAddress: d.validator.address,
      amount: {
        amount: String(d.amount * 10 ** exponent),
        denom,
      },
    },
  }));
};

const createUndelegateMessage = ({
  delegatorAddress,
  validatorAddress,
  undelegateAmount,
}: {
  delegatorAddress: string;
  validatorAddress: string;
  undelegateAmount: { amount: string; denom: string };
}): TransactionMsgUndelegate[] => {
  const { amount, denom } = undelegateAmount;

  const exponent = ChainUtils.getExponentByStakingDenom(denom);

  return [
    {
      typeUrl: '/cosmos.staking.v1beta1.MsgUndelegate',
      value: {
        delegatorAddress,
        validatorAddress,
        amount: {
          amount: String(Number(amount) * 10 ** exponent),
          denom,
        },
      },
    },
  ];
};

const createRedelegateMessage = ({
  delegatorAddress,
  redelegations,
  stakingDenom,
}: {
  delegatorAddress: string;
  stakingDenom: string;
  redelegations: {
    fromValidator: string;
    toValidator: string;
    amount: number;
  }[];
}): TransactionMsgRedelegate[] => {
  const exponent = ChainUtils.getExponentByStakingDenom(stakingDenom);

  return redelegations.map((x) => ({
    typeUrl: '/cosmos.staking.v1beta1.MsgBeginRedelegate',
    value: {
      delegatorAddress,
      validatorSrcAddress: x.fromValidator,
      validatorDstAddress: x.toValidator,
      amount: {
        amount: String(x.amount * 10 ** exponent),
        denom: stakingDenom,
      },
    },
  }));
};

const MsgUtils = {
  getTxTypeFromMsgArr,
  calculateTotalTokens,
  getChainIDWithDenom,

  // tx msg creation
  createDelegateTxMsg,
  createUndelegateMessage,
  createRedelegateMessage,
};

export default MsgUtils;

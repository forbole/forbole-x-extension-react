import _ from 'lodash';

const formatTx = (transactions: any[]) => {
  const reformattedTransactions = transactions.map((transaction) => {
    /**
     * MsgSend
     * MsgMultiSend
     * MsgBeginRedelegate
     * MsgUndelegate
     * MsgDeposit
     * MsgVote
     * MsgSubmitProposal
     * MsgSetWithdrawAddress
     */

    const {
      tx: {
        body: { messages },
        memo,
      },
      txhash,
      height,
      timestamp,
    } = transaction;

    const txType = messages[0]['@type'];

    const baseTxData = {
      txhash,
      height,
      timestamp,
      type: txType,
      memo,
    };

    if (
      txType.includes('MsgVote') ||
      txType.includes('MsgBeginRedelegate') ||
      txType.includes('MsgSend')
    ) {
      return {
        ...baseTxData,
        type: txType,
        detail: messages[0],
      };
    }
    if (txType.includes('MsgMultiSend')) {
      return {
        ...baseTxData,
        ...formatMultiSendTx(transaction),
      };
    }
    if (txType.includes('MsgWithdrawDelegatorReward')) {
      // returns an array[], so we need to append base data to each element
      const formattedWithdrawRewardTx = formatWithdrawRewardsTx(transaction);
      return formattedWithdrawRewardTx.map((tx) => ({
        ...baseTxData,
        ...tx,
      }));
    }
    if (txType.includes('MsgDelegate')) {
      // returns an array[], so we need to append base data to each element
      const formattedDelegationTx = formatDelegationTx(transaction);
      return formattedDelegationTx.map((tx) => ({
        ...baseTxData,
        ...tx,
      }));
    }
    if (txType.includes('MsgSubmitProposal')) {
      return {
        ...baseTxData,
        ...formatSubmitProposalTx(transaction),
      };
    }
    return null;
  });
  return _.flatten(reformattedTransactions);
};

const formatSubmitProposalTx = (transaction: any) => {
  const {
    logs,
    tx: {
      body: { messages },
    },
  } = transaction;

  // get proposal #
  const proposalNum = logs[0].events
    .find((event) => event.type === 'proposal_deposit')
    .attributes.find((attribute) => attribute.key === 'proposal_id').value;

  return {
    detail: {
      proposalNum,
      ...messages[0],
    },
  };
};

const formatMultiSendTx = (transaction: any) => {
  const {
    tx: {
      body: { messages },
    },
  } = transaction;

  return {
    details: messages[0],
  };
};

const formatDelegationTx = (transaction: any) => {
  const {
    tx: {
      body: { messages },
    },
  } = transaction;

  return messages.map((message) => ({
    detail: {
      amount: message.amount,
      recipient: message.validator_address,
      sender: message.delegator_address,
    },
  }));
};

const formatWithdrawRewardsTx = (transaction: any) => {
  // MsgWithdrawDelegatorReward
  // Multiple reward withdrawals are stored as one transaction, however
  // forbole x represents them as individual "transactions",
  // so we need to format the source data
  const {
    logs,
    tx: {
      body: { messages },
    },
  } = transaction;

  return logs.map((log, x) => {
    // Get the reward amount
    const amount = log.events
      .find((event) => event.type === 'coin_received')
      .attributes.find((event) => event.key === 'amount');

    // amount is stored as a alphanumeric string (eg 1000udsm)
    // , separate into denom and amount

    // regex split may generate empty strings in the final array, use
    // _.compact to remove those falsy values
    const formattedAmount = _.compact(amount.value.split(/^(\d+)/));

    // use _amount as amount is already declared in upper scope
    const [_amount, denom] = formattedAmount;

    // tx type, delegator and validator address is stored in the
    // message
    const message = messages[x];

    return {
      detail: {
        recipient: message.delegator_address,
        sender: message.validator_address,
        amount: {
          amount: _amount,
          denom,
        },
      },
    };
  });
};

const FormatUtils = {
  formatTx,
};

export default FormatUtils;

import _ from 'lodash';

const formatTx = (transactions: any[]) => {
  const reformattedTransactions = transactions.map((transaction) => {
    // Format the transaction according to type
    const {
      tx: {
        body: { messages },
      },
    } = transaction;
    const [firstMsg] = messages;
    const txType = firstMsg['@type'];

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
    if (txType.includes('MsgWithdrawDelegatorReward')) {
      return formatWithdrawRewardsTx(transaction);
    }
    if (txType.includes('MsgDelegate')) {
      return formatDelegationTx(transaction);
    }
    if (txType.includes('MsgSend')) {
      return formatSendTx(transaction);
    }
    if (txType.includes('MsgMultiSend')) {
      return formatMultiSendTx(transaction);
    }
  });
  return _.flatten(reformattedTransactions);
};

const formatMultiSendTx = (transaction: any) => {
  const {
    tx: {
      body: { messages },
    },
    txhash,
    height,
    timestamp,
  } = transaction;

  const [firstMessage] = messages;
  const { inputs, outputs } = firstMessage;

  // format is slightly different, note recipients instead of recipient
  return {
    height,
    detail: {
      sender: inputs[0].address,
      recipients: outputs,
      amount: inputs[0].coins,
    },
    txhash,
    type: firstMessage['@type'],
    timestamp,
  };
};

const formatSendTx = (transaction: any) => {
  const {
    tx: {
      body: { messages },
    },
    txhash,
    height,
    timestamp,
  } = transaction;

  const [firstMessage] = messages;

  const { from_address, to_address, amount } = firstMessage;

  return {
    height,
    detail: {
      recipient: to_address,
      sender: from_address,
      amount: amount[0],
    },
    timestamp,
    type: firstMessage['@type'],
    txhash,
  };
};

const formatDelegationTx = (transaction: any) => {
  const {
    tx: {
      body: { messages },
    },
    txhash,
    height,
    timestamp,
  } = transaction;

  return messages.map((message) => ({
    height,
    detail: {
      amount: message.amount,
      recipient: message.validator_address,
      sender: message.delegator_address,
    },
    timestamp,
    type: message['@type'],
    txhash,
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
    txhash,
    height,
    timestamp,
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
      height,
      detail: {
        recipient: message.delegator_address,
        sender: message.validator_address,
        amount: {
          amount: _amount,
          denom,
        },
      },
      timestamp,
      type: message['@type'],
      txhash,
    };
  });
};

const FormatUtils = {
  formatTx,
};

export default FormatUtils;

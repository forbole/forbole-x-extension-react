import _ from 'lodash';
import { differenceInCalendarDays } from 'date-fns';

const formatTx = (transactions: any[], validators: Validator[]) => {
  const reformattedTransactions = transactions.map((transaction) => {
    const {
      tx: {
        body: { messages },
        memo,
      },
      txhash,
      height,
      timestamp,
      code, // 0 = success, 1 = fail
      // note that lcd queries do not return failed transactions yet, this is for future proofing
    } = transaction;

    const txType = messages[0]['@type'];

    const baseTxData = {
      txhash,
      height,
      timestamp,
      type: txType,
      memo,
      code,
      // uuid necessary for rendering mapped components
      // this value gets overwritten in the following tx types:
      // MsgDelegate
      // MsgWithdrawDelegatorReward
      uuid: txhash,
      extraData: {},
    };

    if (
      txType.includes('MsgVote') ||
      txType.includes('MsgSend') ||
      txType.includes('MsgSetWithdrawAddress') ||
      txType.includes('MsgJail') // this actually isn't a valid msg type
    ) {
      return {
        ...baseTxData,
        detail: messages,
      };
    }
    if (txType.includes('MsgUnjail')) {
      return {
        ...baseTxData,
        detail: messages,
        extraData: {
          validator: validators.find((v) => v.address === messages[0].validator_addr),
        },
      };
    }
    if (txType.includes('MsgBeginRedelegate')) {
      return {
        ...baseTxData,
        detail: messages,
        extraData: {
          validatorA: validators.find((v) => v.address === messages[0].validator_src_address),
          validatorB: validators.find((v) => v.address === messages[0].validator_dst_address),
        },
      };
    }
    if (txType.includes('MsgUndelegate')) {
      return {
        ...baseTxData,
        detail: messages,
        extraData: {
          validator: validators.find((v) => v.address === messages[0].validator_address),
        },
      };
    }
    // deposit transactions aren't handled by forbole x
    // if (txType.includes('MsgDeposit')) {
    //   return {
    //     ...baseTxData,
    //     ...formatDepositTx(transaction),
    //   };
    // }
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
        extraData: {
          validator: validators.find((v) => v.address === tx.detail.validator_address),
        },
      }));
    }
    if (txType.includes('MsgDelegate')) {
      // returns an array[], so we need to append base data to each element
      const formattedDelegationTx = formatDelegationTx(transaction);
      return formattedDelegationTx.map((tx) => ({
        ...baseTxData,
        ...tx,
        extraData: {
          validator: validators.find((v) => v.address === tx.detail.validator_address),
        },
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
  return _.compact(_.flatten(reformattedTransactions));
};

// Organize tx into groups based on days from present so it will be easier to render
// the different timegroups (See TransactionDateSeparator component for more information)
const organizeIntoDates = (formattedTransactions: any[]) => {
  const currentDate = new Date();
  const txWithDateDifference = formattedTransactions.map((tx) => ({
    ...tx,
    dateDiff: differenceInCalendarDays(currentDate, new Date(tx.timestamp)),
  }));

  return txWithDateDifference.reduce((acc, c) => {
    return {
      ...acc,
      [c.dateDiff]: _.concat(acc[c.dateDiff] || [], c),
    };
  }, {});
};

// const formatDepositTx = (transaction: any) => {
//   const {
//     logs,
//     tx: {
//       body: { messages },
//     },
//   } = transaction;
//
//   const proposalNum = logs[0].events
//     .find((event) => event.type === 'proposal_deposit')
//     .attributes.find((attribute) => attribute.key === 'proposal_id').value;
//
//   return {
//     detail: {
//       proposalNum,
//       messages,
//     },
//   };
// };

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
      messages,
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
    detail: messages,
  };
};

const formatDelegationTx = (transaction: any) => {
  const {
    tx: {
      body: { messages },
    },
    txhash,
  } = transaction;

  return messages.map((message, idx) => ({
    uuid: `${txhash}-${idx}`,
    detail: message,
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
  } = transaction;

  return logs.map((log, idx) => {
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
    const message = messages[idx];

    return {
      uuid: `${txhash}-${idx}`,
      detail: {
        delegator_address: message.delegator_address,
        validator_address: message.validator_address,
        amount: {
          amount: _amount,
          denom,
        },
      },
    };
  });
};

const getNameOrAddress = (validator: Validator) => _.get(validator, 'name', validator?.address);

const FormatUtils = {
  formatTx,
  organizeIntoDates,
  getNameOrAddress,
};

export default FormatUtils;

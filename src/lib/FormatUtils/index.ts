import { format } from 'date-fns';
import { get } from 'lodash';
import defaultDenoms from '../../config/defaultDenoms';

const getTokenAmountFromDenoms = (
  coins: Array<{ denom: string; amount: string }>,
  denoms: TokenPrice[]
): TokenAmount => {
  const result = {};
  (coins || []).forEach((coin) => {
    const denomsToUse = denoms.length ? denoms : defaultDenoms;
    denomsToUse.some((d) => {
      const unit = get(d, 'token_unit.token.token_units', []).find(
        (t) => t && coin && t.denom === coin.denom
      );
      if (unit) {
        const base = get(d, 'token_unit.token.token_units', []).find(
          (t) => t.denom === d.unit_name
        );
        const denom = base.denom.toUpperCase();
        if (result[denom]) {
          result[denom].amount += Number(
            (Number(coin.amount) * 10 ** (unit.exponent - base.exponent)).toFixed(6)
          );
        } else {
          result[denom] = {
            amount: Number(
              (Number(coin.amount) * 10 ** (unit.exponent - base.exponent)).toFixed(6)
            ),
            price: d.price,
          };
        }
        return true;
      }
      return false;
    });
  });
  return result;
};

const transformTransactions = (
  data: any,
  validatorsMap: { [address: string]: Validator },
  chain: string
): Activity[] => {
  return get(data, 'messages_by_address', [])
    .map((t) => {
      if (t.type.includes('MsgSend')) {
        return {
          ref: `#${get(t, 'transaction_hash', '')}`,
          tab: 'transfer',
          tag: 'send',
          date: `${format(
            new Date(get(t, 'transaction.block.timestamp')),
            'dd MMM yyyy HH:mm'
          )} UTC`,
          detail: {
            fromAddress: get(t, 'value.from_address', ''),
            toAddress: get(t, 'value.to_address', ''),
          },
          amount: get(t, 'value.amount[0]', {}),
          success: get(t, 'transaction.success', false),
        };
      }
      if (t.type.includes('MsgMultiSend')) {
        return {
          ref: `#${get(t, 'transaction_hash', '')}`,
          tab: 'transfer',
          tag: 'multisend',
          date: `${format(
            new Date(get(t, 'transaction.block.timestamp')),
            'dd MMM yyyy HH:mm'
          )} UTC`,
          detail: {
            inputs: get(t, 'value.inputs', []).map((input) => ({
              ...input,
              amount: input.coins[0],
            })),
            outputs: get(t, 'value.outputs', []).map((output) => ({
              ...output,
              amount: output.coins[0],
            })),
          },
          amount: get(t, 'value.amount[0]', {}),
          success: get(t, 'transaction.success', false),
        };
      }
      if (t.type.includes('MsgDelegate')) {
        return {
          ref: `#${get(t, 'transaction_hash', '')}`,
          tab: 'staking',
          tag: 'delegate',
          date: `${format(
            new Date(get(t, 'transaction.block.timestamp')),
            'dd MMM yyyy HH:mm'
          )} UTC`,
          detail: {
            validator: get(validatorsMap, `${get(t, 'value.validator_address', '')}`, {}),
          },
          amount: get(t, 'value.amount[0]', {}),
          success: get(t, 'transaction.success', false),
        };
      }
      if (t.type.includes('MsgBeginRedelegate')) {
        return {
          ref: `#${get(t, 'transaction_hash', '')}`,
          tab: 'staking',
          tag: 'redelegate',
          date: `${format(
            new Date(get(t, 'transaction.block.timestamp')),
            'dd MMM yyyy HH:mm'
          )} UTC`,
          detail: {
            srcValidator: get(validatorsMap, `${get(t, 'value.validator_src_address', '')}`, {}),
            dstValidator: get(validatorsMap, `${get(t, 'value.validator_dst_address', '')}`, {}),
          },
          amount: get(t, 'value.amount[0]', {}),
          success: get(t, 'transaction.success', false),
        };
      }
      if (t.type.includes('MsgUndelegate')) {
        return {
          ref: `#${get(t, 'transaction_hash', '')}`,
          tab: 'staking',
          tag: 'undelegate',
          date: `${format(
            new Date(get(t, 'transaction.block.timestamp')),
            'dd MMM yyyy HH:mm'
          )} UTC`,
          detail: {
            validator: get(validatorsMap, `${get(t, 'value.validator_address', '')}`, {}),
          },
          amount: get(t, 'value.amount[0]', {}),
          success: get(t, 'transaction.success', false),
        };
      }
      if (t.type.includes('MsgWithdrawDelegatorReward')) {
        return {
          ref: `#${get(t, 'transaction_hash', '')}`,
          tab: 'distribution',
          tag: 'withdrawReward',
          date: `${format(
            new Date(get(t, 'transaction.block.timestamp')),
            'dd MMM yyyy HH:mm'
          )} UTC`,
          detail: {
            validator: get(validatorsMap, `${get(t, 'value.validator_address', '')}`, {}),
          },
          amount: get(t, 'value.amount[0]', {}),
          success: get(t, 'transaction.success', false),
        };
      }
      if (t.type.includes('MsgDeposit')) {
        return {
          ref: `#${get(t, 'transaction_hash', '')}`,
          tab: 'governance',
          tag: 'deposit',
          date: `${format(
            new Date(get(t, 'transaction.block.timestamp')),
            'dd MMM yyyy HH:mm'
          )} UTC`,
          detail: {
            proposalId: get(t, 'value.proposal_id', ''),
          },
          amount: get(t, 'value.amount[0]', {}),
          success: get(t, 'transaction.success', false),
        };
      }
      if (t.type.includes('MsgVote')) {
        return {
          ref: `#${get(t, 'transaction_hash', '')}`,
          tab: 'governance',
          tag: 'vote',
          date: `${format(
            new Date(get(t, 'transaction.block.timestamp')),
            'dd MMM yyyy HH:mm'
          )} UTC`,
          detail: {
            proposalId: get(t, 'value.proposal_id', ''),
            ans: get(t, 'value.option', ''),
          },
          amount: get(t, 'value.amount[0]', {}),
          success: get(t, 'transaction.success', false),
        };
      }
      if (t.type.includes('MsgSubmitProposal')) {
        return {
          ref: `#${get(t, 'transaction_hash', '')}`,
          tab: 'governance',
          tag: 'submitProposal',
          date: `${format(
            new Date(get(t, 'transaction.block.timestamp')),
            'dd MMM yyyy HH:mm'
          )} UTC`,
          detail: {
            proposalTitle: get(t, 'value.content.title', ''),
          },
          amount: get(t, 'value.amount[0]', {}),
          success: get(t, 'transaction.success', false),
        };
      }
      if (t.type.includes('MsgSetWithdrawAddress')) {
        return {
          ref: `#${get(t, 'transaction_hash', '')}`,
          tab: 'distribution',
          tag: 'setRewardAddress',
          date: `${format(
            new Date(get(t, 'transaction.block.timestamp')),
            'dd MMM yyyy HH:mm'
          )} UTC`,
          detail: {
            delegatorAddress: get(t, 'value.delegator_address', ''),
            withdrawAddress: get(t, 'value.withdraw_address', ''),
          },
          amount: get(t, 'value.amount[0]', {}),
          success: get(t, 'transaction.success', false),
        };
      }
      return null;
    })
    .filter((a) => !!a);
};

const FormatUtils = {
  getTokenAmountFromDenoms,
  transformTransactions,
};

export default FormatUtils;

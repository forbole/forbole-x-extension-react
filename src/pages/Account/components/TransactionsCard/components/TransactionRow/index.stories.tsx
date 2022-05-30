import React from 'react';

import { ComponentStory, ComponentMeta } from '@storybook/react';

import TransactionRow from './index';

type CompType = typeof TransactionRow;

export default {
  title: 'Account/TransactionRow',
  component: TransactionRow,
} as ComponentMeta<CompType>;

const baseTx = {
  txhash: '096162610A295AC06567C0B615CFC66155D2D8D1C14432AC641FD97FDF506B52',
  height: '3680717',
  timestamp: '2022-05-27T08:07:30Z',
  code: 0,
  chainID: 'desmos-mainnet-1',
};

const sendTx = {
  ...baseTx,
  type: '/cosmos.bank.v1beta1.MsgSend',
  detail: [
    {
      '@type': '/cosmos.bank.v1beta1.MsgSend',
      from_address: 'desmos1g8cx0wmj60f6w498jrl3mu4wf3gz3gd2km6e97',
      to_address: 'desmos1lhr4w3yurtnqsdqyulfrcs042dku0aetvgh6tz',
      amount: [
        {
          denom: 'udsm',
          amount: '50000',
        },
      ],
    },
  ],
};

export const MsgSend: ComponentStory<CompType> = () => <TransactionRow {...sendTx} />;

const unDelegateTx = {
  ...baseTx,
  type: '/cosmos.staking.v1beta1.MsgUndelegate',
  detail: [
    {
      '@type': '/cosmos.staking.v1beta1.MsgUndelegate',
      delegator_address: 'desmos1lhr4w3yurtnqsdqyulfrcs042dku0aetvgh6tz',
      validator_address: 'desmosvaloper1pe2fwwffxn2qnykeut8wzm20sv6eevxedlgpfu',
      amount: {
        denom: 'udsm',
        amount: '1000000',
      },
    },
  ],
};

export const MsgUndelegate: ComponentStory<CompType> = () => <TransactionRow {...unDelegateTx} />;

const voteYesTx = {
  ...baseTx,
  type: '/cosmos.gov.v1beta1.MsgVote',
  detail: [
    {
      '@type': '/cosmos.gov.v1beta1.MsgVote',
      proposal_id: '1',
      voter: 'desmos10rn0j64w9lzvrnnfzc9p3khxw5ssr3ylxgw9sh',
      option: 'VOTE_OPTION_YES',
    },
  ],
};

export const MsgVote: ComponentStory<CompType> = () => <TransactionRow {...voteYesTx} />;

const changeWithdrawAddrTx = {
  ...baseTx,
  type: '/cosmos.distribution.v1beta1.MsgSetWithdrawAddress',
  detail: [
    {
      '@type': '/cosmos.distribution.v1beta1.MsgSetWithdrawAddress',
      delegator_address: 'desmos1jrld5g998gqm4yx26l6cvhxz7y5adgxquy94nz',
      withdraw_address: 'desmos1qzzszny5fc0kzg0v92yal9stxeztppv2ekkn80',
    },
  ],
};

export const MsgChangeWithdrawAddr: ComponentStory<CompType> = () => (
  <TransactionRow {...changeWithdrawAddrTx} />
);

const beginRedelegateTx = {
  ...baseTx,
  type: '/cosmos.staking.v1beta1.MsgBeginRedelegate',
  detail: [
    {
      '@type': '/cosmos.staking.v1beta1.MsgBeginRedelegate',
      delegator_address: 'desmos13yt424lx2jua56nkhje98grqykvw0grla4zqgc',
      validator_src_address: 'desmosvaloper1rzhewpmmdl72lhnxj6zmxr4v94f522s4hyz467',
      validator_dst_address: 'desmosvaloper1xwazl8ftks4gn00y5x3c47auquc62ssu07r7m6',
      amount: {
        denom: 'udsm',
        amount: '247000000',
      },
    },
  ],
};

export const MsgBeginRedelegate: ComponentStory<CompType> = () => (
  <TransactionRow {...beginRedelegateTx} />
);

const withdrawDelegatorRewardTx = {
  ...baseTx,
  type: '/cosmos.distribution.v1beta1.MsgWithdrawDelegatorReward',
  detail: {
    '@type': '/cosmos.distribution.v1beta1.MsgWithdrawDelegatorReward',
    delegator_address: 'desmos1lhr4w3yurtnqsdqyulfrcs042dku0aetvgh6tz',
    validator_address: 'desmosvaloper1pe2fwwffxn2qnykeut8wzm20sv6eevxedlgpfu',
    amount: {
      amount: '183369886',
      denom: 'udsm',
    },
  },
};

export const MsgWithdrawDelegatorReward: ComponentStory<CompType> = () => (
  <TransactionRow {...withdrawDelegatorRewardTx} />
);

const delegateTx = {
  ...baseTx,
  type: '/cosmos.staking.v1beta1.MsgDelegate',
  detail: {
    '@type': '/cosmos.staking.v1beta1.MsgDelegate',
    delegator_address: 'desmos1lhr4w3yurtnqsdqyulfrcs042dku0aetvgh6tz',
    validator_address: 'desmosvaloper14zea53kzyz3vdgc99jxgltkmdesnjj86zhlcsc',
    amount: {
      denom: 'udsm',
      amount: '25000000',
    },
  },
};

export const MsgDelegate: ComponentStory<CompType> = () => <TransactionRow {...delegateTx} />;

import React from 'react';

import { ComponentStory, ComponentMeta } from '@storybook/react';

import TransactionRow from './index';

type ComponentType = typeof TransactionRow;

export default {
  title: 'Account/TransactionRow',
  component: TransactionRow,
} as ComponentMeta<ComponentType>;

const baseTx = {
  txhash: '096162610A295AC06567C0B615CFC66155D2D8D1C14432AC641FD97FDF506B52',
  height: '3680717',
  timestamp: '2022-05-27T08:07:30Z',
  code: 0,
  chainID: 'desmos-mainnet-1',
};

const delegateTx = {
  ...baseTx,
  type: '/cosmos.staking.v1beta1.MsgUndelegate',
  detail: {
    '@type': '/cosmos.staking.v1beta1.MsgUndelegate',
    delegator_address: 'desmos1lhr4w3yurtnqsdqyulfrcs042dku0aetvgh6tz',
    validator_address: 'desmosvaloper1pe2fwwffxn2qnykeut8wzm20sv6eevxedlgpfu',
    amount: {
      denom: 'udsm',
      amount: '1000000',
    },
  },
};

const sendTx = {
  ...baseTx,
  type: '/cosmos.bank.v1beta1.MsgSend',
  detail: {
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
};

const voteYesTx = {
  ...baseTx,
  type: '/cosmos.gov.v1beta1.MsgVote',
  detail: {
    '@type': '/cosmos.gov.v1beta1.MsgVote',
    proposal_id: '1',
    voter: 'desmos10rn0j64w9lzvrnnfzc9p3khxw5ssr3ylxgw9sh',
    option: 'VOTE_OPTION_YES',
  },
};

export const MsgSend: ComponentStory<ComponentType> = () => <TransactionRow {...sendTx} />;

export const MsgUndelegate: ComponentStory<ComponentType> = () => (
  <TransactionRow {...delegateTx} />
);

export const MsgVote: ComponentStory<ComponentType> = () => <TransactionRow {...voteYesTx} />;

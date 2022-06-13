import { atom } from 'recoil';

const DUMMY_TX = {
  address: 'desmos1lhr4w3yurtnqsdqyulfrcs042dku0aetvgh6tz',
  chainID: 'desmos-mainnet-1',
  transactionData: {
    memo: 'default memo',
    msgs: [
      {
        typeUrl: '/cosmos.staking.v1beta1.MsgDelegate',
        value: {
          delegatorAddress: 'desmos1lhr4w3yurtnqsdqyulfrcs042dku0aetvgh6tz',
          validatorAddress: 'desmosvaloper17ue85ck027c4grv7nuks7k7p4fqnlc55uqhskj',
          amount: {
            amount: '1000000',
            denom: 'udsm',
          },
        },
      },
      {
        typeUrl: '/cosmos.staking.v1beta1.MsgDelegate',
        value: {
          delegatorAddress: 'desmos1lhr4w3yurtnqsdqyulfrcs042dku0aetvgh6tz',
          validatorAddress: 'desmosvaloper1gwr9l765vfxv4l4zz8glsxwkkphj2084xjwc68',
          amount: {
            amount: '1000000',
            denom: 'udsm',
          },
        },
      },
    ],
  },
};

export type TransactionStateType = {
  /**
   * The address of the account making the transaction
   */
  address: string;

  /**
   * Relevant data for the transaction.
   */
  transactionData: Transaction;

  /**
   * The chain that the transaction will be done on
   */
  chainID: string;
};

export const transactionState = atom<TransactionStateType>({
  key: 'transactionState',
  default: DUMMY_TX as any,
  // default: {
  //   address: '',
  //   chainID: '',
  //   transactionData: {
  //     memo: '',
  //     msgs: [],
  //   },
  // },
});

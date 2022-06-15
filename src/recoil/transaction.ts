import { atom } from 'recoil';

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
  default: {
    address: '',
    chainID: '',
    transactionData: {
      memo: '',
      msgs: [],
    },
  },
});

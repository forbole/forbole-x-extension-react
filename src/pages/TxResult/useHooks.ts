import { useRecoilValue, useResetRecoilState } from 'recoil';
import { transactionState } from '@recoil/transaction';
import React from 'react';
import { useNavigate } from 'react-router';

/**
 * Hooks for the TxReject and TxSuccess pages
 */
const useHooks = () => {
  const resetTxData = useResetRecoilState(transactionState);
  const navigate = useNavigate();
  const txData = useRecoilValue(transactionState);

  // Clear the transactionState atom on unmount
  React.useEffect(() => {
    return () => resetTxData();
  }, []);

  //  Redirects user to main page if txData is null
  React.useEffect(() => {
    if (txData.transactionData.msgs.length === 0) {
      navigate('/');
    }
  }, []);
};

export default useHooks;

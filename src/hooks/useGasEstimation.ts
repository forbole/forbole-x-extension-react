import React from 'react';
import { transactionState } from '@recoil/transaction';
import { useRecoilValue } from 'recoil';
import estimateGasFee from 'lib/estimateGasFees';

/**
 * Hook that estimates gas fee for a transaction using data stored in recoil.
 */
const useGasEstimation = () => {
  const { chainID, address, transactionData } = useRecoilValue(transactionState);

  const [loading, setLoading] = React.useState(true);
  // negative value should be treated as invalid
  const [estimatedGas, setEstimatedGas] = React.useState<any>(-1);

  React.useEffect(() => {
    estimateGasFee(transactionData, chainID, address)
      .then((response) => {
        setEstimatedGas(response);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return {
    loading,
    estimatedGas,
  };
};

export default useGasEstimation;

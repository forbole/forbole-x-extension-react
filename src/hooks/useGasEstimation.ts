import React from 'react';
import { transactionState } from '@recoil/transaction';
import { useRecoilValue } from 'recoil';
import estimateGasFee from 'lib/estimateGasFees';

const useGasEstimation = () => {
  const { chainID, address, transactionData } = useRecoilValue(transactionState);

  const [loading, setLoading] = React.useState(true);
  const [estimatedGas, setEstimatedGas] = React.useState<any>(-1);

  React.useEffect(() => {
    estimateGasFee(transactionData, chainID, address)
      .then((response) => {
        console.log('estimated', response);
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

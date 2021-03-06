import React from 'react';
import getSendTxForAddress from 'services/fetches/getSendTxForAddress';
import getReceiveTxForAddress from 'services/fetches/getReceiveTxForAddress';
import _ from 'lodash';

/**
 * Fetch transactions for a given address on a chain
 */
const useTxForAddress = ({ address, chain }: { address: string; chain: string }) => {
  const [txData, setTxData] = React.useState([]);
  const [error, setError] = React.useState<any>(undefined);
  const [loading, setLoading] = React.useState(true);

  const fetchTx = React.useCallback(async () => {
    setLoading(true);
    setError(undefined);
    try {
      const promises = await Promise.all([
        getSendTxForAddress(address, chain),
        getReceiveTxForAddress(address, chain),
      ]);

      const [sendTxs, receiveTxs] = promises;
      const tempTxData = [
        ...(await sendTxs.json()).tx_responses,
        ...(await receiveTxs.json()).tx_responses,
      ];

      const uniqueTxs = _.uniqBy(tempTxData, 'height').sort((a, b) => b.height - a.height);

      setTxData(uniqueTxs);
    } catch (err) {
      setError(error.toString());
    } finally {
      setLoading(false);
    }
  }, [address]);

  React.useEffect(() => {
    if (!address) return;
    fetchTx();
  }, [address]);

  return {
    txData,
    error,
    loading,
  };
};

export default useTxForAddress;

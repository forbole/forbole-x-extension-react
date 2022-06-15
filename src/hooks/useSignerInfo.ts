import React from 'react';
import { SigningStargateClient } from '@cosmjs/stargate';
import chains from 'misc/chains';
import { useRecoilValue } from 'recoil';
import { accountsState } from '@recoil/accounts';

/**
 * A hook that retrieves the signerInfo data from an address
 */
const useSignerInfo = (address: string) => {
  const accounts = useRecoilValue(accountsState);

  const account = React.useMemo(() => {
    if (accounts.length > 0) return undefined;
    return accounts.find((_account) => _account.address === address);
  }, [accounts]);

  const [loading, setLoading] = React.useState(true);

  const [signerInfo, setSignerInfo] = React.useState({
    accountNumber: 0,
    sequence: 0,
    chainId: '',
  });

  React.useEffect(() => {
    const getSequenceAndChainId = async (): Promise<any> => {
      const { chain } = account;
      try {
        const client = await SigningStargateClient.connect(chains[chain].rpcApiUrl);
        const { accountNumber, sequence } = await client.getSequence(address);
        const chainId = await client.getChainId();
        setSignerInfo({ accountNumber, sequence, chainId });
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    if (account) getSequenceAndChainId();
  }, [account]);

  return {
    loading,
    signerInfo,
  };
};

export default useSignerInfo;

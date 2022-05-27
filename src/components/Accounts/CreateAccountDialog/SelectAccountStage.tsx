import React, { useCallback, useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { fetchAvailableAccountBalance } from '../../../services/fetches/accounts';
import getWalletAddress from '../../../misc/getWalletAddress';
import { formatCoins } from '../../../misc/utils';
import { accountsState } from '../../../recoil/accounts';
import { useDecryptWallet } from '../../../recoil/wallets';
import Button from '../../Element/button';
import Checkbox from '../../Element/checkbox';
import Table from '../../Element/table';
import { ReactComponent as Loading } from '../../../assets/images/icons/loading.svg';

const NO_OF_ADDRESSES = 10;

type Props = {
  onSubmit: (accounts: { address: string; hdPath: HdPath }[]) => void;
  wallet: Wallet;
  chain: Chain;
  securityPassword?: string;
  ledgerTransport?: string;
};

const SelectAccountStage = ({
  onSubmit,
  wallet,
  chain,
  securityPassword,
  ledgerTransport,
}: Props) => {
  const accounts = useRecoilValue(accountsState);
  const [addresses, setAddresses] = useState<
    { address: string; balance: Coin[]; hdPath: HdPath }[]
  >([]);
  const [loading, setLoading] = useState(false);
  const [isEnteringHdPath, setIsEnteringHdPath] = useState(false);
  const [selectedAddresses, setSelectedAddresses] = useState<{ address: string; hdPath: HdPath }[]>(
    []
  );
  const decryptWallet = useDecryptWallet();

  const [hdPath, setHdPath] = useState({ account: '0', index: '0', change: '0' });
  const [hdAddress, setHdAddress] = useState('');
  const [hdBalance, setHdBalance] = useState([{ amount: '0', denom: chain.stakingDenom }]);

  const loadAddresses = useCallback(async () => {
    try {
      setLoading(true);
      const { mnemonic, privateKey } =
        wallet.type === 'ledger'
          ? { mnemonic: '', privateKey: '' }
          : decryptWallet(wallet.id, securityPassword);
      const noOfAddresses = wallet.type === 'private key' ? 1 : NO_OF_ADDRESSES;
      const addressesResult = [];
      for (let i = 0; i < noOfAddresses; i += 1) {
        const address = await getWalletAddress({
          prefix: chain.prefix,
          mnemonic,
          privateKey,
          ledgerTransport,
          hdPath: {
            coinType: chain.coinType,
            account: i,
            change: 0,
            index: 0,
          },
          ledgerAppName: chain.ledgerAppName,
        });
        addressesResult.push(address);
      }

      const balances = await Promise.all(
        addressesResult.map((a) => fetchAvailableAccountBalance(chain.chainId, a))
      );
      setAddresses(
        addressesResult.map((a, i) => ({
          address: a,
          balance: balances[i],
          hdPath: { account: i, change: 0, index: 0 },
        }))
      );
      setHdAddress(addressesResult[0]);
      setHdBalance(balances[0]);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  }, [wallet, securityPassword, ledgerTransport, chain, decryptWallet]);

  useEffect(() => {
    loadAddresses();
  }, [loadAddresses]);

  const loadHdAddress = useCallback(async () => {
    if (!hdPath.account || !hdPath.change || !hdPath.index) {
      return;
    }
    const { mnemonic, privateKey } =
      wallet.type === 'ledger'
        ? { mnemonic: '', privateKey: '' }
        : decryptWallet(wallet.id, securityPassword);
    const address = await getWalletAddress({
      prefix: chain.prefix,
      mnemonic,
      privateKey,
      ledgerTransport,
      hdPath: {
        coinType: chain.coinType,
        account: Number(hdPath.account),
        change: Number(hdPath.change),
        index: Number(hdPath.index),
      },
      ledgerAppName: chain.ledgerAppName,
    });
    setHdAddress(address);
    const balance = await fetchAvailableAccountBalance(chain.chainId, address);
    setHdBalance(balance);
  }, [wallet, securityPassword, ledgerTransport, chain, decryptWallet, hdPath]);

  useEffect(() => {
    if (isEnteringHdPath) {
      loadHdAddress();
    }
  }, [loadHdAddress, isEnteringHdPath]);

  return (
    <div className="p-5">
      {!isEnteringHdPath && (
        <>
          <p className="max-w-sm mb-2">Select account(s) you want to add</p>
          <div className="relative h-[360px] overflow-auto -mx-5 px-5">
            <Table
              head={['', '#', 'Address', <p className="text-right">Balance</p>]}
              rows={addresses.map((a, i) => {
                const isAddressExist = accounts.find((aa) => a.address === aa.address);
                return [
                  <Checkbox
                    disabled={isAddressExist}
                    checked={selectedAddresses.find((s) => s.address === a.address)}
                    onChange={() =>
                      setSelectedAddresses((sa) =>
                        sa.find((s) => s.address === a.address)
                          ? sa.filter((s) => s.address !== a.address)
                          : [...sa, { address: a.address, hdPath: a.hdPath }]
                      )
                    }
                  />,
                  <p className={isAddressExist ? 'opacity-50' : ''}>{i}</p>,
                  <p className={isAddressExist ? 'opacity-50' : ''}>
                    {`${a.address.slice(0, 10)}......${a.address.slice(-10)}`}
                  </p>,
                  <p className={isAddressExist ? 'opacity-50 text-right' : 'text-right'}>
                    {formatCoins(chain.chainId, a.balance)}
                  </p>,
                ];
              })}
            />
            {loading && (
              <div className="absolute top-0 left-0 right-0 bottom-0 flex justify-center items-center">
                <Loading className="w-12 h-12 nightwind-prevent text-primary-100 animate-spin" />
              </div>
            )}
          </div>
          {wallet.type !== 'private key' && (
            <button
              onClick={() => setIsEnteringHdPath(true)}
              className="text-primary-100 mt-4 hover:opacity-80"
            >
              Advanced account
            </button>
          )}
        </>
      )}

      {isEnteringHdPath && (
        <>
          <button
            onClick={() => setIsEnteringHdPath(false)}
            className="text-primary-100 mt-4 hover:opacity-80 mb-4"
          >
            Select account(s) you want to add
          </button>
          <p>Enter HD Derivation Path</p>
          <div className="flex items-center mt-2 mb-4">
            <p>m/44/{chain.coinType}'/</p>
            <input
              className="form-input bg-gray-200 p-1 rounded w-20 mx-2 text-center"
              value={hdPath.account}
              onChange={(e) => setHdPath((p) => ({ ...p, account: e.target.value }))}
            />
            <p>'/</p>
            <input
              className="form-input bg-gray-200 p-1 rounded w-20 mx-2 text-center"
              value={hdPath.change}
              onChange={(e) => setHdPath((p) => ({ ...p, change: e.target.value }))}
            />
            <p>'/</p>
            <input
              className="form-input bg-gray-200 p-1 rounded w-20 mx-2 text-center"
              value={hdPath.index}
              onChange={(e) => setHdPath((p) => ({ ...p, index: e.target.value }))}
            />
          </div>
          <p>Account</p>
          <p className="text-font-200">{hdAddress}</p>
          {!!accounts.find((a) => a.address === hdAddress) && (
            <p className="text-sm text-red-500 nightwind-prevent">Account already exist</p>
          )}
          <p className="mt-4">Balance</p>
          <p className="text-font-200">{formatCoins(chain.chainId, hdBalance)}</p>
        </>
      )}
      <div className="absolute bottom-4 left-4 right-4">
        <Button
          disabled={
            !isEnteringHdPath
              ? !selectedAddresses.length
              : !!accounts.find((a) => a.address === hdAddress)
          }
          text="Next"
          onClick={() => {
            onSubmit(
              isEnteringHdPath
                ? [
                    {
                      address: hdAddress,
                      hdPath: {
                        account: Number(hdPath.account),
                        change: Number(hdPath.change),
                        index: Number(hdPath.index),
                      },
                    },
                  ]
                : selectedAddresses
            );
          }}
        />
      </div>
    </div>
  );
};

export default SelectAccountStage;

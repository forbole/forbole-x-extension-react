import { useParams } from 'react-router-dom';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { currentWalletState } from '@recoil/wallets';
import { accountDetailState } from '@recoil/accounts';
import _ from 'lodash';
import useCurrencyValue from 'hooks/useCurrencyValue';
import React from 'react';
import { currencyState } from '@recoil/settings';
import MsgUtils from 'lib/MsgUtils';
import { transactionState } from '@recoil/transaction';
import { useNavigate } from 'react-router';

/**
 * Hooks for the UndelegatePage
 */
const useHooks = () => {
  const { address, validatorAddress } = useParams();
  const navigate = useNavigate();

  const [memo, setMemo] = React.useState<string>('');
  const [undelegateAmount, setUndelegateAmount] = React.useState<{ [index: string]: number }>({});

  const setTxState = useSetRecoilState(transactionState);

  const currency = useRecoilValue(currencyState);
  const wallet = useRecoilValue(currentWalletState);
  const account = useRecoilValue(
    accountDetailState({
      walletId: wallet.id,
      address,
    })
  );

  const { value: currencyValue } = useCurrencyValue(
    _.get(account, 'prices[0].token.coingeckoId'),
    currency
  );

  const delegatedAmount = React.useMemo(() => {
    return account.delegations.find((x) => x.validator === validatorAddress).balance;
  }, [account, validatorAddress]);

  const onConfirm = React.useCallback(() => {
    const undelegateMsg = MsgUtils.createUndelegateMessage({
      delegatorAddress: account.address,
      validatorAddress,
      undelegateAmount: {
        amount: String(undelegateAmount[validatorAddress]),
        denom: _.get(account, 'prices[0].token.denom'),
      },
    });

    setTxState({
      address: account.address,
      chainID: account.chain,
      transactionData: {
        memo,
        msgs: undelegateMsg,
      },
    });

    navigate('/confirm-tx');
  }, [memo, undelegateAmount]);

  return {
    account,
    currencyValue,
    delegatedAmount,
    memo,
    setMemo,
    validatorAddress,
    undelegateAmount,
    setUndelegateAmount,
    onConfirm,
  };
};

export default useHooks;

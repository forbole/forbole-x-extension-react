import { useParams } from 'react-router-dom';
import { useRecoilValue, useRecoilValueLoadable, useSetRecoilState } from 'recoil';
import { currentWalletState } from '@recoil/wallets';
import { accountDetailState } from '@recoil/accounts';
import _ from 'lodash';
import useCurrencyValue from 'hooks/useCurrencyValue';
import { validatorsState } from '@recoil/validators';
import React from 'react';
import { currencyState } from '@recoil/settings';
import MsgUtils from 'lib/MsgUtils';
import { transactionState } from '@recoil/transaction';
import { useNavigate } from 'react-router';
import { formatCoinV2 } from 'misc/utils';

/**
 * Hooks for the UndelegatePage
 */
const useHooks = () => {
  const { address, validatorAddress } = useParams();
  const navigate = useNavigate();

  const [redelegations, setRedelegations] = React.useState<any>({});

  const setTxState = useSetRecoilState(transactionState);

  const currency = useRecoilValue(currencyState);
  const wallet = useRecoilValue(currentWalletState);
  const account = useRecoilValue(
    accountDetailState({
      walletId: wallet.id,
      address,
    })
  );

  const token = _.get(account, 'prices[0].token');

  const { loading: isCurrencyValueLoading, value: currencyValue } = useCurrencyValue(
    token.coingeckoId,
    currency
  );

  const validators = useRecoilValueLoadable(validatorsState({ chainId: account.chain }));

  const delegatedAmount = account.delegations.find((x) => x.validator === validatorAddress).balance;

  const [memo, setMemo] = React.useState<any>();

  const onConfirm = React.useCallback(() => {
    const redelegateMsg = MsgUtils.createUndelegateMessage({
      delegatorAddress: account.address,
      validatorAddress,
      undelegateAmount: {
        amount: String(redelegations[validatorAddress]),
        denom: _.get(account, 'prices[0].token.denom'),
      },
    });

    setTxState({
      address: account.address,
      chainID: account.chain,
      transactionData: {
        memo,
        msgs: redelegateMsg,
      },
    });

    navigate('/confirm-tx');
  }, [memo, redelegations]);

  const formattedCoin = formatCoinV2(account.chain, delegatedAmount);

  console.log('cur value', currencyValue);
  return {
    account,
    isCurrencyValueLoading,
    currencyValue,
    validators,
    delegatedAmount,
    memo,
    setMemo,
    validatorAddress,
    redelegations,
    setRedelegations,
    onConfirm,
    formattedCoin,
  };
};

export default useHooks;

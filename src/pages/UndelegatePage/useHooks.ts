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
import { formatCoinV2 } from 'misc/utils';
import FormatUtils from 'lib/FormatUtils';

/**
 * Hooks for the UndelegatePage
 */
const useHooks = () => {
  const { address, validatorAddress } = useParams();
  const navigate = useNavigate();
  const currency = useRecoilValue(currencyState);
  const wallet = useRecoilValue(currentWalletState);
  const currencyS = useRecoilValue(currencyState);
  const account = useRecoilValue(
    accountDetailState({
      walletId: wallet.id,
      address,
      currency: currencyS,
    })
  );

  const delegatedAmount = React.useMemo(() => {
    return account.delegations.find((x) => x.validator === validatorAddress).balance;
  }, [account, validatorAddress]);

  const formattedCoin = formatCoinV2(account.chain, delegatedAmount);

  const [memo, setMemo] = React.useState<string>('');
  const [undelegateAmount, setUndelegateAmount] = React.useState<number>(formattedCoin.amount);
  const [percent, setPercent] = React.useState<any>(100);

  const setTxState = useSetRecoilState(transactionState);

  const { value: currencyValue } = useCurrencyValue(
    _.get(account, 'prices[0].token.coingeckoId'),
    currency
  );

  const onConfirm = React.useCallback(() => {
    const undelegateMsg = MsgUtils.createUndelegateMessage({
      delegatorAddress: account.address,
      validatorAddress,
      undelegateAmount: {
        amount: String(undelegateAmount),
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

  const handleChange = React.useCallback(
    (inputType: 'amount' | 'percent' | 'slider') => (event: any, value?: any) => {
      const targetValue = event.target.value;

      const { amount } = formattedCoin;

      if (inputType === 'amount') {
        setUndelegateAmount(targetValue);
        setPercent(FormatUtils.decimalToPercent(targetValue / amount));
      }
      if (inputType === 'percent') {
        setUndelegateAmount(amount * (Number(targetValue) / 100));
        setPercent(Math.min(100, Number(targetValue)));
      }
      if (inputType === 'slider') {
        setPercent(FormatUtils.decimalToPercent(Number(value) * 100));
        setUndelegateAmount(amount * Number(value));
      }
    },
    [delegatedAmount, percent]
  );

  return {
    account,
    currencyValue,
    memo,
    setMemo,
    validatorAddress,
    undelegateAmount,
    onConfirm,
    percent,
    formattedCoin,
    handleChange,
  };
};

export default useHooks;

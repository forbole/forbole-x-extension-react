import React from 'react';
import { useParams } from 'react-router-dom';
import { useRecoilValue, useRecoilValueLoadable, useSetRecoilState } from 'recoil';
import { transactionState } from '@recoil/transaction';
import { currentWalletState } from '@recoil/wallets';
import { accountDetailState } from '@recoil/accounts';
import useCurrencyValue from 'hooks/useCurrencyValue';
import _ from 'lodash';
import { validatorsState } from '@recoil/validators';
import { formatCoinV2 } from 'misc/utils';
import MsgUtils from 'lib/MsgUtils';
import { RedelegationStage } from 'pages/RedelegatePage/index';
import { useNavigate } from 'react-router';
import { currencyState } from '@recoil/settings';

/**
 * Hooks for the RedelegatePage
 */
const useHooks = () => {
  const navigate = useNavigate();

  const { address, validatorAddress } = useParams();

  const setTxState = useSetRecoilState(transactionState);

  const [stage, setStage] = React.useState<any>(RedelegationStage.stageOne);

  const wallet = useRecoilValue(currentWalletState);
  const currencyS = useRecoilValue(currencyState);
  const account = useRecoilValue(
    accountDetailState({
      walletId: wallet.id,
      address,
      currency: currencyS,
    })
  );

  const { value: currencyValue, currency } = useCurrencyValue(
    _.get(account, 'prices[0].token.coingeckoId')
  );

  const validators = useRecoilValueLoadable(validatorsState({ chainId: account.chain }));

  const fromValidator = React.useMemo(() => {
    if (validators.state !== 'hasValue') return null;

    return validators.contents.find((v) => v.address === validatorAddress);
  }, [validators.state]);

  const delegatedAmount = React.useMemo(
    () => account.delegations.find((x) => x.validator === validatorAddress).balance,
    [account]
  );

  const formattedCurrentDelegatedAmount = React.useMemo(() => {
    return formatCoinV2(account.chain, delegatedAmount);
  }, [delegatedAmount]);

  const [amountToRedelegate, setAmountToRedelegate] = React.useState(
    formattedCurrentDelegatedAmount.amount
  );

  const handleConfirmStageOne = React.useCallback(() => {
    setStage(RedelegationStage.stageTwo);
  }, [stage]);

  const handleConfirmStageTwo = React.useCallback(
    ({
      finalRedelegationAmount,
      selectedValidatorAddress,
      memo,
    }: {
      finalRedelegationAmount: number;
      selectedValidatorAddress: string;
      memo: string;
    }) => {
      const msgs = MsgUtils.createRedelegateMessage({
        delegatorAddress: account.address,
        redelegations: [
          {
            fromValidator: fromValidator.address,
            toValidator: selectedValidatorAddress,
            amount: finalRedelegationAmount,
          },
        ],
        stakingDenom: formattedCurrentDelegatedAmount.token.denom,
      });

      setTxState({
        address: account.address,
        chainID: account.chain,
        transactionData: {
          msgs,
          memo,
        },
      });

      navigate('/confirm-tx');
    },
    [account, fromValidator, formattedCurrentDelegatedAmount]
  );

  const backCallback = React.useCallback(() => {
    if (stage === RedelegationStage.stageOne) {
      navigate(-1);
    }
    if (stage === RedelegationStage.stageTwo) {
      setStage(RedelegationStage.stageOne);
    }
  }, [stage]);

  return {
    stage,
    account,
    currencyValue,
    currency,
    validators,
    fromValidator,
    formattedCurrentDelegatedAmount,
    amountToRedelegate,
    setAmountToRedelegate,
    handleConfirmStageOne,
    handleConfirmStageTwo,
    backCallback,
  };
};

export default useHooks;

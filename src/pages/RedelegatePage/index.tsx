import React from 'react';
import { useRecoilValue, useRecoilValueLoadable } from 'recoil';
import { useNavigate } from 'react-router';
import Layout from 'components/Layout/layout';
import { currentWalletState } from '@recoil/wallets';
import { accountDetailState } from '@recoil/accounts';
import { useParams } from 'react-router-dom';
import { validatorsState } from '@recoil/validators';
import { useTranslation } from 'react-i18next';
import RedelegateStageOne from 'pages/RedelegatePage/components/RedelegateStageOne';
import useCurrencyValue from 'hooks/useCurrencyValue';
import _ from 'lodash';
import { formatCoinV2 } from 'misc/utils';

export enum RedelegationStage {
  stageOne,
  stageTwo,
}

const RedelegatePage = () => {
  const { t } = useTranslation('redelegate');
  const navigate = useNavigate();
  const { address, validatorAddress } = useParams();

  const [stage, setStage] = React.useState<any>(RedelegationStage.stageOne);

  const wallet = useRecoilValue(currentWalletState);
  const account = useRecoilValue(
    accountDetailState({
      walletId: wallet.id,
      address,
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
    () => account.delegations.find((x) => x.validator === fromValidator.address).balance,
    [account, fromValidator]
  );

  const formattedCoin = React.useMemo(() => {
    return formatCoinV2(account.chain, delegatedAmount);
  }, [delegatedAmount]);

  const [amountToRedelegate, setAmountToRedelegate] = React.useState(formattedCoin.amount);

  const onConfirmStageOne = React.useCallback(() => {
    setStage(RedelegationStage.stageTwo);
  }, [amountToRedelegate, stage]);

  const backCallback = () => {
    if (stage === RedelegationStage.stageOne) {
      navigate(-1);
    }
    if (stage === RedelegationStage.stageTwo) {
      setStage(RedelegationStage.stageOne);
    }
  };

  return (
    <Layout title={t('staking:redelegate')} backCallback={backCallback}>
      {stage === RedelegationStage.stageOne && (
        <RedelegateStageOne
          delegatedAmount={delegatedAmount}
          amountToRedelegate={amountToRedelegate}
          setAmountToRedelegate={setAmountToRedelegate}
          validator={fromValidator}
          onConfirm={onConfirmStageOne}
          currency={currency}
          currencyValue={currencyValue}
          formattedCoin={formattedCoin}
          chainID={account.chain}
        />
      )}
      {stage === RedelegationStage.stageTwo && <div>Hello world</div>}
    </Layout>
  );
};

export default RedelegatePage;

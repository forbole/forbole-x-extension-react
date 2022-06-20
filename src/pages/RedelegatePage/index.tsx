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

export enum RedelegationStage {
  stageOne,
  stageTwo,
}

const RedelegatePage = () => {
  const { t } = useTranslation('redelegate');
  const navigate = useNavigate();
  const { address, validatorAddress } = useParams();

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

  const [stage, setStage] = React.useState(RedelegationStage.stageOne);

  const [redelegationAmount, setRedelegationAmount] = React.useState(0);

  const onConfirmStageOne = React.useCallback(
    (value: number) => {
      console.log(redelegationAmount);
      setRedelegationAmount(value);
    },
    [redelegationAmount]
  );

  return (
    <Layout
      title={t('staking:redelegate')}
      backCallback={() => {
        if (stage === RedelegationStage.stageOne) navigate(-1);
        else setStage(RedelegationStage.stageOne);
      }}
    >
      {stage === RedelegationStage.stageOne && (
        <RedelegateStageOne
          delegatedAmount={
            account.delegations.find((x) => x.validator === fromValidator.address).balance
          }
          validator={fromValidator}
          onConfirm={onConfirmStageOne}
          currency={currency}
          currencyValue={currencyValue}
          account={account}
        />
      )}
    </Layout>
  );
};

export default RedelegatePage;

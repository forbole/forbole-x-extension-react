import React from 'react';
import { useRecoilValue, useRecoilValueLoadable } from 'recoil';
import { useNavigate } from 'react-router';
import Layout from 'components/Layout/layout';
import { currentWalletState } from '@recoil/wallets';
import { accountDetailState } from '@recoil/accounts';
import { useParams } from 'react-router-dom';
import { validatorsState } from '@recoil/validators';
import { useTranslation } from 'react-i18next';
import RedelegateStageOne from 'pages/RedelegationPage/components/RedelegateStageOne';

export enum RedelegationStage {
  stageOne,
  stageTwo,
}

const RedelegationPage = () => {
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

  const validators = useRecoilValueLoadable(validatorsState({ chainId: account.chain }));

  const fromValidator = React.useMemo(() => {
    if (validators.state !== 'hasValue') return null;

    return validators.contents.find((v) => v.address === validatorAddress);
  }, [validators.state]);

  const [stage, setStage] = React.useState(RedelegationStage.stageOne);

  const onConfirmStageOne = React.useCallback(() => {}, []);

  return (
    <Layout
      title={t('title')}
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
          chainID={account.chain}
          validator={fromValidator}
          onConfirm={onConfirmStageOne}
        />
      )}
    </Layout>
  );
};

export default RedelegationPage;

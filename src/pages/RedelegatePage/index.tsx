import React from 'react';
import Layout from 'components/Layout/layout';
import { useTranslation } from 'react-i18next';
import FormatUtils from 'lib/FormatUtils';
import RedelegateStageOne from './components/RedelegateStageOne';
import RedelegateStageTwo from './components/RedelegateStageTwo';
import useHooks from './useHooks';

export enum RedelegationStage {
  stageOne,
  stageTwo,
}

const RedelegatePage = () => {
  const { t } = useTranslation('redelegate');

  const {
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
  } = useHooks();

  return (
    <Layout title={t('staking:redelegate')} backCallback={backCallback}>
      {stage === RedelegationStage.stageOne && (
        <RedelegateStageOne
          amountToRedelegate={amountToRedelegate}
          setAmountToRedelegate={setAmountToRedelegate}
          validator={fromValidator}
          onConfirm={handleConfirmStageOne}
          currency={currency}
          currencyValue={currencyValue}
          formattedCurrentDelegatedAmount={formattedCurrentDelegatedAmount}
        />
      )}
      {stage === RedelegationStage.stageTwo && (
        <RedelegateStageTwo
          validators={validators.contents}
          account={account}
          maxDelegation={FormatUtils.convertNumberToCoin(
            amountToRedelegate,
            formattedCurrentDelegatedAmount.token.denom
          )}
          onConfirm={handleConfirmStageTwo}
          currency={currency}
          currencyValue={currencyValue}
        />
      )}
    </Layout>
  );
};

export default RedelegatePage;

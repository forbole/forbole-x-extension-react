import React, { useEffect } from 'react';
import { Loadable, useSetRecoilState } from 'recoil';
import keyBy from 'lodash/keyBy';
import chains from 'misc/chains';
import MsgUtils from 'lib/MsgUtils';
import { transactionState } from '@recoil/transaction';
import { useNavigate } from 'react-router';
import SelectAmount from './SelectAmount';
import SelectValidators from './SelectValidators';
import Dialog from '../../Element/dialog';
import useStateHistory from '../../../misc/useStateHistory';

export enum DelegationStage {
  SelectAmountStage = 'select amount',
  SelectValidatorsStage = 'select validators',
}

interface Content {
  title: string;
  content: React.ReactNode;
}

interface DelegationDialogProps {
  account: AccountDetail;
  open: boolean;
  onClose: (open: boolean) => void;
  validators: Loadable<Validator[]>;
  defaultValidator?: Validator;
}

const DelegationDialog: React.FC<DelegationDialogProps> = ({
  open,
  onClose,
  account,
  validators,
  defaultValidator,
}) => {
  const navigate = useNavigate();
  const [amount, setAmount] = React.useState(0);
  const validatorsMap = React.useMemo(() => keyBy(validators.contents, 'name'), [validators]);
  const [delegations, setDelegations] = React.useState<
    Array<{ amount: number; validator: Validator }>
  >([]);

  const setTxState = useSetRecoilState(transactionState);

  const [stage, setStage, toPrevStage, isPrevStageAvailable] = useStateHistory(
    DelegationStage.SelectAmountStage
  );

  useEffect(() => {
    if (!open) {
      setStage(DelegationStage.SelectAmountStage, true);
    }
  }, [open]);

  const confirmAmount = React.useCallback(
    (a: number) => {
      setAmount(a);
      setDelegations([{ amount: a, validator: (defaultValidator || {}) as Validator }]);
      setStage(DelegationStage.SelectValidatorsStage);
    },
    [setAmount, setStage, defaultValidator]
  );

  const confirmDelegations = React.useCallback(
    async (d: Array<{ amount: number; validator: Validator }>, memo: string) => {
      try {
        const tx = MsgUtils.createDelegateTxMsg({
          delegatorAddress: account.address,
          delegations: d,
          denom: chains[account.chain].stakingDenom,
        });

        setTxState({
          chainID: account.chain,
          address: account.address,
          transactionData: { memo, msgs: tx },
        });

        navigate('/confirm-tx');
      } catch (err) {
        // setLoading(false);
      }
    },
    [setStage, account]
  );

  const content: Content = React.useMemo(() => {
    switch (stage) {
      case DelegationStage.SelectAmountStage:
        return {
          title: 'Delegate',
          content: <SelectAmount account={account} onConfirm={confirmAmount} />,
        };
      case DelegationStage.SelectValidatorsStage:
        return {
          title: 'Delegate',
          content: (
            <SelectValidators
              account={account}
              delegations={delegations}
              amount={amount}
              denom={chains[account.chain].stakingDenom}
              onConfirm={confirmDelegations}
              validatorsMap={validatorsMap}
            />
          ),
        };
      default:
        return null;
    }
  }, [stage, account, onClose, setStage, toPrevStage]);

  return (
    <Dialog
      title={content.title}
      open={open}
      onClose={() => {
        onClose(false);
      }}
      toPrevStage={isPrevStageAvailable ? toPrevStage : null}
    >
      {content.content}
    </Dialog>
  );
};

export default DelegationDialog;

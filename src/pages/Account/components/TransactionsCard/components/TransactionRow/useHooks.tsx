import React from 'react';
import { Trans, useTranslation } from 'react-i18next';
import IconDelegateTx from 'components/svg/IconDelegateTx';
import { formatCoin } from 'misc/utils';
import IconTx from 'components/svg/IconTx';
import IconSendTx from 'components/svg/IconSendTx';
import { useRecoilValueLoadable } from 'recoil';
import _ from 'lodash';
import RowDescription from './RowDescription';
import { validatorsState } from '../../../../../../recoil/validators';
import RowTitle from './RowTitle';
import DescriptionLink from './DescriptionLink';

/**
 * Hooks for the TransactionRow component
 */
const useHooks = ({
  txhash,
  detail,
  chainID,
  type,
}: {
  txhash: string;
  detail: any;
  chainID: string;
  type: string;
}) => {
  const { t } = useTranslation('account');

  const validators = useRecoilValueLoadable(validatorsState({ chainId: chainID }));

  const findValidator = React.useCallback(
    (validatorAddr: string) => {
      if (validators.state !== 'hasValue')
        return {
          name: '',
          address: '',
        };

      return validators.contents.find((validator) => validator.address === validatorAddr);
    },
    [validators]
  );

  const content = React.useMemo(() => {
    if (validators.state !== 'hasValue') return {};

    if (type.includes('MsgVote')) {
      return {
        title: t('transactions.rows.voteProposal', {
          proposalNum: detail[0].proposal_id,
          choice: t(`transactions.rows.${detail[0].option}`),
        }),
        description: t('transactions.rows.proposeBy', {
          user: 'TODO',
        }),
        icon: <IconDelegateTx />,
      };
    }
    if (type.includes('MsgBeginRedelegate')) {
      // map src and dst validator data

      const [first] = detail;
      const { validator_src_address, validator_dst_address } = first;

      const srcValidator = findValidator(validator_src_address);
      const dstValidator = findValidator(validator_dst_address);

      return {
        title: (
          <RowTitle txhash={txhash} chainID={chainID}>
            {t('transactions.rows.redelegate', {
              amount: formatCoin(chainID, detail[0].amount),
            })}
          </RowTitle>
        ),
        description: (
          <RowDescription>
            <Trans
              i18nKey="account:transactions.rows.fromToUser"
              components={{
                linkA: (
                  <DescriptionLink
                    hashOrAddr={_.get(srcValidator, 'address')}
                    type="validator"
                    chainID={chainID}
                  />
                ),
                linkB: (
                  <DescriptionLink
                    hashOrAddr={_.get(dstValidator, 'address')}
                    type="validator"
                    chainID={chainID}
                  />
                ),
              }}
              values={{
                userA: _.get(srcValidator, 'name', srcValidator?.address),
                userB: _.get(dstValidator, 'name', dstValidator?.address),
              }}
            />
          </RowDescription>
        ),
        icon: <IconDelegateTx />,
      };
    }
    if (type.includes('MsgSend'))
      return {
        title: (
          <RowTitle txhash={txhash} chainID={chainID}>
            {t('transactions.rows.send', {
              amount: formatCoin(chainID, detail[0].amount[0]),
            })}
          </RowTitle>
        ),
        description: (
          <RowDescription>
            <Trans
              i18nKey="account:transactions.rows.toUser"
              components={{
                linkA: (
                  <DescriptionLink
                    hashOrAddr={detail[0].to_address}
                    type="account"
                    chainID={chainID}
                  />
                ),
              }}
              values={{ user: detail[0].to_address }}
            />
          </RowDescription>
        ),
        icon: <IconTx />,
      };
    if (type.includes('MsgSetWithdrawAddress')) {
      return {
        title: t('transactions.rows.setWithdrawAddr'),
        description: t('transactions.rows.toAddr', { addr: detail[0].withdraw_address }),
        icon: <IconDelegateTx />,
      };
    }
    if (type.includes('MsgUndelegate')) {
      return {
        title: t('transactions.rows.undelegate', {
          amount: formatCoin(chainID, detail[0].amount),
        }),
        description: t('transactions.rows.fromUser', {
          user: detail[0].validator_address,
        }),
        icon: <IconDelegateTx />,
      };
    }
    if (type.includes('MsgUnjail'))
      return {
        title: t('transactions.rows.userUnjailed', {
          user: detail[0].validator_addr,
        }),
        description: t('transactions.rows.unjailed', {
          user: detail[0].validator_address,
        }),
        icon: <IconDelegateTx />,
      };
    // The format of these transactions is different in that detail is not an array
    if (type.includes('MsgWithdrawDelegatorReward'))
      return {
        title: t('transactions.rows.withdrawAmount', {
          amount: formatCoin(chainID, detail.amount),
        }),
        description: t('transactions.rows.fromUser', {
          user: detail.validator_address,
        }),
        icon: <IconTx />,
      };
    if (type.includes('MsgDelegate'))
      return {
        title: t('transactions.rows.delegateAmount', {
          amount: formatCoin(chainID, detail.amount),
        }),
        description: t('transactions.rows.toUser', {
          user: detail.validator_address,
        }),
        icon: <IconTx />,
      };
    return {
      title: '',
      description: '',
      icon: <IconSendTx />,
    };
  }, [detail, validators.state]);

  return {
    content,
  };
};

export default useHooks;

import React from 'react';
import { Trans, useTranslation } from 'react-i18next';
import IconDelegateTx from 'components/svg/IconDelegateTx';
import { formatCoin } from 'misc/utils';
import IconTx from 'components/svg/IconTx';
import IconSendTx from 'components/svg/IconSendTx';
import _ from 'lodash';
import FormatUtils from 'lib/FormatUtils';
import RowDescription from './RowDescription';
import RowTitle from './RowTitle';
import DescriptionLink from './DescriptionLink';

/**
 * Hooks for the TransactionRow component
 */
const useHooks = ({
  txhash,
  detail,
  extraData,
  chainID,
  type,
}: {
  txhash: string;
  detail: any;
  chainID: string;
  type: string;
  extraData: any;
}) => {
  const { t } = useTranslation('account');

  const content = React.useMemo(() => {
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
      const { validatorA, validatorB } = extraData;
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
                    hashOrAddr={_.get(validatorA, 'address')}
                    type="validator"
                    chainID={chainID}
                  />
                ),
                linkB: (
                  <DescriptionLink
                    hashOrAddr={_.get(validatorB, 'address')}
                    type="validator"
                    chainID={chainID}
                  />
                ),
              }}
              values={{
                userA: FormatUtils.getNameOrAddress(validatorA),
                userB: FormatUtils.getNameOrAddress(validatorB),
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
        title: (
          <RowTitle txhash={txhash} chainID={chainID}>
            {t('transactions.rows.setWithdrawAddr')}
          </RowTitle>
        ),
        description: (
          <RowDescription>
            <Trans
              i18nKey="account:transactions.rows.toAddr"
              values={{
                addr: detail[0].withdraw_address,
              }}
            />
          </RowDescription>
        ),
        icon: <IconDelegateTx />,
      };
    }
    if (type.includes('MsgUndelegate')) {
      const { validator } = extraData;

      return {
        title: (
          <RowTitle txhash={txhash} chainID={chainID}>
            {t('transactions.rows.undelegate', {
              amount: formatCoin(chainID, detail[0].amount),
            })}
          </RowTitle>
        ),
        description: (
          <RowDescription>
            <Trans
              i18nKey="account:transactions.rows.fromUser"
              components={{
                linkA: (
                  <DescriptionLink
                    hashOrAddr={detail[0].to_address}
                    type="account"
                    chainID={chainID}
                  />
                ),
              }}
              values={{ user: FormatUtils.getNameOrAddress(validator) }}
            />
          </RowDescription>
        ),
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
    if (type.includes('MsgWithdrawDelegatorReward')) {
      const { validator } = extraData;

      return {
        title: (
          <RowTitle txhash={txhash} chainID={chainID}>
            {t('transactions.rows.withdrawAmount', {
              amount: formatCoin(chainID, detail.amount),
            })}
          </RowTitle>
        ),
        description: (
          <RowDescription>
            <Trans
              i18nKey="account:transactions.rows.fromUser"
              components={{
                linkA: (
                  <DescriptionLink
                    hashOrAddr={detail.validator_address}
                    type="validator"
                    chainID={chainID}
                  />
                ),
              }}
              values={{
                user: FormatUtils.getNameOrAddress(validator),
              }}
            />
          </RowDescription>
        ),
        icon: <IconTx />,
      };
    }
    if (type.includes('MsgDelegate')) {
      const { validator } = extraData;
      return {
        title: (
          <RowTitle txhash={txhash} chainID={chainID}>
            {t('transactions.rows.delegateAmount', {
              amount: formatCoin(chainID, detail.amount),
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
                    hashOrAddr={detail.delegator_address}
                    type="validator"
                    chainID={chainID}
                  />
                ),
              }}
              values={{
                user: FormatUtils.getNameOrAddress(validator),
              }}
            />
          </RowDescription>
        ),
        // description: t('transactions.rows.toUser', {
        //   user: detail.validator_address,
        // }),
        icon: <IconTx />,
      };
    }
    return {
      title: '',
      description: '',
      icon: <IconSendTx />,
    };
  }, [detail]);

  return {
    content,
  };
};

export default useHooks;

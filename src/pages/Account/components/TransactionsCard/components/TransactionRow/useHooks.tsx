import React from 'react';
import { Trans, useTranslation } from 'react-i18next';
import IconDelegateTx from 'components/svg/IconDelegateTx';
import { formatCoin } from 'misc/utils';
import IconTx from 'components/svg/IconTx';
import _ from 'lodash';
import FormatUtils from 'lib/FormatUtils';
import { useRecoilValueLoadable } from 'recoil';
import { Box, CircularProgress, Typography } from '@mui/material';
import chains from 'misc/chains';
import DescriptionLink from './DescriptionLink';
import { proposalQueryState } from '../../../../../../recoil/proposal';

/**
 * Hooks for the TransactionRow component
 */
const useHooks = ({
  detail,
  extraData,
  type,
  account,
}: {
  detail: any;
  type: string;
  extraData: any;
  account: Account;
}) => {
  const { chain: chainID } = account;

  // fetch proposal data if the tx type needs it
  const proposalData = useRecoilValueLoadable(
    proposalQueryState({
      chainID,
      proposalID: type.includes('MsgVote') ? detail[0].proposal_id : -1,
    })
  );

  const { t } = useTranslation('account');

  /**
   * Format the tx data into components that have links that redirect the user to the chain's
   * block explorer
   */
  const content = React.useMemo(() => {
    if (type.includes('MsgUnjail')) {
      const { validator } = extraData;
      return {
        title: (
          <Trans
            i18nKey="account:transactions.rows.userUnjailed"
            components={{
              linkA: (
                <DescriptionLink
                  hashOrAddr={detail[0].validator_addr}
                  type="validator"
                  chainID={chainID}
                />
              ),
            }}
            values={{
              validator: FormatUtils.getNameOrAddress(validator),
            }}
          />
        ),
        description: t('transactions.rows.unjailed'),
      };
    }
    if (type.includes('MsgMultiSend')) {
      /**
       * If the sender or recipient address is the same as the account's, the chain's
       * symbol will be shown instead of the address.
       */
      return {
        title: t('transactions.rows.multisend'),
        description: (
          <>
            <Trans
              i18nKey="account:transactions.rows.sendAmtToAddr"
              components={{
                linkA: (
                  <DescriptionLink
                    hashOrAddr={detail[0].inputs[0].address}
                    type="account"
                    chainID={chainID}
                  />
                ),
                wrapper: (
                  <Typography
                    sx={{
                      color: 'primary.main',
                    }}
                    // if sender addr is same as account addr, render it slightly larger so it
                    // stands out more
                    variant={detail[0].inputs[0].address === account.address ? 'body2' : 'body6'}
                  />
                ),
              }}
              values={{
                // if sender addr is same as account addr, show chain symbol instead of addr
                addr:
                  detail[0].inputs[0].address === account.address
                    ? chains[chainID].symbol
                    : detail[0].inputs[0].address,
                amount: formatCoin(chainID, detail[0].inputs[0].coins[0]),
              }}
            />
            {detail[0].outputs.map((output) => (
              <>
                <Box sx={{ marginTop: 1 }} />
                <Trans
                  i18nKey="account:transactions.rows.addrAmtReceived"
                  components={{
                    linkA: (
                      <DescriptionLink
                        hashOrAddr={output.address}
                        type="account"
                        chainID={chainID}
                      />
                    ),
                    wrapper: (
                      <Typography
                        sx={{
                          color: 'primary.main',
                        }}
                        // if recipient addr is same as account addr, make text larger
                        variant={output.address === account.address ? 'body2' : 'body6'}
                      />
                    ),
                  }}
                  values={{
                    // if recipient addr is same as account addr, show chain symbol instead of addr
                    addr:
                      output.address === account.address ? chains[chainID].symbol : output.address,
                    amount: formatCoin(chainID, output.coins[0]),
                  }}
                />
              </>
            ))}
          </>
        ),
        icon: <IconTx />,
      };
    }
    if (type.includes('MsgVote')) {
      if (proposalData.state !== 'hasValue') {
        return {
          title: t('transactions.rows.voteProposal', {
            proposalNum: detail[0].proposal_id,
            choice: t(`transactions.rows.${detail[0].option}`),
          }),
          description: <CircularProgress size={16} />,
          icon: <IconDelegateTx />,
        };
      }
      return {
        title: t('transactions.rows.voteProposal', {
          proposalNum: detail[0].proposal_id,
          choice: t(`transactions.rows.${detail[0].option}`),
        }),
        description: (
          <DescriptionLink hashOrAddr={detail[0].proposal_id} type="proposal" chainID={chainID}>
            {proposalData.contents.content.title}
          </DescriptionLink>
        ),
        icon: <IconDelegateTx />,
      };
    }
    if (type.includes('MsgBeginRedelegate')) {
      const { validatorA, validatorB } = extraData;
      return {
        title: t('transactions.rows.redelegate', {
          amount: formatCoin(chainID, detail[0].amount),
        }),
        description: (
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
        ),
        icon: <IconDelegateTx />,
      };
    }
    if (type.includes('MsgSend'))
      return {
        title: t('transactions.rows.send', {
          amount: formatCoin(chainID, detail[0].amount[0]),
        }),
        description: (
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
        ),
        icon: <IconTx />,
      };
    if (type.includes('MsgSetWithdrawAddress')) {
      return {
        title: t('transactions.rows.setWithdrawAddr'),
        description: (
          <Trans
            i18nKey="account:transactions.rows.toAddr"
            values={{
              addr: detail[0].withdraw_address,
            }}
            components={{
              linkA: (
                <DescriptionLink
                  hashOrAddr={detail[0].withdraw_address}
                  type="account"
                  chainID={chainID}
                />
              ),
            }}
          />
        ),
        icon: <IconDelegateTx />,
      };
    }
    if (type.includes('MsgUndelegate')) {
      const { validator } = extraData;

      return {
        title: t('transactions.rows.undelegate', {
          amount: formatCoin(chainID, detail[0].amount),
        }),
        description: (
          <Trans
            i18nKey="account:transactions.rows.fromUser"
            components={{
              linkA: (
                <DescriptionLink
                  hashOrAddr={detail[0].validator_address}
                  type="account"
                  chainID={chainID}
                />
              ),
            }}
            values={{ user: FormatUtils.getNameOrAddress(validator) }}
          />
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
        title: t('transactions.rows.withdrawAmount', {
          amount: formatCoin(chainID, detail.amount),
        }),
        description: (
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
        ),
        icon: <IconTx />,
      };
    }
    if (type.includes('MsgDelegate')) {
      const { validator } = extraData;
      return {
        title: t('transactions.rows.delegateAmount', {
          amount: formatCoin(chainID, detail.amount),
        }),
        description: (
          <Trans
            i18nKey="account:transactions.rows.toUser"
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
        ),
        icon: <IconTx />,
      };
    }
    return {};
  }, [detail]);

  return {
    content,
  };
};

export default useHooks;

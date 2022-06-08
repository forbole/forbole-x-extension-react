import React from 'react';
import { useRecoilValueLoadable } from 'recoil';
import { validatorsState } from '@recoil/validators';
import MsgUtils from 'lib/MsgUtils';
import _ from 'lodash';
import { useTranslation } from 'react-i18next';
import { Avatar, Box, CircularProgress, Divider, Typography } from '@mui/material';
import { formatCoin } from 'misc/utils';
import styles from './styles';

type Props = {
  /**
   * The transaction messages
   */
  msgs: TransactionMsg[];
};

/**
 * A component that renders a list of validators for Staking type txs
 */
const ConfirmTxValidatorList = ({ msgs }: Props) => {
  const { t } = useTranslation('confirmtx');

  const validators = useRecoilValueLoadable(
    validatorsState({
      chainId: MsgUtils.getChainIDWithDenom(_.get(msgs, '[0].value.amount.denom')),
    })
  );

  const validatorsAddresses = msgs.map((msg) => ({
    address: _.get(msg, 'value.validatorAddress'),
    amount: _.get(msg, 'value.amount'),
  }));

  const mapValidatorData = (validatorAddr: string) => {
    if (validators.state !== 'hasValue') return undefined;

    const matchedValidator = (validators.contents as Validator[]).find(
      (_v) => _v.address === validatorAddr
    );

    return {
      name: matchedValidator.name,
      image: matchedValidator.image,
    };
  };

  return (
    <Box sx={styles.container}>
      <Divider sx={{ marginBottom: 2 }} />

      <Typography sx={styles.titleText}>{t('delegate.delegateTo')}</Typography>

      {validatorsAddresses.map((validator, idx) => (
        <>
          <Box sx={styles.validatorContainer}>
            <Box sx={styles.avatarNameContainer}>
              {/* render this if validators selector does not have value yet */}
              {validators.state !== 'hasValue' ? (
                <>
                  <CircularProgress size={24} sx={styles.avatar} />

                  <Typography sx={styles.nameText}>{validator.address}</Typography>
                </>
              ) : (
                <>
                  {/* render this if validators selector has value */}
                  <Avatar sx={styles.avatar} src={mapValidatorData(validator.address).image} />
                  <Typography sx={styles.nameText}>
                    {mapValidatorData(validator.address).name}
                  </Typography>
                </>
              )}
            </Box>

            <Typography sx={styles.amountText}>
              {formatCoin(
                MsgUtils.getChainIDWithDenom(_.get(msgs, '[0].value.amount.denom')),
                validator.amount
              )}
            </Typography>
          </Box>
          {/* don't render divider for last item */}
          {idx !== validatorsAddresses.length - 1 && (
            <Divider sx={{ marginTop: 1, marginBottom: 2 }} />
          )}
        </>
      ))}
    </Box>
  );
};

export default ConfirmTxValidatorList;

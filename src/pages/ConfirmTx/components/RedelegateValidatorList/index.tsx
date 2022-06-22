import React from 'react';
import { useTranslation } from 'react-i18next';
import { useRecoilValueLoadable } from 'recoil';
import { validatorsState } from '@recoil/validators';
import MsgUtils from 'lib/MsgUtils';
import _ from 'lodash';
import { Avatar, Box, CircularProgress, Divider, Typography } from '@mui/material';
import { formatCoin } from 'misc/utils';
import styles from './styles';

type Props = {
  msgs: TransactionMsg[];
};

const RedelegateValidatorList = ({ msgs }: Props) => {
  const { t } = useTranslation('confirmTx');

  const validators = useRecoilValueLoadable(
    validatorsState({
      chainId: MsgUtils.getChainIDWithDenom(_.get(msgs, '[0].value.amount.denom')),
    })
  );

  const redelegationPairs = msgs.map((msg: TransactionMsgRedelegate) => ({
    fromValidator: msg.value.validatorSrcAddress,
    toValidator: msg.value.validatorDstAddress,
    amount: msg.value.amount,
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
      {redelegationPairs.map((x) => (
        <>
          <Typography sx={styles.titleText}>{t('redelegate.redelegateFrom')}</Typography>

          <Box sx={styles.validatorContainer}>
            <Box sx={styles.avatarNameContainer}>
              {/* render this if validators selector does not have value yet */}
              {validators.state !== 'hasValue' ? (
                <>
                  <CircularProgress size={24} sx={styles.avatar} />

                  <Typography sx={styles.nameText}>{x.fromValidator}</Typography>
                </>
              ) : (
                <>
                  {/* render this if validators selector has value */}
                  <Avatar sx={styles.avatar} src={mapValidatorData(x.fromValidator).image} />
                  <Typography sx={styles.nameText}>
                    {mapValidatorData(x.fromValidator).name}
                  </Typography>
                </>
              )}
            </Box>
          </Box>

          <Divider sx={styles.bottomDivider} />

          <Typography sx={styles.titleText}>{t('redelegate.redelegateTo')}</Typography>

          <Box sx={styles.validatorContainer}>
            <Box sx={styles.avatarNameContainer}>
              {/* render this if validators selector does not have value yet */}
              <Box sx={styles.toValidatorGroup}>
                {validators.state !== 'hasValue' ? (
                  <>
                    <CircularProgress size={24} sx={styles.avatar} />

                    <Typography sx={styles.nameText}>{x.toValidator}</Typography>
                  </>
                ) : (
                  <>
                    <Avatar sx={styles.avatar} src={mapValidatorData(x.toValidator).image} />
                    <Typography sx={styles.nameText}>
                      {mapValidatorData(x.toValidator).name}
                    </Typography>
                  </>
                )}
              </Box>
            </Box>
            <Typography>
              {formatCoin(
                MsgUtils.getChainIDWithDenom(_.get(msgs, '[0].value.amount.denom')),
                x.amount
              )}
            </Typography>
          </Box>
        </>
      ))}
    </Box>
  );
};

export default RedelegateValidatorList;

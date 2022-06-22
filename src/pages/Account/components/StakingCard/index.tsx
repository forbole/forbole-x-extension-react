import React, { useState } from 'react';
import { Loadable } from 'recoil';
import chains from 'misc/chains';
import ArrowRight from 'components/svg/ArrowRight';
import { Box, Button, Paper, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import StakingTabs from '../StakingTabs';
import useStyles from './useStyles';

type Props = {
  account: Loadable<AccountDetail>;
  validators: Loadable<Validator[]>;
};

const StakingCard = ({ account, validators }: Props) => {
  const { t } = useTranslation('account');

  const tabs = [{ title: 'Delegation' }, { title: 'Redelegation' }, { title: 'Unbonding' }];

  const [tabIndex, setTabIndex] = useState(0);
  const styles = useStyles({ tabIndex });
  const chain = chains[account.contents?.chain];

  return (
    <Paper sx={styles.container}>
      <Box>
        <Box sx={styles.headerContainer}>
          <Typography variant="h5">{t('staking.title')}</Typography>
          <ArrowRight />
        </Box>
        <Box my={3} sx={styles.tabContainer}>
          {tabs.map((e, index) => (
            <Button
              disableRipple
              variant="text"
              onClick={() => {
                setTabIndex(index);
              }}
              sx={{
                ...styles.tabButton,
                color: tabIndex === index ? 'custom.white' : 'custom.grey',
              }}
            >
              <Typography variant="body1">{e.title}</Typography>
            </Button>
          ))}
          <Box sx={styles.tabIndicator} />
        </Box>
      </Box>
      {chain && (
        <StakingTabs
          tabIndex={tabIndex}
          chain={chain}
          validators={validators.contents || []}
          delegations={account.contents?.delegations || []}
          redelegations={account.contents?.redelegations || []}
          unbonding={account.contents?.unbonding || []}
        />
      )}
    </Paper>
  );
};

export default StakingCard;

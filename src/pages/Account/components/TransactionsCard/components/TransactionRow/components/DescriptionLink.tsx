import React from 'react';
import { Link } from '@mui/material';
import BlockExplorerUtils from 'lib/BlockExplorerUtils';

type Props = {
  hashOrAddr: string;

  type: 'account' | 'validator' | 'tx' | 'proposal';

  chainID: string;
};

/**
 * Convenience component to create an external link for Transactions
 */
const DescriptionLink: React.FC<Props> = ({ children, hashOrAddr, type, chainID }) => {
  const link = () => {
    if (type === 'account')
      return BlockExplorerUtils.createAccountURL({ chainID, accountAddr: hashOrAddr });
    if (type === 'validator')
      return BlockExplorerUtils.createValidatorURL({ chainID, validatorAddr: hashOrAddr });
    if (type === 'tx')
      return BlockExplorerUtils.createTxHistoryURL({ chainID, txhash: hashOrAddr });
    if (type === 'proposal')
      return BlockExplorerUtils.createProposalsURL({ chainID, proposalID: hashOrAddr });

    return '';
  };

  return (
    <Link
      sx={{
        color: 'primary.main',
        textDecoration: 'none',
        textDecorationColor: 'text.primary',
        '&:hover': {
          textDecoration: 'underline',
          textDecorationColor: 'text.primary',
        },
      }}
      href={link()}
      target="_blank"
      rel="noopener"
    >
      {children}
    </Link>
  );
};

export default DescriptionLink;

import React from 'react';
import { Link } from '@mui/material';
import BlockExplorerUtils from 'lib/BlockExplorerUtils';
import _ from 'lodash';

type Props = {
  hashOrAddr: string;

  type: 'account' | 'validator' | 'tx';

  chainID: string;
};

/**
 * Created an external link for use in transactionRow descriptions
 */
const DescriptionLink: React.FC<Props> = ({ children, hashOrAddr, type, chainID }) => {
  const link = () => {
    if (type === 'account')
      return BlockExplorerUtils.createAccountURL({ chainID, accountAddr: hashOrAddr });
    if (type === 'validator')
      return BlockExplorerUtils.createValidatorURL({ chainID, validatorAddr: hashOrAddr });
    if (type === 'tx')
      return BlockExplorerUtils.createTxHistoryURL({ chainID, txhash: hashOrAddr });

    return '';
  };

  return (
    <Link
      sx={{
        color: 'inherit',
        textDecoration: 'none',
        '&:hover': {
          textDecoration: 'underline',
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

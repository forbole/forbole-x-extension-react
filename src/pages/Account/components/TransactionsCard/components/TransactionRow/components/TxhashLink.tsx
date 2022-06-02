import React from 'react';
import { Box, Typography } from '@mui/material';
import DescriptionLink from './DescriptionLink';

type Props = {
  txhash: string;

  chainID: string;
};

/**
 * Dumb component to render txhash that redirects to external block explorer
 */
const TxhashLink: React.FC<Props> = ({ txhash, chainID }) => {
  return (
    <Box
      sx={{ marginBottom: 2, textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'no-wrap' }}
    >
      <DescriptionLink hashOrAddr={txhash} type="tx" chainID={chainID}>
        <Typography
          sx={{
            color: 'primary.main',
          }}
          variant="body6"
        >
          #{txhash}
        </Typography>
      </DescriptionLink>
    </Box>
  );
};

export default TxhashLink;

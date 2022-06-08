import React from 'react';
import { Box, CircularProgress, Divider, Typography } from '@mui/material';

type Props = {
  label: string;

  content: string;

  isPending?: boolean;
};

/**
 * A row in the ConfirmTx window
 */
const ConfirmTxRow = ({ label, content, isPending }: Props) => {
  return (
    <Box sx={{ paddingBottom: 1, paddingLeft: 2, paddingRight: 2 }}>
      <Divider sx={{ marginBottom: 1 }} />

      <Typography>{label}</Typography>

      {isPending ? (
        <CircularProgress size={32} />
      ) : (
        <Typography
          sx={{
            color: 'text.secondary',
          }}
        >
          {content}
        </Typography>
      )}
    </Box>
  );
};

export default ConfirmTxRow;

import React from 'react';
import { Typography } from '@mui/material';

/**
 * Dumb component to render transaction row descriptions
 */
const RowDescription: React.FC = ({ children }) => {
  return (
    <Typography
      sx={{
        color: 'text.secondary',
      }}
      variant="body6"
    >
      {children}
    </Typography>
  );
};

export default RowDescription;

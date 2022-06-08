import React from 'react';
import { Avatar, Box, Typography } from '@mui/material';

type Props = {
  address: string;

  image: string;
};

const ValidatorLink = ({ address, image }: Props) => {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Avatar src={image} alt={`${address}-ava`} />
      <Typography>{address}</Typography>
    </Box>
  );
};

export default ValidatorLink;

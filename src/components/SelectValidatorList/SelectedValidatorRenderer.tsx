import React from 'react';
import { Box, Typography } from '@mui/material';
import Avatar from 'components/Element/avatar';

type Props = {
  validator: Validator;
};

/**
 * A component for rendering a selected validator in the SelectValidatorListComponent
 */
const SelectedValidatorRenderer = ({ validator, ...rest }: Props) => {
  return (
    <Box {...rest} display="flex" alignItems="center" flexDirection="row" width="100%">
      <Avatar size={8} src={validator?.image || ''} />
      <Typography sx={{ width: '80%', marginLeft: '8px', wordWrap: 'break-word' }}>
        {validator.name}
      </Typography>
    </Box>
  );
};

export default SelectedValidatorRenderer;

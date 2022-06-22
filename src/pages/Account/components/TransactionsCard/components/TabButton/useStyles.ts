import React from 'react';
import { SxProps } from '@mui/system';
import { Theme } from '@mui/material/styles';

/**
 * sx style definitions for the TransactionsCard component
 */
const useStyles = (isSelected: boolean): { [index: string]: SxProps<Theme> } => {
  const styles = React.useMemo(
    () => ({
      tabButton: {
        width: '30%',
        margin: 0.5,
        color: isSelected ? 'text.primary' : 'text.secondary',
        backgroundColor: isSelected ? 'primary.main' : 'grey.200',
        '&:hover': {
          backgroundColor: isSelected ? 'primary.main' : 'grey.200',
          opacity: 0.8,
        },
      },
    }),
    [isSelected]
  );

  return styles;
};

export default useStyles;

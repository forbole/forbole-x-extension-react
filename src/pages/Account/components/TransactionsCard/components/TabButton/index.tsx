import React from 'react';
import Fab from '@mui/material/Fab';
import { Typography } from '@mui/material';

type Props = {
  /**
   * The button label.
   */
  label: string;

  /**
   * What to do when the button is clicked.
   */
  onClick: () => void;

  /**
   * Is the button selected?
   */
  isSelected?: boolean;
};

/**
 * A tab button, for use in the TransactionCard component
 */
const TabButton = ({ label, onClick, isSelected }: Props) => {
  return (
    <Fab
      sx={{
        width: '30%',
        margin: 0.5,
        color: isSelected ? 'text.primary' : 'text.secondary',
        backgroundColor: isSelected ? 'primary.main' : 'grey.200',
        '&:hover': {
          backgroundColor: isSelected ? 'primary.main' : 'grey.200',
          opacity: 0.8,
        },
      }}
      size="small"
      variant="extended"
      arial-label={label}
      onClick={onClick}
    >
      <Typography sx={{ fontSize: 'small' }}>{label}</Typography>
    </Fab>
  );
};

export default TabButton;

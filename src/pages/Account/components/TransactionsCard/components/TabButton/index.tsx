import React from 'react';
import Fab from '@mui/material/Fab';
import { Typography } from '@mui/material';
import useStyles from './useStyles';

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
  const { tabButton } = useStyles(isSelected);

  return (
    <Fab sx={tabButton} size="small" variant="extended" arial-label={label} onClick={onClick}>
      <Typography fontSize="small">{label}</Typography>
    </Fab>
  );
};

export default TabButton;

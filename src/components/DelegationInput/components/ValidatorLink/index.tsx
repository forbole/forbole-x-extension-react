import React from 'react';
import { Avatar, Box, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import styles from './styles';

type Props = {
  /**
   * The validator's avatar (if applicable)
   */
  avatar: string;

  /**
   * The validator's name
   */
  name: string;

  /**
   * URL to redirect the user to when this component is clicked
   */
  blockexplorerURL: string;
};

/**
 * A namebox that displays the validator's name and redirects the user to the validator's info
 * on blockexplorer when clicked.
 */
const ValidatorLink = ({ avatar, name, blockexplorerURL }: Props) => {
  return (
    <Link to={blockexplorerURL} target="_blank">
      <Box sx={styles.container}>
        <Avatar sx={styles.avatar} src={avatar} />

        <Typography variant="body1" noWrap sx={styles.nameText}>
          {name}
        </Typography>
      </Box>
    </Link>
  );
};

export default ValidatorLink;

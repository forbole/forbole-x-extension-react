import React from 'react';
import { Box, Button, Divider, Menu, MenuItem, Typography } from '@mui/material';
import DropdownIcon from 'components/svg/DropdownIcon';
import styles from './styles';

type Props = {
  label: string;

  selectedValue: string;

  values: any[];

  onChange: (_index: number) => void;

  placeholder?: string;
};

const MUIDropdown = ({ placeholder, label, selectedValue, values, onChange }: Props) => {
  const [menuOpened, setMenuOpened] = React.useState(false);
  const anchorRef = React.useRef<any>();

  return (
    <Box sx={styles.container}>
      <Typography variant="subtitle1">{label}</Typography>
      <Button
        ref={anchorRef}
        onClick={() => setMenuOpened(true)}
        variant="outlined"
        sx={styles.dropdownButton}
      >
        <Typography
          color={selectedValue ? 'text.primary' : 'text.secondary'}
          sx={styles.contentText}
          variant="subtitle1"
        >
          {selectedValue || placeholder}
        </Typography>
        <DropdownIcon />
      </Button>
      <Menu
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        anchorEl={anchorRef.current}
        // keepMounted
        open={menuOpened}
        onClose={() => {
          setMenuOpened(false);
        }}
      >
        {values.map((x, i) => {
          return (
            <>
              <MenuItem
                key={x}
                sx={(theme) => ({
                  width: theme.spacing(55),
                })}
                onClick={() => {
                  onChange(x);
                  setMenuOpened(false);
                }}
              >
                {x}
              </MenuItem>
              {i + 1 === values.length ? null : <Divider style={{ margin: '8px' }} />}
            </>
          );
        })}
      </Menu>
    </Box>
  );
};

export default MUIDropdown;

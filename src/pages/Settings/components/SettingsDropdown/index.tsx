import React from 'react'
import { Box, Button, Divider, Menu, MenuItem, Typography } from '@mui/material'
import DropdownIcon from '../../../../components/svg/DropdownIcon'

type Props = {
  label: string

  selectedIndex: number

  values: any[]

  onChange: (_index: number) => void
}

const SettingsDropdown = ({ label, selectedIndex, values, onChange }: Props) => {
  const [menuOpened, setMenuOpened] = React.useState(false)
  const anchorRef = React.useRef<any>()
  return (
    <Box
      sx={(theme) => ({
        padding: `0 ${theme.spacing(1)}`,
      })}
      mx={2}
      my={2}
      display="flex"
      alignItems="center"
      justifyContent="space-between"
    >
      <Typography variant="subtitle1">{label}</Typography>
      <Button
        ref={anchorRef}
        onClick={() => setMenuOpened(true)}
        variant="outlined"
        sx={(theme) => ({
          borderColor: 'iconBorder',
          width: theme.spacing(20),
          padding: `${theme.spacing(0.5)} ${theme.spacing(1.5)}`,
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
        })}
      >
        <Typography
          sx={{
            color: 'text.primary',
          }}
          variant="subtitle1"
        >
          {values[selectedIndex]}
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
          setMenuOpened(false)
        }}
      >
        {values.map((x, i) => {
          return (
            <>
              <MenuItem
                sx={(theme) => ({
                  width: theme.spacing(20),
                })}
                onClick={() => {
                  onChange(i)
                  setMenuOpened(false)
                }}
              >
                {x}
              </MenuItem>
              {i + 1 === values.length ? null : <Divider style={{ margin: '8px' }} />}
            </>
          )
        })}
      </Menu>
    </Box>
  )
}

export default SettingsDropdown

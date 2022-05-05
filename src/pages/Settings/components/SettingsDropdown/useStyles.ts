import { makeStyles } from '@mui/material/styles'

/**
 * Style hook for the SettingsDropdown component
 */
const useStyles = () => {
  return makeStyles(
    () => ({
      indicator: {
        width: '8px' // mui uses 8px incremental spacing
      },
      customTab: {
        minWidth: 80
      }
    })
  )
};

export default useStyles;

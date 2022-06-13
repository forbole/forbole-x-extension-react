import { SxProps, Theme } from '@mui/material';

/**
 * Styles for the ConfirmTX page
 */
const styles: { [index: string]: SxProps<Theme> } = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: 2,
    paddingLeft: 2,
    paddingRight: 2,
  },
  titleText: {
    marginTop: 2,
  },
  contentContainer: {
    paddingLeft: 2,
    paddingRight: 2,
  },
  divider: {
    marginTop: 1,
    marginBottom: 1,
  },
};

export default styles;

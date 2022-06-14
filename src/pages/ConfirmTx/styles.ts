import { SxProps, Theme } from '@mui/material';

/**
 * Styles for the ConfirmTX page
 */
const styles: { [index: string]: SxProps<Theme> } = {
  titleContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: 2,
  },
  titleText: {
    marginTop: 2,
  },
  contentContainer: {
    display: 'flex',
    flex: 1,
    alignItems: 'stretch',
    flexDirection: 'column',
    paddingLeft: 2,
    paddingRight: 2,
  },
  divider: {
    marginTop: 1,
    marginBottom: 1,
  },
  buttonContainer: {
    display: 'flex',
    flex: 1,
    alignItems: 'flex-end',
    paddingBottom: 4,
  },
};

export default styles;

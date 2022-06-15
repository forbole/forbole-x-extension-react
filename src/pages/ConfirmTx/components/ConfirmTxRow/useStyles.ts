import { SxProps } from '@mui/system';
import { Theme } from '@mui/material/styles';

/**
 * Styles of the ConfirmTxRow component
 */
const styles: { [index: string]: SxProps<Theme> } = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  text: {
    marginTop: 4,
  },
};

export default styles;

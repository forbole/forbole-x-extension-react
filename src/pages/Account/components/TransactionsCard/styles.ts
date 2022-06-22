import { SxProps } from '@mui/system';
import { Theme } from '@mui/material/styles';

/**
 * sx style definitions for the TransactionsCard component
 */
const styles: { [index: string]: SxProps<Theme> } = {
  loadingContainer: {
    margin: (theme) => `${theme.spacing(1)} ${theme.spacing(2.5)}`,
    borderRadius: 2,
    display: 'flex',
    justifyContent: 'center',
  },
  container: {
    margin: (theme) => `${theme.spacing(1)} ${theme.spacing(2.5)}`,
    borderRadius: 2,
  },
  tabsContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  transactionCardScrollView: {
    maxHeight: '400px',
    overflowY: 'scroll',
  },
};

export default styles;

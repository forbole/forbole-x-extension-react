import { SxProps } from '@mui/system';
import { Theme } from '@mui/material/styles';

const styles: { [index: string]: SxProps<Theme> } = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    padding: 2,
  },
  contentCell: {
    display: 'flex',
    flexDirection: 'column',
  },
  titleText: {
    color: 'text.primary',
  },
  contentText: {
    color: 'text.secondary',
    marginTop: 1,
  },
};
export default styles;

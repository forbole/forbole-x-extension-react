import { SxProps } from '@mui/system';
import { Theme } from '@mui/material/styles';

const styles: { [index: string]: SxProps<Theme> } = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  dropdownButton: (theme) => ({
    borderColor: 'transparent',
    backgroundColor: 'background.paper',
    padding: `${theme.spacing(0.5)} ${theme.spacing(1)}`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  }),
};

export default styles;

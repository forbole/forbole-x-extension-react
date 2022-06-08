/**
 * Styles for the ConfirmTxValidatorList component
 */
import { SxProps } from '@mui/system';
import { Theme } from '@mui/material';

const styles: { [index: string]: SxProps<Theme> } = {
  container: {
    paddingBottom: 1,
    paddingLeft: 2,
    paddingRight: 2,
  },
  titleText: {
    marginBottom: 1,
  },
  validatorContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  avatarNameContainer: {
    display: 'flex',
    alignItems: 'center',
    flexShrink: 1,
  },
  avatar: {
    marginRight: 2,
  },
  nameText: {
    color: 'text.secondary',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    maxWidth: '300px',
  },
  amountText: {
    display: 'flex',
    flexShrink: 0,
  },
};

export default styles;

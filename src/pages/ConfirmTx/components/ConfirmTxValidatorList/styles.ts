/**
 * Styles for the ConfirmTxValidatorList component
 */
import { SxProps } from '@mui/system';
import { Theme } from '@mui/material';

interface StyleType {
  [index: string]: SxProps<Theme>;
}

const styles: StyleType = {
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
  topDivider: {
    marginBottom: 2,
  },
  bottomDivider: {
    marginTop: 1,
    marginBottom: 2,
  },
};

export default styles;

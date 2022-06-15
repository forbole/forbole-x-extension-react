/**
 * Styles for the ConfirmTxValidatorList component
 */
const styles = {
  container: {
    paddingBottom: 1,
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
  bottomDivider: {
    marginTop: 1,
    marginBottom: 2,
  },
};

export default styles;

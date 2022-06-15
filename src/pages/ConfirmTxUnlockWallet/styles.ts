/**
 * Styles for the ConfirmTxUnlockWallet screen
 */
const styles = {
  container: {
    display: 'flex',
    height: '100%',
    flexDirection: 'column',
    padding: (theme) => `${theme.spacing(2)} ${theme.spacing(2)} 0 ${theme.spacing(2)}`,
  },
  titleText: {
    textAlign: 'center',
    marginBottom: 5,
  },
  form: {
    height: '100%',
  },
  inputLabel: {
    marginBottom: 1,
  },
  errorText: {
    color: 'error.main',
  },
  formInnerContainer: {
    display: 'flex',
    flex: 1,
    height: '100%',
    flexDirection: 'column',
  },
  buttonContainer: {
    display: 'flex',
    flex: 1,
    alignItems: 'flex-end',
    paddingBottom: 4,
  },
};

export default styles;

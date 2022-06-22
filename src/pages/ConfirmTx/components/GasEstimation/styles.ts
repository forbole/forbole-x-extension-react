/**
 * Styles for the GasEstimation component
 */
const styles = {
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  innerContainer: {
    display: 'flex',
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  feeText: {
    color: 'text.secondary',
  },
  textField: {
    padding: (theme) => `${theme.spacing(0.5)} ${theme.spacing(1)}`,
    borderRadius: 1,
    backgroundColor: 'background.paper',
  },
};

export default styles;

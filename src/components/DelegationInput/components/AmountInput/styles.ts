const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
  },
  amountInput: {
    '.MuiInputBase-input': {
      padding: (theme) => `${theme.spacing(0.5)} ${theme.spacing(1)}`,
    },
    backgroundColor: 'background.paper',
    borderRadius: 1,
    flex: 1,
    justifyContent: 'center',
  },
  percentInput: {
    flex: 0.8,
    height: '48px',
    width: (theme) => theme.spacing(16),
    marginLeft: 2,
    display: 'flex',
    alignItems: 'center',
    '.MuiInputBase-input': {
      py: 1.5,
      paddingRight: 0.5,
    },
    backgroundColor: 'background.paper',
    borderRadius: 1,
  },
  sliderCard: {
    marginTop: 1,
    padding: (theme) => `${theme.spacing(1)} ${theme.spacing(2)}`,
    boxShadow: (theme) => theme.shadows[7],
  },
};

export default styles;

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
  },
  amountInput: (theme) => ({
    flex: 1,
    '.MuiInputBase-input': {
      padding: `${theme.spacing(0.5)} 0 ${theme.spacing(0.5)} ${theme.spacing(1)}`,
    },
    backgroundColor: 'background.paper',
    borderRadius: 1,
    justifyContent: 'center',
    height: '48px',
    [theme.breakpoints.down('sm')]: {
      flex: 1,
    },
  }),
  percentInput: (theme) => ({
    flex: 0.4,
    height: '48px',
    width: theme.spacing(16),
    marginLeft: 2,
    display: 'flex',
    alignItems: 'center',
    '.MuiInputBase-input': {
      py: 1.5,
    },
    backgroundColor: 'background.paper',
    borderRadius: 1,
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  }),
  sliderCard: {
    marginTop: 1,
    padding: (theme) => `${theme.spacing(1)} ${theme.spacing(2)}`,
    boxShadow: (theme) => theme.shadows[7],
  },
};

export default styles;

const styles = {
  container: {
    display: 'flex',
    padding: (theme) => `${theme.spacing(1)} ${theme.spacing(1.5)}`,
    backgroundColor: 'background.paper',
    alignItems: 'center',
    borderRadius: '4px',
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 32,
    marginRight: 2,
  },
  nameText: {
    width: '100%',
    color: 'text.primary',
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
};

export default styles;

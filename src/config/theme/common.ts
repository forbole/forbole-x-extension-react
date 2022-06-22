const common = {
  typography: {
    fontFamily: '"Hind Madurai", sans-serif',
    h1: {
      fontSize: '2.25rem',
      letterSpacing: -1.5,
    },
    h2: {
      fontFamily: '"Aurulent Sans Mono", sans-serif',
      fontSize: '1.875rem',
      letterSpacing: -0.5,
    },
    h3: {
      fontFamily: '"Aurulent Sans Mono", sans-serif',
      fontSize: '1.75rem',
      letterSpacing: 0,
    },
    h4: {
      fontSize: '1.375rem',
      letterSpacing: 0.25,
    },
    h5: {
      fontFamily: '"Aurulent Sans Mono", sans-serif',
      fontSize: '1.25rem',
      letterSpacing: 0,
    },
    h6: {
      fontSize: '1.125rem',
      letterSpacing: 0.15,
    },
    subtitle1: {
      fontSize: '1rem',
      letterSpacing: 0.15,
    },
    subtitle2: {
      fontFamily: '"Hind Madurai Medium", sans-serif',
      fontSize: '0.875rem',
      letterSpacing: 0.1,
    },
    body1: {
      fontSize: '1rem',
      whiteSpace: 'pre-wrap',
    },
    body2: {
      fontSize: '0.875rem',
    },
    body6: {
      fontFamily: '"Hind Madurai", sans-serif',
      fontSize: '0.800rem',
    },
    overline: {
      fontFamily: '"Hind Madurai Medium", sans-serif',
      fontSize: '0.875rem',
      letterSpacing: 1.25,
    },
    caption: {
      fontSize: '0.75rem',
      letterSpacing: 0.4,
    },
    button: {
      fontSize: '1rem',
      letterSpacing: 0,
      textTransform: 'none',
    },
  },
  shadows: [...Array(7).fill('none'), ...Array(18).fill('0px 3px 16px #00000029')],
};

export default common;

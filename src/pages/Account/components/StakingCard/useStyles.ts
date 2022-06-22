/**
 * Styles for the StakingCard component
 */
const useStyles = ({ tabIndex }: { tabIndex: number }) => {
  return {
    container: {
      marginLeft: 2.5,
      marginRight: 2.5,
      padding: 2.5,
      borderRadius: 4,
    },
    headerContainer: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    tabContainer: {
      backgroundColor: '#374151',
      display: 'flex',
      justifyContent: 'space-between',
      textAlign: 'center',
      position: 'relative',
      borderRadius: 8,
    },
    tabButton: {
      width: '100%',
      zIndex: 10,
      cursor: 'pointer',
      transition: '500ms',
    },
    tabIndicator: {
      position: 'absolute',
      width: '33%',
      height: '100%',
      backgroundColor: 'primary.main',
      borderRadius: 16,
      transition: '500ms',
      transform: `translateX(${tabIndex * 100}%)`,
    },
  };
};

export default useStyles;

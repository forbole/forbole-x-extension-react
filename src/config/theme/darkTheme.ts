import { createTheme } from '@mui/material';
import common from './common';

const darkTheme = createTheme({
  ...common,
  palette: {
    primary: {
      main: '#007FFF',
    },
    secondary: {
      main: '#ECB140',
    },
    info: {
      main: '#1D86FF',
    },
    success: {
      main: '#1EC490',
    },
    warning: {
      main: '#E0A111',
    },
    error: {
      main: '#FD565F',
    },
    text: {
      primary: '#E6E6E6',
      secondary: '#9D9D9D',
      disabled: '#9D9D9D',
    },
    background: {
      default: '#1D1E22',
      paper: '#25282D',
    },
    grey: {
      50: '#272A2F',
      100: '#34383E',
      200: '#3D4047',
      300: '#AFAFAF',
      400: '#777777',
    },
    action: {
      hover: '#1D1E22',
      selected: '#1D1E22',
    },
    // @ts-ignore
    tagColor: {
      delegate: '#1EC490',
      redelegate: '#FF961B',
      undelegate: '#FC6A8A',
      deposit: '#FF7549',
      withdrawReward: '#3961FE',
      multisend: '#9F46EC',
      createValidator: '#1EC490',
      fund: '#497BFF',
      verifyInvariant: '#2FA8CE',
      vote: '#FF7549',
      unjail: '#EB3AA4',
      submitProposal: '#FF7549',
      editValidator: '#1EC490',
      send: '#9F46EC',
      setRewardAddress: '#497BFF',
    },
    statusColor: {
      active: '#1EC490',
      unbonded: '#FD565F',
      unknown: '#E0A111',
    },
    translucent: 'rgba(0, 0, 0, 0.5)',
    indicator: '#E6E6E6',
    validator: '#379AFE',
    divider: '#34383E',
    pieChart: ['#007FFF', '#6ED588', '#2DCBE0', '#74CDFF', '#DEC053', '#F4B65A'],
    pieChart2: ['#007FFF', '#6ED588', '#F4B65A', '#DB39F5', '#FF7448'],
    button: '#FFFFFF',
    menuBackground: '#282f35',
    socialMediaIcon: {
      background: '#999999',
      fill: '#25282D',
    },
    iconBorder: '#9D9D9D',
    dataChangeButton: {
      clicked: {
        text: '#E6E6E6',
        background: '#3D4047',
        border: '#9D9D9D',
      },
    },
    dialogBackground: '#1D1E22',
    reactJsonBackground: '#25282D',
    buttonDisabled: '#273746',
    condition: {
      zero: '#E8E8E8',
      one: '#1EC490',
      two: '#FF961B',
      three: '#FC6A8A',
    },
    cardBackground: '#3D4047',
    // color values from figma
  },
});

export default darkTheme;

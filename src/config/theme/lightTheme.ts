import { createTheme, ThemeOptions } from '@mui/material'
import common from './common'

const lightTheme = createTheme({
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
      light: '#FCD32A',
    },
    error: {
      main: '#FD565F',
    },
    text: {
      primary: '#000000',
      secondary: '#646464',
      disabled: '#646464',
    },
    background: {
      default: '#F2F2F2',
      paper: '#FFFFFF',
    },
    grey: {
      50: '#F7F7F7',
      100: '#F2F2F2',
      200: '#DDDDDD',
      300: '#8B8B8B',
      400: '#777777',
    },
    action: {
      hover: '#F7F7F7',
      selected: '#F7F7F7',
    },
    // @ts-ignore
    tagColor: {
      delegate: '#1EC490',
      redelegate: '#FF961B',
      undelegate: '#FC6A8A',
      deposit: '#FF7549',
      withdrawReward: '#243059',
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
    translucent: 'rgba(255, 255, 255, 0.5)',
    indicator: '#5C7BFF',
    validator: '#007FFF',
    divider: '#E4E4E4',
    pieChart: ['#007FFF', '#6ED588', '#2DCBE0', '#74CDFF', '#DEC053', '#F4B65A'],
    pieChart2: ['#007FFF', '#6ED588', '#F4B65A', '#DB39F5', '#FF7448'],
    button: '#007FFF',
    menuBackground: '#F7F7F7',
    socialMediaIcon: {
      background: '#999999',
      fill: '#FFFFFF',
    },
    iconBorder: '#9D9D9D',
    dataChangeButton: {
      clicked: {
        text: '#007FFF',
        background: 'rgba(119, 186, 253, 0.5)',
        border: '#6DB0FE',
      },
      unClicked: {
        text: '#646464',
        border: '#646464',
      },
    },
    condition: {
      zero: '#E8E8E8',
      one: '#1EC490',
      two: '#FF961B',
      three: '#FC6A8A',
    },
    dialogBackground: '#FFFFFF',
    reactJsonBackground: '#F7F7F7',
    buttonDisabled: '#BFDFFF',
    cardBackground: '#F7F7F7',
  },
})

export default lightTheme

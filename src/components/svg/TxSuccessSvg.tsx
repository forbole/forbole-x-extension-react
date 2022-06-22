import React from 'react';
import { useRecoilValue } from 'recoil';
import { themeState } from '@recoil/general';
import { ReactComponent as IconLight } from '../../assets/images/tx_success_light.svg';
import { ReactComponent as IconDark } from '../../assets/images/tx_success_dark.svg';

const TxSuccessSvg = () => {
  const themeSetting = useRecoilValue(themeState);

  if (themeSetting === 'light') return <IconLight width="197px" height="199px" />;
  return <IconDark width="197px" height="199px" />;
};

export default TxSuccessSvg;

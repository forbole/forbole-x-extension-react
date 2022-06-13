import React from 'react';
import { useRecoilValue } from 'recoil';
import { themeState } from '@recoil/general';
import { ReactComponent as IconLight } from '../../assets/images/tx_rejected_light.svg';
import { ReactComponent as IconDark } from '../../assets/images/tx_rejected_dark.svg';

const TxFailedSvg = () => {
  const themeSetting = useRecoilValue(themeState);

  if (themeSetting === 'light') return <IconLight width="197px" height="199px" />;
  return <IconDark width="197px" height="199px" />;
};

export default TxFailedSvg;

import React from 'react';
import { useRecoilValue } from 'recoil';
import { ReactComponent as IconLight } from '../../assets/images/tx_success_light.svg';
import { ReactComponent as IconDark } from '../../assets/images/tx_success_dark.svg';
import { themeState } from '../../recoil/general';

const TwitterIcon = () => {
  const themeSetting = useRecoilValue(themeState);

  if (themeSetting === 'light') return <IconLight width="197px" height="199px" />;
  return <IconDark width="197px" height="199px" />;
};

export default TwitterIcon;

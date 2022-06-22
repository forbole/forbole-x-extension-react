import React from 'react';
import { useRecoilValueLoadable } from 'recoil';
import { themeState } from '@recoil/general';

interface Props {
  src: string;
  size: string | number;
}

const Avatar = ({ src, size }: Props) => {
  const themeLoadable = useRecoilValueLoadable(themeState);
  const defaultAvatar =
    themeLoadable.contents === 'light'
      ? require('../../assets/images/default_profile_pic_light.png')
      : require('../../assets/images/default_profile_pic_dark.png');
  return (
    <img
      className={`object-cover rounded-full w-${size} h-${size}`}
      src={src || defaultAvatar}
      alt="avatar"
      onError={(e) => (e.currentTarget.src = defaultAvatar)}
    />
  );
};

export default Avatar;

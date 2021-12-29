import React, { useEffect } from 'react';
import { ReactComponent as MenuIcon } from '../../assets/images/icons/icon_menu.svg';
import { ReactComponent as WalletIcon } from '../../assets/images/icons/icon_wallet_manage.svg';
// @ts-ignore
import nightwind from 'nightwind/helper';
import Drawer from './drawer';
import { useState } from 'react';

interface Props {
  children: JSX.Element;
}

const Layout = ({ children }: Props) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className='bg-backgroundColor-100 text-black w-full min-h-screen'>
        <div className='w-full flex justify-between items-center p-5'>
          <MenuIcon
            className='w-6 fill-dark dark:fill-white cursor-pointer'
            onClick={() => {
              setOpen(!open);
            }}
          />
          <h4
            onClick={() => {
              nightwind.toggle();
            }}
          >
            DSM
          </h4>
          <WalletIcon className='w-5 fill-dark dark:fill-white' />
        </div>
        {children}
      </div>
      <Drawer open={open} setOpen={setOpen} />
    </>
  );
};

export default Layout;

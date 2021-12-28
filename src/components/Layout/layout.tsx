import React, { useEffect } from "react";
import { ReactComponent as MenuIcon } from "../../assets/images/icons/icon_menu.svg";
import { ReactComponent as WalletIcon } from "../../assets/images/icons/icon_wallet_manage.svg";
// @ts-ignore
import nightwind from "nightwind/helper";

interface Props {
  children: JSX.Element;
}

const Layout = ({ children }: Props) => {
  return (
    <div className="bg-backgroundColor-100 text-black w-full min-h-screen">
      <div className="w-full flex justify-between items-center p-5">
        <MenuIcon className="w-6 fill-dark dark:fill-white" />
        <h4
          onClick={() => {
            nightwind.toggle();
          }}
        >
          DSM
        </h4>
        <WalletIcon className="w-5 fill-dark dark:fill-white" />
      </div>
      {children}
    </div>
  );
};

export default Layout;

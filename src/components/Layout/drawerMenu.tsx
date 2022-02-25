import React from "react";
import { useState } from "react";
import useIconProps from "../../misc/useIconProps";

import { ReactComponent as SettingsIcon } from "../../assets/images/icons/icon_settings.svg";
import { ReactComponent as AddressBookIcon } from "../../assets/images/icons/icon_address_book.svg";
import { ReactComponent as WalletIcon } from "../../assets/images/icons/icon_wallet_manage.svg";

import { Link, NavLink } from "react-router-dom";
import ThemeModeButton from "../Common/themeModeButton";

interface Props {}

const DrawerMenu = (props: Props) => {
  const iconProps = useIconProps();

  const [menuList] = useState([
    {
      title: "Wallet",
      icon: <WalletIcon className="w-5 fill-icon-light dark:fill-icon-dark" />,
      path: "/",
    },
    {
      title: "Address Book",
      icon: (
        <AddressBookIcon className="w-5 fill-icon-light dark:fill-icon-dark" />
      ),
      path: "/address-book",
    },
    {
      title: "Setting",
      icon: (
        <SettingsIcon className="w-5 fill-icon-light dark:fill-icon-dark" />
      ),
      path: "/setting",
    },
  ]);

  return (
    <div className="text-font-2">
      <div className="flex justify-end">
        <ThemeModeButton />
      </div>
      <div className="space-y-3 mt-4">
        {menuList.map((item) => (
          <div key={item.path}>
            <Link to={item.path} className="no-underline text-font-200">
              <button className="flex items-center space-x-5 hover:bg-gray-100 p-3 rounded-lg w-full">
                {item.icon}
                <h5>{item.title}</h5>
              </button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DrawerMenu;

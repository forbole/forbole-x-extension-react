import React from "react";
import { ReactComponent as MenuIcon } from "../../assets/images/icons/icon_menu.svg";
import { ReactComponent as WalletIcon } from "../../assets/images/icons/icon_wallet_manage.svg";

import Drawer from "./drawer";
import { useState } from "react";
import DrawerMenu from "./drawerMenu";
import Dropdown from "../Element/dropdown";
import usePersistedState from '../../misc/usePersistedState';
import sendMsgToChromeExt from '../../misc/sendMsgToChromeExt';
interface Props {
  children: JSX.Element;
  title?: string;
}

const Layout = ({ children, title }: Props) => {
  const [open, setOpen] = useState(false);
  const [isFirstTimeUser, setIsFirstTimeUser] = usePersistedState('isFirstTimeUser', false)

  const checkIsFirstTimeUser = React.useCallback(async () => {
    try {
      const response = await sendMsgToChromeExt({
        event: 'ping',
      })
      setIsFirstTimeUser(response.isFirstTimeUser);
      console.log('123');
      console.log(response);
    } catch (err) {
      console.log(err)
    }
  }, [])

  React.useEffect(() => {
    checkIsFirstTimeUser()
  }, [])

  return (
    <>
      <div className="bg-backgroundColor-100 text-black w-full min-h-screen">
        <div className="w-full flex justify-between items-center p-5">
          <MenuIcon
            className="w-6 fill-dark dark:fill-white cursor-pointer"
            onClick={() => {
              setOpen(!open);
            }}
          />
          <h4>{title}</h4>
          <Dropdown
            items={[
              { title: "Add Wallet" },
              { title: "Change Wallet Moniker" },
              { title: "Change Wallet Security Password" },
              { title: "View Secret Recovery Phrase" },
              { title: "Delete Wallet" },
            ]}
          >
            <WalletIcon className="w-5 fill-dark dark:fill-white" />
          </Dropdown>
        </div>
        {children}
      </div>
      <Drawer open={open} setOpen={setOpen}>
        <DrawerMenu />
      </Drawer>
    </>
  );
};

export default Layout;

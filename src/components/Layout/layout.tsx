import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { useRecoilValue, useRecoilValueLoadable } from 'recoil';
import { Button } from '@mui/material';
import { ReactComponent as MenuIcon } from '../../assets/images/icons/icon_menu.svg';
import { ReactComponent as ArrowLeftIcon } from '../../assets/images/icons/icon_back.svg';
import Drawer from './drawer';
import DrawerMenu from './drawerMenu';
import UnlockDialog from './UnlockDialog';
import { isFirstTimeUserState, passwordState } from '../../recoil/general';
import GetStarted from './GetStarted';

interface Props {
  title?: React.ReactNode;
  rightElement?: React.ReactNode;
  backPath?: string;
  backCallback?: () => void;
  hideLeftElement?: boolean;
}

const Layout: React.FC<Props> = ({
  hideLeftElement,
  backCallback,
  children,
  title,
  rightElement,
  backPath,
}) => {
  const [open, setOpen] = useState(false);
  const firstTime = useRecoilValueLoadable(isFirstTimeUserState);
  const password = useRecoilValue(passwordState);

  const leftElement = React.useMemo(() => {
    if (hideLeftElement) {
      return <div />;
    }
    if (backCallback) {
      return (
        <Button
          disableElevation
          disableRipple
          onClick={backCallback}
          sx={{
            backgroundColor: 'transparent',
            padding: 0,
            margin: 0,
            minWidth: 0,
            borderWidth: 0,
            '&:hover': {
              background: 'none',
            },
          }}
        >
          <ArrowLeftIcon className="w-6 h-6 fill-icon-light dark:fill-icon-dark cursor-pointer" />
        </Button>
      );
    }
    if (backPath) {
      return (
        <Link to={backPath}>
          <ArrowLeftIcon className="w-6 h-6 fill-icon-light dark:fill-icon-dark cursor-pointer" />
        </Link>
      );
    }
    return (
      <MenuIcon
        className="w-6 h-6 fill-icon-light dark:fill-icon-dark cursor-pointer"
        onClick={() => {
          setOpen(!open);
        }}
      />
    );
  }, [hideLeftElement, backPath]);

  return (
    <>
      <div className="bg-backgroundColor-100 text-font-100 w-full h-screen flex flex-col text-base relative">
        <div className="w-full flex justify-between items-end px-5 py-6 z-1">
          {leftElement}
          {typeof title === 'string' ? <h4 className="leading-none">{title}</h4> : title}
          {rightElement ?? <div className="w-6 h-6" />}
        </div>
        <div className="h-full grow overflow-y-auto no-scrollbar flex flex-col w-full">
          {firstTime.state !== 'hasValue' || firstTime.contents ? <GetStarted /> : children}
        </div>
        <Toaster position="bottom-center" />
      </div>
      <Drawer open={open} setOpen={setOpen}>
        <DrawerMenu />
      </Drawer>
      <UnlockDialog open={!password && !(firstTime.state !== 'hasValue' || firstTime.contents)} />
    </>
  );
};

export default Layout;

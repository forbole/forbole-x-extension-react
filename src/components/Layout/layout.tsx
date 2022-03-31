import React from 'react'
import { ReactComponent as MenuIcon } from '../../assets/images/icons/icon_menu.svg'
import { ReactComponent as ArrowLeftIcon } from '../../assets/images/icons/icon_back.svg'
import Drawer from './drawer'
import { useState } from 'react'
import DrawerMenu from './drawerMenu'
import { Link } from 'react-router-dom'
import { Toaster } from 'react-hot-toast';
interface Props {
  children: JSX.Element
  title?: React.ReactNode
  rightElement?: React.ReactNode
  backPath?: string
}

const Layout = ({ children, title, rightElement, backPath }: Props) => {
  const [open, setOpen] = useState(false)

  return (
    <>
      <div className="bg-backgroundColor-100 text-font-100 w-full min-h-screen text-base flex flex-col relative">
        <div className="w-full flex justify-between items-end px-5 py-6">
          {backPath ? (
            <Link to={backPath}>
              <ArrowLeftIcon className="w-6 h-6 fill-icon-light dark:fill-icon-dark cursor-pointer" />
            </Link>
          ) : (
            <MenuIcon
              className="w-6 h-6 fill-icon-light dark:fill-icon-dark cursor-pointer"
              onClick={() => {
                setOpen(!open)
              }}
            />
          )}
          {typeof title === 'string' ? <h4 className='leading-none'>{title}</h4> : title}
          {rightElement ?? <div className='w-6 h-6' />}
        </div>
        <div className="h-full grow">{children}</div>
        <Toaster position="bottom-center" />
      </div>
      <Drawer open={open} setOpen={setOpen}>
        <DrawerMenu />
      </Drawer>
    </>
  )
}

export default Layout

import React from 'react'
import { ReactComponent as MenuIcon } from '../../assets/images/icons/icon_menu.svg'
import Drawer from './drawer'
import { useState } from 'react'
import DrawerMenu from './drawerMenu'

interface Props {
  children: JSX.Element
  title?: React.ReactNode
  rightElement?: React.ReactNode
}

const Layout = ({ children, title, rightElement }: Props) => {
  const [open, setOpen] = useState(false)

  return (
    <>
      <div className="bg-backgroundColor-100 text-black w-full min-h-screen text-base flex flex-col relative">
        <div className="w-full flex justify-between items-end p-5">
          <MenuIcon
            className="w-6 fill-dark dark:fill-white cursor-pointer"
            onClick={() => {
              setOpen(!open)
            }}
          />
          {typeof title === 'string' ? <h4>{title}</h4> : title}
          {rightElement || <div />}
        </div>
        <div className="h-full grow">{children}</div>
      </div>
      <Drawer open={open} setOpen={setOpen}>
        <DrawerMenu />
      </Drawer>
    </>
  )
}

export default Layout

import React from 'react'
import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import classNames from 'classnames'

export type MenuItem = {
  title: string
  onClick?: React.MouseEventHandler<HTMLParagraphElement>
}

interface Props {
  children?: JSX.Element
  items?: MenuItem[]
}

const Dropdown = ({ children, items }: Props) => {
  return (
    <Menu as="div" className="relative inline-block text-left">
      <Menu.Button className="flex items-end">{children}</Menu.Button>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="origin-top-right absolute z-50 right-0 mt-2 w-max rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            {items.map((item, i) => (
              <Menu.Item key={String(i)}>
                {({ active }) => (
                  <p
                    className={classNames(
                      active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                      'block px-4 py-3 text-sm cursor-pointer'
                    )}
                    onClick={item.onClick ? item.onClick : () => {}}
                  >
                    {item.title}
                  </p>
                )}
              </Menu.Item>
            ))}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  )
}

export default Dropdown

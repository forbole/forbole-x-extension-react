import React from 'react';
import { Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'


interface Props {
  open: boolean;
  setOpen: (status: boolean) => void;
  children: JSX.Element;
}

const Drawer = ({open, setOpen, children}: Props) => {
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="fixed inset-0 overflow-hidden" onClose={setOpen}>
        <div className="absolute inset-0 overflow-hidden text-gray-900">
          <Transition.Child
            as={Fragment}
            enter="ease-in-out duration-200"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in-out duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className='fixed inset-y-0 left-0 pr-10 max-w-full flex'>
              <Transition.Child
                as={Fragment}
                enter='transform transition ease-in-out duration-500 sm:duration-700'
                enterFrom='-translate-x-full'
                enterTo='translate-x-0'
                leave='transform transition ease-in-out duration-500 sm:duration-700'
                leaveFrom='translate-x-0'
                leaveTo='-translate-x-full z-index-0'
              >
              <div className="w-screen max-w-[280px]">
                <div className="h-full flex flex-col py-6 bg-white shadow-xl overflow-y-auto">
                  {/* <div className="px-4 sm:px-6">
                    <div className="flex items-start justify-between">
                      <Dialog.Title className="text-lg font-medium">Panel title</Dialog.Title>
                      <div className="ml-3 h-7 flex items-center">
                        <button
                          type="button"
                          className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                          onClick={() => setOpen(false)}
                        >
                          <span className="sr-only">Close panel</span>
                         X
                        </button>
                      </div>
                    </div>
                  </div> */}
                  <div className="mt-1 relative flex-1 px-4 sm:px-6">
                    {children}
                  </div>
                </div>
              </div>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default Drawer;

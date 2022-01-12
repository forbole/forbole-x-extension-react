import React from 'react';
import { ReactComponent as CloseIcon } from '../../assets/images/icons/icon_cross.svg';
import useIconProps from '../../misc/useIconProps';

interface Props {
  open: boolean;
  onClose: (open: boolean) => void;
  title?: string;
  children: JSX.Element;
}

const Dialog = ({ open, onClose, title, children }: Props) => {
  const iconProps = useIconProps();

  return (
    <div>
      {open && (
        <div className='absolute top-0 w-full bg-backgroundColor-100 h-full pt-5'>
          <div
            className='flex justify-end mr-5'
            onClick={() => {
              onClose(false);
            }}
          >
            <CloseIcon className={`${iconProps} cursor-pointer`} />
          </div>
          <h2 className='text-center'>{title}</h2>
          {children}
        </div>
      )}
    </div>
  );
};

export default Dialog;

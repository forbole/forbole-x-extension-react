import React from 'react';
import Dialog from '../../Element/dialog';
import { ReactComponent as WithMnemonicIconLight } from '../../../assets/images/login_light.svg';
import { ReactComponent as WithMnemonicIconDark } from '../../../assets/images/login_dark.svg';
import { ReactComponent as WithoutMnemonicIconLight } from '../../../assets/images/create_wallet_light.svg';
import { ReactComponent as WithoutMnemonicIconDark } from '../../../assets/images/create_wallet_dark.svg';
import ButtonArea from '../../Element/buttonArea';

interface Props {
  open: boolean;
  onClose: (open: boolean) => void;
}

const CreateWalletDialog = ({ open, onClose }: Props) => {
  return (
    <Dialog title='Create Wallet' open={open} onClose={onClose}>
      <div className='flex w-full space-x-7 justify-center mt-10'>
        <ButtonArea>
          <div className='px-12 py-24 flex flex-col items-center space-y-10'>
            <WithMnemonicIconLight />
            <p className='text-sm'>Import Wallet</p>
          </div>
        </ButtonArea>
        <ButtonArea>
          <div className='px-12 py-24 flex flex-col items-center space-y-10'>
            <WithoutMnemonicIconLight />
            <p className='text-sm'>Create Wallet</p>
          </div>
        </ButtonArea>
      </div>
    </Dialog>
  );
};

export default CreateWalletDialog;

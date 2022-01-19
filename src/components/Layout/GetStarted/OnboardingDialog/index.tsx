import React from 'react';
import useIconProps from '../../../../misc/useIconProps';
import Button from '../../../Element/button';
import Dialog from '../../../Element/dialog';
import { useForm } from 'react-hook-form';
import { useFirstTime } from '../../../../recoil/general/generalState';

interface Props {
  open: boolean;
  onClose: (open: boolean) => void;
  onSubmit: (password: string) => void;
}

type Inputs = {
  password: string;
  confirmPassword: string;
};

const OnboardingDialog = ({ open, onClose, onSubmit }: Props) => {
  const [password, setPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');
  const [isConfirmingPassword, setIsConfirmingPassword] = React.useState(false);
  const [error, setError] = React.useState('');

  const [firstTime, setFirstTime] = useFirstTime();

  React.useEffect(() => {
    if (open) {
      setPassword('');
      setConfirmPassword('');
      setIsConfirmingPassword(false);
    }
  }, [open]);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<Inputs>();

  const onFormSubmit = (data) => {
    if (!isConfirmingPassword) {
      if (watch('password').length < 6) {
        setError('invalid password');
      } else {
        setIsConfirmingPassword(true);
      }
    } else if (watch('password') !== watch('confirmPassword')) {
      setError('invalid confirm password');
    } else {
      onSubmit(watch('password'));
      // setFirstTime(false);
      setError('');
      reset({ password: '', confirmPassword: '' });
    }
  };

  return (
    <Dialog
      open={open}
      onClose={() => {
        onClose(false);
        setError('');
        reset({ password: '', confirmPassword: '' });
      }}
      title={`${
        !isConfirmingPassword ? 'Set Wallet Password' : 'Confirm Password'
      }`}
    >
      <form onSubmit={handleSubmit(onFormSubmit)}>
        <div className='flex flex-col items-center mt-5'>
          <p className='max-w-sm text-center'>
            {!isConfirmingPassword
              ? 'Set a password to prevent unauthorized access to wallet data on your application'
              : 'There will be No “restore password” button. Make sure you remember it.'}
          </p>
          <div className='w-full flex justify-center'>
            <div className='w-full px-10 py-7'>
              {!isConfirmingPassword ? (
                <input
                  key='password'
                  type='password'
                  {...register('password', { required: true })}
                  className='shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full text-sm border-gray-300 rounded-sm px-3 py-2 bg-popup-100'
                />
              ) : (
                <input
                  key='confirmPassword'
                  type='password'
                  {...register('confirmPassword', { required: true })}
                  className='shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full text-sm border-gray-300 rounded-sm px-3 py-2 bg-popup-100'
                />
              )}
              {!!error && (
                <p className='text-sm mt-2 text-red-500 nightwind-prevent'>
                  {error}
                </p>
              )}
                <p className='text-sm mt-2'>
                  {!isConfirmingPassword
                    ? '* at least 6 characters in length'
                    : '* The password will be saved on your application, we won’t be able to help if you lose your password.'}
                </p>
              <div className='mt-24'>
                {/* TODO: Previous Step */}
                <Button
                  text={`${!isConfirmingPassword ? 'Next' : 'Confirm'}`}
                  type='submit'
                />
              </div>
            </div>
          </div>
        </div>
      </form>
    </Dialog>
  );
};

export default OnboardingDialog;

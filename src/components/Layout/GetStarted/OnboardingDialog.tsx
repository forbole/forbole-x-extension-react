import React from 'react';
import useIconProps from '../../../misc/useIconProps';
import Button from '../../Element/button';
import Dialog from '../../Element/dialog';
import { useForm } from 'react-hook-form';
import { useFirstTime } from '../../../recoil/general/generalState';

interface Props {
  open: boolean;
  onClose: (open: boolean) => void;
  onSubmit: (password: string) => void;
}

const OnboardingDialog = ({ open, onClose, onSubmit }: Props) => {
  const [password, setPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');
  const [isConfirmingPassword, setIsConfirmingPassword] = React.useState(false);
  const [error, setError] = React.useState('');

  const [firstTime, setFirstTime] = useFirstTime()

  // const onButtonClick = React.useCallback(() => {
  //   setError('');
  //   if (!isConfirmingPassword) {
  //     if (password.length < 6) {
  //       setError('invalid password');
  //     } else {
  //       setIsConfirmingPassword(true);
  //     }
  //   } else if (password !== confirmPassword) {
  //     setError('invalid confirm password');
  //   } else {
  //     onSubmit(password);
  //   }
  // }, [isConfirmingPassword, password, confirmPassword]);

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
    formState: { errors },
  } = useForm();
  const onFormSubmit = (data) => {
    console.log(data, isConfirmingPassword);
    if (!isConfirmingPassword) {
      if (watch('password').length < 6) {
        setError('invalid password');
      } else {
        setIsConfirmingPassword(true);
      }
    } else if (password !== confirmPassword) {
      setError('invalid confirm password');
    } else {
      onSubmit(password);
      setFirstTime(false);
    }
  };

  return (
    <Dialog open={open} onClose={() => onClose(false)} title='Set Password'>
      <form onSubmit={handleSubmit(onFormSubmit)}>
        <div className='flex flex-col items-center'>
          <p className='max-w-sm text-center'>
            Set a password to prevent unauthorized access to wallet data on your
            application
          </p>
          <div className='w-full flex justify-center'>
            <div className='w-full px-10 py-7'>
              {!isConfirmingPassword ? (
                <input
                  type='password'
                  {...register('password', { required: true })}
                  className='shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full text-sm border-gray-300 rounded-sm px-3 py-2 bg-popup-100'
                />
              ) : (
                <input
                  type='password'
                  {...register('confirmPassword', { required: true })}
                  className='shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full text-sm border-gray-300 rounded-sm px-3 py-2 bg-popup-100'
                />
              )}
              {watch(confirmPassword)}
              {/* <Input /> */}
              <p className='text-sm mt-2'>
                * at least 6 characters in length {password}
              </p>
              <div className='mt-24'>
                <Button text='Next' type='submit' />
              </div>
            </div>
          </div>
        </div>
      </form>
    </Dialog>
  );
};

export default OnboardingDialog;

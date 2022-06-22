import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
} from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { ReactComponent as CloseIcon } from '../../assets/images/icons/icon_cross.svg';
import cryptocurrencies from '../../misc/cryptocurrencies';
import { isAddressValid } from '../../misc/utils';
import { useFavAddressesMutations, FavAddress } from '../../recoil/favorite';

export interface UpdatedAddress extends FavAddress {
  newAddress: string;
}

interface EditAddressDialogProps {
  currentAddress: FavAddress;
  open: boolean;
  onClose(): void;
}

const EditAddressDialog: React.FC<EditAddressDialogProps> = ({ currentAddress, open, onClose }) => {
  const { t } = useTranslation('common');

  const { updateFavAddresses } = useFavAddressesMutations();
  const [monikerError, setMonikerError] = React.useState('');
  const [addressError, setAddressError] = React.useState('');

  const [updatedAddress, setUpdatedAddress] = React.useState<UpdatedAddress>({
    ...currentAddress,
    newAddress: currentAddress.address,
  });

  const onButtonClick = (e) => {
    if (updatedAddress.moniker === '') {
      setMonikerError(t('moniker warning'));
    } else if (
      !isAddressValid(cryptocurrencies[updatedAddress.crypto].prefix, updatedAddress.newAddress)
    ) {
      setAddressError(t('invalid address', { crypto: updatedAddress.crypto }));
    } else {
      onSubmit(e);
    }
  };

  const onSubmit = React.useCallback(
    async (e) => {
      try {
        e.preventDefault();
        await updateFavAddresses(updatedAddress);
        onClose();
      } catch (err) {
        console.log(err);
      }
    },
    [updateFavAddresses, updatedAddress]
  );

  React.useEffect(() => {
    if (open) {
      setMonikerError('');
      setAddressError('');
      setUpdatedAddress({
        ...currentAddress,
        newAddress: currentAddress.address,
      });
    }
  }, [open]);

  return (
    <Dialog fullWidth open={open} onClose={onClose} fullScreen>
      <Box position="relative">
        <DialogTitle textAlign="center">{t('edit address')}</DialogTitle>
        <CloseIcon
          className="w-6 h-6 fill-icon-light dark:fill-icon-dark cursor-pointer absolute right-4 top-4"
          onClick={onClose}
        />
      </Box>
      <form
        noValidate
        onSubmit={(e) => {
          e.preventDefault();
          onButtonClick(e);
        }}
      >
        <DialogContent>
          <Box mb={2.5}>
            <Typography gutterBottom>{t('moniker')}</Typography>
            <TextField
              fullWidth
              autoFocus
              variant="filled"
              InputProps={{
                disableUnderline: true,
              }}
              error={!!monikerError}
              helperText={monikerError}
              value={updatedAddress.moniker}
              onChange={(e) =>
                setUpdatedAddress({
                  address: updatedAddress.address,
                  img: updatedAddress.img,
                  moniker: e.target.value,
                  crypto: updatedAddress.crypto,
                  newAddress: updatedAddress.newAddress,
                  note: updatedAddress.note,
                })
              }
            />
          </Box>
          <Box mb={2.5}>
            <Typography gutterBottom>{t('address')}</Typography>
            <TextField
              fullWidth
              autoFocus
              variant="filled"
              InputProps={{
                disableUnderline: true,
              }}
              error={!!addressError}
              helperText={addressError}
              value={updatedAddress.newAddress}
              onChange={(e) =>
                setUpdatedAddress({
                  address: updatedAddress.address,
                  img: updatedAddress.img,
                  moniker: updatedAddress.moniker,
                  crypto: updatedAddress.crypto,
                  newAddress: e.target.value,
                  note: updatedAddress.note,
                })
              }
            />
          </Box>
          <Box mb={2.5}>
            <Typography gutterBottom>{t('note')}</Typography>
            <TextField
              fullWidth
              autoFocus
              variant="filled"
              multiline
              rows={4}
              InputProps={{
                disableUnderline: true,
              }}
              placeholder={t('optional')}
              value={updatedAddress.note}
              onChange={(e) =>
                setUpdatedAddress({
                  address: updatedAddress.address,
                  img: updatedAddress.img,
                  moniker: updatedAddress.moniker,
                  crypto: updatedAddress.crypto,
                  newAddress: updatedAddress.newAddress,
                  note: e.target.value,
                })
              }
            />
          </Box>
          <Button
            type="submit"
            sx={{
              width: '100%',
              color: 'text.primary',
              '&:disabled': {
                color: 'text.primary',
                backgroundColor: 'primary.main',
                opacity: 0.5,
              },
            }}
            variant="contained"
            color="primary"
            disabled={updatedAddress.newAddress === '' || updatedAddress.moniker === ''}
          >
            {t('save')}
          </Button>
        </DialogContent>
      </form>
    </Dialog>
  );
};

export default EditAddressDialog;

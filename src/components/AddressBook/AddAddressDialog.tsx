import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
  InputAdornment,
  Avatar,
  Autocomplete,
} from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useFavAddressesMutations } from '../../recoil/favorite';
import { ReactComponent as CloseIcon } from '../../assets/images/icons/icon_cross.svg';
import { ReactComponent as DropDownIcon } from '../../assets/images/icons/icon_arrow_down_input_box.svg';
import cryptocurrencies from '../../misc/cryptocurrencies';
import { isAddressValid } from '../../misc/utils';

export type FavAddress = {
  address: string;
  crypto: string;
  moniker: string;
  note?: string;
  img?: string;
};

interface AddAddressDialogProps {
  open: boolean;
  onClose(): void;
}

const AddAddressDialog: React.FC<AddAddressDialogProps> = ({ open, onClose }) => {
  const [monikerError, setMonikerError] = React.useState('');
  const [addressError, setAddressError] = React.useState('');
  const { addFavAddresses } = useFavAddressesMutations();

  const [editedAddress, setEditedAddress] = React.useState<FavAddress>({
    address: '',
    moniker: '',
    crypto: Object.values(cryptocurrencies)[0].name,
  });

  const onSubmit = React.useCallback(
    async (e) => {
      try {
        e.preventDefault();
        if (!editedAddress.moniker) {
          setMonikerError(t('moniker warning'));
        } else if (
          !isAddressValid(cryptocurrencies[editedAddress.crypto].prefix, editedAddress.address)
        ) {
          setAddressError(t('invalid address', { crypto: editedAddress.crypto }));
        } else {
          addFavAddresses(editedAddress);
          onClose();
        }
      } catch (err) {
        console.log(err);
      }
    },
    [addFavAddresses, editedAddress]
  );

  React.useEffect(() => {
    if (open) {
      setMonikerError('');
      setAddressError('');
      setEditedAddress({
        address: '',
        crypto: Object.values(cryptocurrencies)[0].name,
        moniker: '',
      });
    }
  }, [open]);

  const { t } = useTranslation('addressBook');

  return (
    <Dialog fullWidth open={open} onClose={onClose} fullScreen>
      <Box position="relative">
        <DialogTitle textAlign="center">{t('add address')}</DialogTitle>
        <CloseIcon
          className="w-6 h-6 fill-icon-light dark:fill-icon-dark cursor-pointer absolute right-4 top-4"
          onClick={onClose}
        />
      </Box>
      <form noValidate onSubmit={onSubmit}>
        <DialogContent>
          <Box mb={2.5}>
            <Typography variant="button">{t('address type')}</Typography>
            <Box display="flex" alignItems="center">
              <Autocomplete
                options={Object.keys(cryptocurrencies)}
                defaultValue={Object.keys(cryptocurrencies)[0]}
                getOptionLabel={(option) =>
                  `${cryptocurrencies[option].chainName} - ${cryptocurrencies[option].name}`
                }
                openOnFocus
                fullWidth
                onChange={(_e, id: string) => {
                  if (!id) {
                    return;
                  }
                  setEditedAddress((a) => ({
                    ...a,
                    crypto: cryptocurrencies[id].name,
                  }));
                }}
                renderOption={(props, option) =>
                  option ? (
                    <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                      <Avatar
                        src={cryptocurrencies[option].image}
                        alt={cryptocurrencies[option].name}
                        sx={{ width: 28, height: 28 }}
                      />
                      <Typography ml={1}>
                        {cryptocurrencies[option].chainName} - {cryptocurrencies[option].name}
                      </Typography>
                    </Box>
                  ) : null
                }
                renderInput={({ InputProps, ...params }) => (
                  <TextField
                    {...params}
                    variant="filled"
                    fullWidth
                    placeholder={t('select network')}
                    InputProps={{
                      ...InputProps,
                      className: '',
                      disableUnderline: true,
                      startAdornment: editedAddress.crypto ? (
                        <Box mr={1}>
                          <Avatar
                            alt={editedAddress.crypto}
                            src={cryptocurrencies[editedAddress.crypto].image}
                            sx={{ width: 28, height: 28 }}
                          />
                        </Box>
                      ) : null,
                      endAdornment: (
                        <InputAdornment position="end">
                          <DropDownIcon className="w-6 h-6 fill-icon-light dark:fill-icon-dark" />
                        </InputAdornment>
                      ),
                    }}
                  />
                )}
              />
            </Box>
          </Box>
          <Box mb={2.5}>
            <Typography gutterBottom>{t('address')}</Typography>
            <TextField
              fullWidth
              autoFocus
              variant="filled"
              placeholder={t('insert address')}
              error={!!addressError}
              helperText={addressError}
              InputProps={{
                disableUnderline: true,
              }}
              value={editedAddress.address}
              onChange={(e) =>
                setEditedAddress((a) => ({
                  ...a,
                  address: e.target.value,
                }))
              }
            />
          </Box>
          <Box mb={2.5}>
            <Typography gutterBottom>{t('moniker')}</Typography>
            <TextField
              fullWidth
              autoFocus
              variant="filled"
              placeholder={t('moniker')}
              error={!!monikerError}
              helperText={monikerError}
              InputProps={{
                disableUnderline: true,
              }}
              value={editedAddress.moniker}
              onChange={(e) =>
                setEditedAddress((a) => ({
                  ...a,
                  moniker: e.target.value,
                }))
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
              value={editedAddress.note}
              onChange={(e) =>
                setEditedAddress((a) => ({
                  ...a,
                  note: e.target.value,
                }))
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
            disabled={editedAddress.address === '' || editedAddress.moniker === ''}
          >
            {t('save')}
          </Button>
        </DialogContent>
      </form>
    </Dialog>
  );
};

export default AddAddressDialog;

import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { ReactComponent as CloseIcon } from '../../assets/images/icons/icon_cross.svg';
import { useFavAddressesMutations } from '../../recoil/favorite';

interface RemoveAddressDialogProps {
  accountAddress: string;
  open: boolean;
  onClose(): void;
}

const RemoveAddressDialog: React.FC<RemoveAddressDialogProps> = ({
  accountAddress,
  open,
  onClose,
}) => {
  const { t } = useTranslation('addressBook');

  const { deleteFavAddresses } = useFavAddressesMutations();

  const onButtonClick = React.useCallback(async () => {
    try {
      await deleteFavAddresses(accountAddress);
    } catch (err) {
      console.log(err);
    }
    onClose();
  }, [deleteFavAddresses, accountAddress]);

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <CloseIcon
        className="w-6 h-6 self-end m-3 cursor-pointer fill-icon-light dark:fill-icon-dark"
        onClick={onClose}
      />
      <Box padding={5} paddingTop={3.5}>
        <DialogTitle textAlign="center">{t('delete address')}</DialogTitle>
        <DialogContent>
          <Typography textAlign="center">{t('delete address warning')}</Typography>
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            color="secondary"
            sx={{ color: 'text.primary' }}
            onClick={onClose}
            fullWidth
          >
            {t('cancel')}
          </Button>
          <Button variant="contained" color="primary" onClick={onButtonClick} fullWidth>
            {t('delete')}
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
};

export default RemoveAddressDialog;

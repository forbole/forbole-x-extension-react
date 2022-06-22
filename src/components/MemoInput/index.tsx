import {
  TextField,
  Typography,
  Checkbox,
  FormControlLabel,
  useTheme,
  FilledTextFieldProps,
} from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { isValidMnemonic } from 'misc/utils';

interface MemoInputProps extends Partial<FilledTextFieldProps> {
  setValue: (value: string) => void;
  consent: boolean;
  setConsent: (value: boolean) => void;
}

/**
 * A textfield for users to enter a memo with their transaction.
 * Shows a consent checkbox if a mnemonic is detected, in case it was
 * entered by accident.
 */
const MemoInput: React.FC<MemoInputProps> = ({ value, setValue, consent, setConsent }) => {
  const { t } = useTranslation('common');

  const themeStyle = useTheme();

  const hasError = React.useMemo(() => isValidMnemonic(value), [value]);

  React.useEffect(() => {
    if (hasError) {
      setConsent(false);
    } else {
      setConsent(true);
    }
  }, [hasError]);

  return (
    <>
      <TextField
        InputProps={{ disableUnderline: true, sx: { padding: 2 } }}
        fullWidth
        multiline
        rows={3}
        variant="filled"
        placeholder={t('description optional')}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        error={hasError}
        helperText={hasError ? t('memo warning') : false}
        sx={{
          borderRadius: 1,
          backgroundColor: 'background.paper',
          '& .MuiFormHelperText-contained': {
            marginLeft: 0,
          },
        }}
      />
      {hasError ? (
        <FormControlLabel
          control={
            <Checkbox
              style={{
                color: themeStyle.palette.error.main,
              }}
              checked={consent}
              onChange={(e) => setConsent(e.target.checked)}
            />
          }
          label={
            <Typography
              variant="body2"
              style={{
                fontSize: themeStyle.spacing(1.8),
                color: themeStyle.palette.error.main,
              }}
            >
              {t('memo warning consent')}
            </Typography>
          }
        />
      ) : null}
    </>
  );
};

export default MemoInput;

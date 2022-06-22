import React from 'react';
import { Box, TextField } from '@mui/material';
import Avatar from 'components/Element/avatar';
import DropdownIcon from 'components/svg/DropdownIcon';
import { useTranslation } from 'react-i18next';

type Props = {
  InputProps: any;

  inputProps: any;

  searchValue: string;

  handleChange: (value: string) => void;

  selectedValidator: Validator;
};

/**
 * Renderer for the searchable validator list portion of the
 * SelectValidatorList component.
 */
const SelectValidatorAutoCompleteList = ({
  selectedValidator,
  searchValue,
  handleChange,
  InputProps,
  ...rest
}: Props) => {
  const { t } = useTranslation();

  return (
    <TextField
      {...rest}
      variant="filled"
      placeholder={t('select validator')}
      onChange={(event) => handleChange(event.target.value)}
      // eslint-disable-next-line react/jsx-no-duplicate-props
      InputProps={{
        ...InputProps,
        disableUnderline: true,
        value: searchValue,
        startAdornment: selectedValidator ? (
          <Box padding={0}>
            <Avatar size={8} src={selectedValidator.image} />
          </Box>
        ) : null,
        endAdornment: <DropdownIcon />,
      }}
    />
  );
};

export default SelectValidatorAutoCompleteList;

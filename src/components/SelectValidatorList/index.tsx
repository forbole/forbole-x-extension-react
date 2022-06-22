import React from 'react';
import { Typography, Box, Autocomplete, TextField } from '@mui/material';
import { useTranslation } from 'react-i18next';
import DropdownIcon from 'components/svg/DropdownIcon';
import Avatar from 'components/Element/avatar';
import _ from 'lodash';

type Props = {
  validators: Validator[];

  onChange: (validatorAddress: string) => void;
};

const SelectValidatorList = ({ validators, onChange }: Props) => {
  const { t } = useTranslation();

  const [selectedValidator, setSelectedValidator] = React.useState<Validator | null>(null);
  const [searchValue, setSearchValue] = React.useState('');
  const validatorsMap = _.keyBy(validators, 'address');

  return (
    <Box
      key={selectedValidator ? selectedValidator.address : ''}
      display="flex"
      alignItems="center"
      sx={{ borderRadius: '4px', backgroundColor: 'background.paper', height: '48px' }}
    >
      <Autocomplete
        sx={(_theme) => ({
          pr: 0,
          '.MuiFilledInput-root': {
            py: 1,
          },
        })}
        options={validators.map((val) => val)}
        getOptionLabel={(option: Validator) => option.address}
        openOnFocus
        fullWidth
        filterOptions={(options: Validator[], { inputValue }: any) =>
          options.filter((o) => (o.name || '').toLowerCase().includes(inputValue.toLowerCase()))
        }
        onChange={(_event, value: Validator) => {
          setSelectedValidator(value);
          setSearchValue(value.name);
          onChange(value.address);
        }}
        renderOption={(props: any) => {
          const validator = _.get(validatorsMap, props.key);
          return (
            <Box {...props} display="flex" alignItems="center" flexDirection="row" width="100%">
              <Avatar size={8} src={validator?.image || ''} />
              <Typography sx={{ width: '80%', marginLeft: '8px', wordWrap: 'break-word' }}>
                {validator.name}
              </Typography>
            </Box>
          );
        }}
        renderInput={({ InputProps, inputProps, ...params }) => {
          return (
            <TextField
              {...params}
              variant="filled"
              placeholder={t('select validator')}
              inputProps={{
                ...inputProps,
                value: searchValue,
              }}
              onChange={(event) => setSearchValue(event.target.value)}
              // eslint-disable-next-line react/jsx-no-duplicate-props
              InputProps={{
                ...InputProps,
                sx: {
                  pr: 1,
                },
                disableUnderline: true,
                startAdornment: selectedValidator ? (
                  <Box padding={0}>
                    <Avatar size={8} src={selectedValidator.image} />
                  </Box>
                ) : null,
                endAdornment: <DropdownIcon />,
              }}
            />
          );
        }}
      />
    </Box>
  );
};

export default SelectValidatorList;

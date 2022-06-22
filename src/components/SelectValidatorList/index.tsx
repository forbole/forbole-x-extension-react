import React from 'react';
import { Box, Autocomplete } from '@mui/material';
import _ from 'lodash';
import SelectedValidatorRenderer from 'components/SelectValidatorList/SelectedValidatorRenderer';
import SelectValidatorAutoCompleteList from 'components/SelectValidatorList/SelectValidatorAutoCompleteList';
import styles from './styles';

type Props = {
  /**
   * The list of selectable validators.
   */
  validators: Validator[];

  /**
   * Callback for when a validator is selected.
   */
  onChange: (validatorAddress: string) => void;
};

/**
 * A component that renders a dropdown list of validators to choose from.
 */
const SelectValidatorList = ({ validators, onChange }: Props) => {
  const [selectedValidator, setSelectedValidator] = React.useState<Validator | null>(null);
  const [searchValue, setSearchValue] = React.useState('');
  const validatorsMap = _.keyBy(validators, 'address');

  return (
    <Box key={selectedValidator ? selectedValidator.address : ''} sx={styles.container}>
      <Autocomplete
        sx={styles.autoComplete}
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
          return <SelectedValidatorRenderer validator={validator} {...props} />;
        }}
        renderInput={({ InputProps, ...params }) => {
          return (
            <SelectValidatorAutoCompleteList
              selectedValidator={selectedValidator}
              searchValue={searchValue}
              handleChange={setSearchValue}
              InputProps={InputProps}
              {...params}
            />
          );
        }}
      />
    </Box>
  );
};

export default SelectValidatorList;

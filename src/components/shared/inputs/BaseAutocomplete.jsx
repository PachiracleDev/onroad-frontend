import React from 'react';
import PropTypes from 'prop-types';
import {Autocomplete} from '@mui/material';
import BaseTextField from '@/components/common/inputs/BaseTextField';
import {Controller} from 'react-hook-form';

const BaseAutocomplete = ({
  id,
  name,
  control,
  helperText,
  errors,
  label,
  multiple,
  freeSolo,
  value,
  onChange,
  onInputChange,
  renderTags,
  options,
  getOptionLabel,
  renderOption,
  isOptionEqualToValue,
}) => {
  if (control)
    return (
      <Controller
        name={name}
        control={control}
        render={({field: {onChange: controlChange, value: controlValue}}) => {
          return (
            <BaseAutocompleteInput
              id={id}
              helperText={helperText}
              errors={errors}
              label={label}
              multiple={multiple}
              freeSolo={freeSolo}
              value={controlValue}
              onChange={controlChange}
              onInputChange={onInputChange}
              renderTags={renderTags}
              options={options}
              getOptionLabel={getOptionLabel}
              renderOption={renderOption}
              isOptionEqualToValue={isOptionEqualToValue}
            />
          );
        }}
      />
    );

  if (!control)
    return (
      <BaseAutocompleteInput
        id={id}
        name={name}
        helperText={helperText}
        errors={errors}
        label={label}
        multiple={multiple}
        freeSolo={freeSolo}
        value={value}
        onChange={onChange}
        onInputChange={onInputChange}
        renderTags={renderTags}
        options={options}
        getOptionLabel={getOptionLabel}
        renderOption={renderOption}
        isOptionEqualToValue={isOptionEqualToValue}
      />
    );
};

const BaseAutocompleteInput = ({
  id,
  name,
  helperText,
  errors,
  label,
  multiple,
  freeSolo,
  value,
  onChange,
  onInputChange,
  renderTags,
  options,
  getOptionLabel,
  renderOption,
  isOptionEqualToValue,
}) => {
  return (
    <Autocomplete
      id={id}
      name={name}
      filterSelectedOptions
      includeInputInList
      multiple={multiple}
      freeSolo={freeSolo}
      onChange={(_, data) => onChange(data)}
      onInputChange={(_, data) => onInputChange(data)}
      renderTags={renderTags}
      getOptionLabel={getOptionLabel}
      value={value}
      options={options}
      renderOption={renderOption}
      isOptionEqualToValue={isOptionEqualToValue}
      renderInput={(params) => (
        <BaseTextField
          {...params}
          helperText={helperText}
          errors={errors}
          label={label}
        />
      )}
    />
  );
};

BaseAutocompleteInput.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  helperText: PropTypes.string,
  errors: PropTypes.object,
  label: PropTypes.string,
  multiple: PropTypes.bool,
  freeSolo: PropTypes.bool,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string),
  ]),
  onChange: PropTypes.func,
  onInputChange: PropTypes.func,
  renderTags: PropTypes.func,
  options: PropTypes.arrayOf(PropTypes.string),
  getOptionLabel: PropTypes.func,
  renderOption: PropTypes.func,
  isOptionEqualToValue: PropTypes.func,
};

BaseAutocomplete.propTypes = {
  ...BaseAutocompleteInput.propTypes,
  control: PropTypes.object,
};

BaseAutocomplete.defaultProps = {
  multiple: false,
  freeSolo: false,
  options: [],
  getOptionLabel: (option) => option,
  renderOption: (option) => option,
  renderTags: (option) => option,
  onChange: () => {},
  onInputChange: () => {},
  isOptionEqualToValue: (option, value) => option === value,
};

export default BaseAutocomplete;

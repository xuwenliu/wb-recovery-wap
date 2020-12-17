import React from 'react';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  formControl: {
    display: 'block',
    margin: 20,
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        width: 230,
      },
    },
  },
  lineControl: {
    margin: 20,
  },
});

function AutoCompleteWrap({
  label,
  loading,
  // handleSearch,
  onInputChange,
  onChange,
  // fetchObject,
  options,
}) {
  const classes = useStyles();
  return (
    <Autocomplete
      debug
      className={classes.formControl}
      loading={loading}
      autoSelect
      onInputChange={(event, value) => {
        if (value.length > 0) {
          // console.log('onInputChange:', value);
          onInputChange(value);
        }
      }}
      onChange={(event, value) => {
        if (value) {
          // console.log('onChange:', value);
          onChange(value);
        }
      }}
      getOptionSelected={(option, value) => {
        return option.id === value.id;
      }}
      getOptionLabel={option => `${option.label}`}
      options={options}
      renderInput={params => (
        <TextField
          {...params}
          fullWidth={false}
          style={{ minWidth: 230 }}
          label={label}
          margin="normal"
          variant="outlined"
          InputProps={{ ...params.InputProps, type: 'search' }}
        />
      )}
    />
  );
}

export default AutoCompleteWrap;

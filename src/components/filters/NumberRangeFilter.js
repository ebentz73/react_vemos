import React from 'react';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import FormGroup from '@material-ui/core/FormGroup';
import FormLabel from '@material-ui/core/FormLabel';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';

NumberRangeFilter.propTypes = {
  label: PropTypes.string,
  value: PropTypes.array,
  onChange: PropTypes.func
};

function NumberRangeFilter({ label, value, onChange }) {
  const handleStartChange = evt => {
    onChange([evt.target.value, value[1]]);
  };

  const handleEndChange = evt => {
    onChange([value[0], evt.target.value]);
  };

  return (
    <Box>
      <FormLabel>{label}</FormLabel>
      <FormGroup row>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              label="min"
              value={value[0] || ''}
              onChange={handleStartChange}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="max"
              value={value[1] || ''}
              onChange={handleEndChange}
            />
          </Grid>
        </Grid>
      </FormGroup>
    </Box>
  );
}

export default NumberRangeFilter;

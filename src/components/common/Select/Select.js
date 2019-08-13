import React from 'react';
import ReactSelect from 'react-select';
import { useTheme } from '@material-ui/core/styles';
import { useStyles, getSelectStyles, components } from './base';

function Select(props, ref) {
  const classes = useStyles();
  const theme = useTheme();

  const selectStyles = getSelectStyles(theme);

  return (
    <ReactSelect
      ref={ref}
      classes={classes}
      styles={selectStyles}
      components={components}
      options={[]}
      {...props}
    />
  );
}

export default React.forwardRef(Select);

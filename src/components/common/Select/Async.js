import React from 'react';
import ReactAsync from 'react-select/async';
import { useTheme } from '@material-ui/core/styles';
import { useStyles, getSelectStyles, components } from './base';

function Async(props, ref) {
  const classes = useStyles();
  const theme = useTheme();

  const selectStyles = getSelectStyles(theme);

  return (
    <ReactAsync
      ref={ref}
      classes={classes}
      styles={selectStyles}
      components={components}
      {...props}
    />
  );
}

export default React.forwardRef(Async);

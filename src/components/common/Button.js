import React from 'react';
import PropTypes from 'prop-types';
import Icon from '@material-ui/core/Icon';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import Box from '@material-ui/core/Box';

LoadingButton.propTypes = {
  loading: PropTypes.bool,
  icon: PropTypes.string,
  disabled: PropTypes.bool,
  children: PropTypes.node,
  variant: PropTypes.string,
  color: PropTypes.string,
  type: PropTypes.string,
  buttonProps: PropTypes.object
};

LoadingButton.defaultProps = {
  variant: 'contained',
  color: 'primary',
  buttonProps: {}
};

function LoadingButton({
  loading,
  icon,
  children,
  disabled,
  buttonProps,
  variant,
  color,
  type,
  ...rest
}) {
  return (
    <Box display="inline-block" position="relative" {...rest}>
      <Button
        disabled={loading || disabled}
        color={color}
        variant={variant}
        type={type}
        {...buttonProps}
      >
        {icon && <Box component={Icon} children={icon} mr={1} />}
        {children}
      </Button>
      {loading && (
        <Box
          component={CircularProgress}
          position="absolute"
          top="50%"
          left="50%"
          mt="-12px"
          ml="-12px"
          size={24}
        />
      )}
    </Box>
  );
}

export default LoadingButton;

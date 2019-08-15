import React from 'react';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';

LoadingContainer.propTypes = {
  loading: PropTypes.bool,
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.func])
};

function LoadingContainer({ loading, children, error, ...rest }) {
  const boxProps = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 1,
    height: '200px',
    ...rest
  };

  if (loading) {
    return (
      <Box {...boxProps}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box p={3} {...boxProps}>
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  if (typeof children === 'function') {
    return children();
  }

  return children;
}

export default LoadingContainer;

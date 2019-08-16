import React from 'react';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

StatItem.propTypes = {
  label: PropTypes.node,
  value: PropTypes.node
};

function StatItem({ label, value, ...props }) {
  return (
    <Box component={Paper} p={2} {...props}>
      <Typography color="textSecondary" variant="h6" gutterBottom>
        {label}
      </Typography>
      <Typography variant="h6">{value || '-'}</Typography>
    </Box>
  );
}

export default StatItem;

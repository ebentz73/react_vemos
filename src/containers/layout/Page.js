import React from 'react';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';

Page.propTypes = {
  children: PropTypes.node,
  title: PropTypes.string
};

export default function Page({ title, children }) {
  return (
    <Box display="flex" flexDirection="column" p={3}>
      {title && (
        <Typography variant="h3" gutterBottom>
          {title}
        </Typography>
      )}
      {children}
    </Box>
  );
}

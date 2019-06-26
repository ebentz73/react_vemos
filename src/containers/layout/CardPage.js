import React from 'react';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';

CardPage.propTypes = {
  children: PropTypes.node,
  title: PropTypes.string
};

export default function CardPage({ title, children }) {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignSelf="center"
      justifySelf="center"
      p={3}
    >
      {title && (
        <Typography variant="h3" gutterBottom>
          {title}
        </Typography>
      )}
      <Box component={Paper} p={2}>
        {children}
      </Box>
    </Box>
  );
}

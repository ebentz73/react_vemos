import React from 'react';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

DescriptionList.propTypes = {
  items: PropTypes.array
};

function DescriptionList({ items, ...props }) {
  return (
    <Grid container spacing={2} {...props}>
      {items.map((item, i) => (
        <Grid key={i} item xs={6} sm={4} md={3} lg={2}>
          <Box display="flex" alignItems="center">
            <Typography
              color="textSecondary"
              variant="caption"
            >{`${item.label}:`}</Typography>
            <Box flex={1} ml={3}>
              {item.value}
            </Box>
          </Box>
        </Grid>
      ))}
    </Grid>
  );
}

export default DescriptionList;

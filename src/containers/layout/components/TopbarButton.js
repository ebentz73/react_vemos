import React from 'react';
import PropTypes from 'prop-types';
import Link from 'react-router-dom';
import { Button, Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

TopbarButton.propTypes = {
  children: PropTypes.node,
  buttonProps: PropTypes.object,
  isMenuItem: PropTypes.bool,
  route: PropTypes.string
};

TopbarButton.defaultProps = {
  isMenuItem: false,
  route: ''
};

const useStyles = makeStyles(theme => ({
  container: {
    '&:hover': {
      backgroundColor: theme.palette.secondary.main
    }
  },
  buttonRoot: {
    '&:hover': {
      color: 'white'
    }
  },
  buttonLabel: {
    justifyContent: 'flex-start',
    alignItems: 'self-start',
    textTransform: 'none',
    marginLeft: theme.spacing(1)
  }
}));

export default function TopbarButton({
  isMenuItem,
  route,
  children,
  ...buttonProps
}) {
  const classes = useStyles();
  const conditionalProps = isMenuItem
    ? {
        component: Link,
        href: `https://${process.env.WEB_APP_URL + route}`,
        target: '_blank'
      }
    : {
        color: 'inherit'
      };

  return (
    <Box display="flex" className={classes.container} {...buttonProps}>
      <Button
        classes={{
          root: classes.buttonRoot,
          label: classes.buttonLabel
        }}
        fullWidth={true}
        {...conditionalProps}
      >
        {children}
      </Button>
    </Box>
  );
}

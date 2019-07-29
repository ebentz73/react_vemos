import React from 'react';
import PropTypes from 'prop-types';
import Link from 'react-router-dom';
import { Button, Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

TopbarButton.propTypes = {
  children: PropTypes.node,
  buttonProps: PropTypes.object,
  isMenuItem: PropTypes.bool,
  externalLink: PropTypes.bool,
  route: PropTypes.string
};

TopbarButton.defaultProps = {
  isMenuItem: false,
  externalLink: true,
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
  externalLink,
  children,
  buttonProps,
  ...rest
}) {
  const classes = useStyles();
  const to = externalLink
    ? `https://${process.env.WEB_APP_URL + route}`
    : route;
  const conditionalProps = isMenuItem
    ? {
        component: Link,
        href: to,
        target: '_blank'
      }
    : {
        color: 'inherit'
      };

  return (
    <Box display="flex" className={classes.container} {...rest}>
      <Button
        classes={{
          root: classes.buttonRoot,
          label: classes.buttonLabel
        }}
        fullWidth={true}
        {...conditionalProps}
        {...buttonProps}
      >
        {children}
      </Button>
    </Box>
  );
}

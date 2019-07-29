import React from 'react';
import PropTypes from 'prop-types';
import Link from 'react-router-dom';
import { Button, Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

SidebarButton.propTypes = {
  children: PropTypes.node,
  route: PropTypes.string,
  hasSubButtons: PropTypes.bool,
  isSubButton: PropTypes.bool,
  buttonProps: PropTypes.object,
  rest: PropTypes.object
};

SidebarButton.defaultProps = {
  hasSubButtons: false,
  isSubButton: false,
  route: ''
};

const useStyles = makeStyles(theme => ({
  container: {
    color: theme.palette.secondary.main,
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
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1)
  },
  subButtonLabel: {
    paddingLeft: theme.spacing(3),
    paddingTop: 0,
    paddingBottom: 0
  }
}));

export default function SidebarButton({
  route,
  hasSubButtons,
  isSubButton,
  children,
  ...buttonProps
}) {
  const classes = useStyles();
  const conditionalProps = hasSubButtons
    ? {}
    : {
        component: Link,
        href: `https://${process.env.WEB_APP_URL + route}`,
        target: '_blank'
      };
  const subButtonProps = isSubButton
    ? {
        className: classes.subButtonLabel
      }
    : {};

  return (
    <Box className={classes.container}>
      <Button
        classes={{
          root: classes.buttonRoot,
          label: classes.buttonLabel
        }}
        fullWidth={true}
        color="secondary"
        {...conditionalProps}
        {...subButtonProps}
        {...buttonProps}
      >
        {children}
      </Button>
    </Box>
  );
}

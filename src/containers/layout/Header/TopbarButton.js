import React from 'react';
import PropTypes from 'prop-types';
import { Button, Box, Link } from '@material-ui/core';
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
  },
  link: {
    display: 'flex'
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
    ? {}
    : {
        color: 'inherit'
      };

  function innerButton() {
    return (
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
    );
  }

  return (
    <Box display="flex" className={classes.container} {...rest}>
      {isMenuItem ? (
        <Link href={to} underline="none" className={classes.link}>
          {innerButton()}
        </Link>
      ) : (
        innerButton()
      )}
    </Box>
  );
}

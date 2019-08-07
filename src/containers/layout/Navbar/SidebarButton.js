import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';

SidebarButton.propTypes = {
  children: PropTypes.node,
  route: PropTypes.string,
  hasSubButtons: PropTypes.bool,
  isSubButton: PropTypes.bool,
  externalLink: PropTypes.bool,
  buttonProps: PropTypes.object,
  rest: PropTypes.object
};

SidebarButton.defaultProps = {
  hasSubButtons: false,
  isSubButton: false,
  externalLink: true,
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
  externalLink,
  hasSubButtons,
  isSubButton,
  children,
  buttonProps,
  ...rest
}) {
  const classes = useStyles();
  const to = externalLink
    ? `https://${process.env.WEB_APP_URL + route}`
    : route;

  const subButtonProps = isSubButton
    ? {
        className: classes.subButtonLabel
      }
    : {};

  const innerButton = (
    <Button
      classes={{
        root: classes.buttonRoot,
        label: classes.buttonLabel
      }}
      fullWidth={true}
      color="secondary"
      {...subButtonProps}
      {...buttonProps}
    >
      {children}
    </Button>
  );

  return (
    <Box className={classes.container} {...rest}>
      {hasSubButtons ? (
        innerButton
      ) : (
        <Link href={to} underline="none">
          {innerButton}
        </Link>
      )}
    </Box>
  );
}

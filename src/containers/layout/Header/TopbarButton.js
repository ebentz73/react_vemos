import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Link from '@material-ui/core/Link';
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

function TopbarButton(
  { isMenuItem, route, externalLink, children, buttonProps, ...rest },
  ref
) {
  const classes = useStyles();
  const to = externalLink
    ? `https://${process.env.WEB_APP_URL + route}`
    : route;
  const conditionalProps = isMenuItem
    ? {}
    : {
        color: 'inherit'
      };

  const innerButton = (
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

  return (
    <Box ref={ref} display="flex" className={classes.container} {...rest}>
      {isMenuItem ? (
        <Link href={to} underline="none" className={classes.link}>
          {innerButton}
        </Link>
      ) : (
        innerButton
      )}
    </Box>
  );
}

export default forwardRef(TopbarButton);

import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import ExpandMore from '@material-ui/icons/ExpandMore';
import ExpandLess from '@material-ui/icons/ExpandLess';
import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyles = makeStyles(theme => ({
  button: {
    '&:hover': {
      backgroundColor: theme.palette.secondary.main
    }
  },
  selected: {
    backgroundColor: theme.palette.secondary.main
  }
}));

TopbarButton.propTypes = {
  icon: PropTypes.node,
  children: PropTypes.node,
  isOpen: PropTypes.bool,
  fullWidth: PropTypes.bool,
  onClick: PropTypes.func
};

function TopbarButton(
  { icon, children, isOpen, onClick, fullWidth, ...rest },
  ref
) {
  const classes = useStyles();

  return (
    <Box
      ref={ref}
      component={Button}
      height={64}
      fullWidth={fullWidth}
      minWidth="auto!important"
      className={isOpen ? classes.selected : classes.button}
      onClick={onClick}
    >
      <Box
        pl={1}
        pr={1}
        width={1}
        display="flex"
        alignItems="center"
        justifyContent="center"
        color="primary.contrastText"
        {...rest}
      >
        {icon && (
          <Box component="span" mr={1} lineHeight={1}>
            {icon}
          </Box>
        )}
        {children}
        {isOpen === false && <ExpandMore />}
        {isOpen === true && <ExpandLess />}
      </Box>
    </Box>
  );
}

export default forwardRef(TopbarButton);

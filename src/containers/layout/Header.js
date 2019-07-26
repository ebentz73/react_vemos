import React from 'react';
import Box from '@material-ui/core/Box';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import LogoImg from '@assets/logo.png';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex'
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      flexShrink: 0
    }
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none'
    }
  },
  toolbar: theme.mixins.toolbar
}));

Header.propTypes = {
  isLoggedIn: PropTypes.bool
};

// @TODO logged-in menu
export default function Header({ isLoggedIn }) {
  const classes = useStyles();

  function handleDrawerToggle() {}

  return (
    <AppBar position="static" className={classes.appBar}>
      <Toolbar>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="Menu"
          onClick={handleDrawerToggle}
          className={classes.menuButton}
        >
          <MenuIcon />
        </IconButton>
        <Box flex={1}>
          <Box
            component="img"
            display="block"
            src={LogoImg}
            alt="Vemos"
            height={60}
          />
        </Box>
        {!isLoggedIn && <Button color="inherit">Login</Button>}
      </Toolbar>
    </AppBar>
  );
}

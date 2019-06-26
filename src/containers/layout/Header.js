import React from 'react';
import Box from '@material-ui/core/Box';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import LogoImg from '@assets/logo.png';

// @TODO logged-in menu
export default function Header() {
  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="Menu">
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
        <Button color="inherit">Login</Button>
      </Toolbar>
    </AppBar>
  );
}

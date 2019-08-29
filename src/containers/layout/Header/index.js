import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Box from '@material-ui/core/Box';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Hidden from '@material-ui/core/Hidden';
import Collapse from '@material-ui/core/Collapse';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { AuthSelectors } from '@redux/AuthRedux';
import { AppSelectors } from '@redux/AppRedux';
import TopbarMenu from './TopbarMenu';
import TopbarButton from './TopbarButton';
import TopbarCollapse from './TopbarCollapse';
import Logo from './Logo';
import DashboardButton from './DashboardButton';

import HEADER_MENU_ITEMS from './menu-items';

const useStyles = makeStyles(theme => ({
  mobileCollapse: {
    position: 'absolute',
    top: '64px',
    width: '100%',
    backgroundColor: theme.palette.primary.main,
    borderTopColor: theme.palette.secondary.main,
    borderTopWidth: '1px',
    borderTopStyle: 'solid',
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1)
  }
}));

Header.propTypes = {
  isLoggedIn: PropTypes.bool,
  loaded: PropTypes.bool,
  currentVenue: PropTypes.object,
  username: PropTypes.string
};

function Header({ isLoggedIn, loaded, currentVenue, username }) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const handleCollapse = () => {
    setOpen(false);
  };

  const topMenuItems = (
    <>
      <Hidden smDown>
        <Box display="flex">
          <DashboardButton />
          <TopbarMenu {...HEADER_MENU_ITEMS.upgrades} />
          <TopbarMenu {...HEADER_MENU_ITEMS.settings} />
          <TopbarMenu {...HEADER_MENU_ITEMS.user} text={username} />
        </Box>
      </Hidden>

      <Hidden mdUp>
        <Box mr={2}>
          <IconButton
            edge="end"
            color="inherit"
            aria-label="Menu"
            onClick={() => setOpen(!open)}
          >
            <MenuIcon />
          </IconButton>
        </Box>
      </Hidden>
    </>
  );

  return (
    <AppBar position="static">
      <Box
        component={Toolbar}
        px="0!important"
        display="flex"
        flexDirection="column"
      >
        <Box display="flex" alignItems="center" flex={1} width={1}>
          <Box display="flex" flex={1}>
            <Logo />
            {isLoggedIn && loaded && (
              <TopbarButton>{currentVenue.name}</TopbarButton>
            )}
          </Box>
          {!isLoggedIn && loaded && <Button color="inherit">Login</Button>}
          {isLoggedIn && loaded && topMenuItems}
        </Box>
        <Hidden mdUp>
          <Collapse
            in={open}
            timeout={300}
            unmountOnExit
            classes={{ container: classes.mobileCollapse }}
          >
            <DashboardButton fullWidth />
            <TopbarCollapse
              {...HEADER_MENU_ITEMS.upgrades}
              onCollapse={handleCollapse}
            />
            <TopbarCollapse
              {...HEADER_MENU_ITEMS.settings}
              onCollapse={handleCollapse}
            />
            <TopbarCollapse
              {...HEADER_MENU_ITEMS.user}
              text={username}
              onCollapse={handleCollapse}
            />
          </Collapse>
        </Hidden>
      </Box>
    </AppBar>
  );
}

const mapStatesToProps = state => ({
  loaded: AppSelectors.selectLoaded(state),
  isLoggedIn: AuthSelectors.selectLoggedIn(state),
  currentVenue: AuthSelectors.selectCurrentVenue(state),
  username: AuthSelectors.selectUsername(state)
});

export default connect(mapStatesToProps)(Header);

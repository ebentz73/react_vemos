import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import DashboardIcon from '@material-ui/icons/Dashboard';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import SettingsIcon from '@material-ui/icons/Settings';
import UserIcon from '@material-ui/icons/Person';
import Hidden from '@material-ui/core/Hidden';
import Collapse from '@material-ui/core/Collapse';
import makeStyles from '@material-ui/core/styles/makeStyles';
import LogoImg from '@assets/logo.png';
import TopBarButton from '@containers/layout/Header/TopbarButton';
import TopBarMenu from '@containers/layout/Header/TopbarMenu';
import TopBarCollapse from '@containers/layout/Header/TopbarCollapse';
import {
  settingItems,
  upgradeItems,
  userItems
} from '@containers/layout/Header/constants';

const useStyles = makeStyles(theme => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1
  },
  toolbar: {
    [theme.breakpoints.down('md')]: {
      display: 'flex',
      flexDirection: 'column',
      paddingLeft: 0,
      paddingRight: 0
    }
  },
  mobileCollapse: {
    width: '100%',
    borderTopColor: theme.palette.secondary.main,
    borderTopWidth: '1px',
    borderTopStyle: 'solid',
    paddingTop: theme.spacing(2)
  }
}));

Header.propTypes = {
  isLoggedIn: PropTypes.bool
};

export default function Header({ isLoggedIn }) {
  const classes = useStyles();
  const [anchorUpgrade, setAnchorUpgrade] = useState(null);
  const [anchorSetting, setAnchorSetting] = useState(null);
  const [anchorUser, setAnchorUser] = useState(null);
  const [openMobileTopBar, setMobileTopBar] = useState(false);
  const [openUpgrade, setUpgradeCollapse] = useState(null);
  const [openSetting, setSettingCollapse] = useState(null);
  const [openUser, setUserCollapse] = useState(null);

  function handleUpgradeClose() {
    setAnchorUpgrade(null);
  }

  function handleSettingClose() {
    setAnchorSetting(null);
  }

  function handleUserClose() {
    setAnchorUser(null);
  }

  function handleUpgradeClick(event) {
    setAnchorUpgrade(event.currentTarget);
  }

  function handleSettingClick(event) {
    setAnchorSetting(event.currentTarget);
  }

  function handleUserClick(event) {
    setAnchorUser(event.currentTarget);
  }

  function handleTopbarToggle() {
    setMobileTopBar(!openMobileTopBar);
  }

  function handleUpgradeCollapse() {
    setUpgradeCollapse(!openUpgrade);
  }

  function handleSettingCollapse() {
    setSettingCollapse(!openSetting);
  }

  function handleUserCollapse() {
    setUserCollapse(!openUser);
  }

  const showTopMenus = (
    <>
      <Hidden smDown>
        <Box display="flex">
          <TopBarButton route="/analytics" isMenuItem={true}>
            <Box component="span" display="flex" color="white">
              <Box mr={1}>
                <DashboardIcon />
              </Box>
              Dashboard
            </Box>
          </TopBarButton>

          <TopBarMenu
            text="Upgrades"
            anchorEl={anchorUpgrade}
            handleMenuClick={handleUpgradeClick}
            handleMenuClose={handleUpgradeClose}
            Icon={LockOpenIcon}
            menuItems={upgradeItems}
          />

          <TopBarMenu
            text="Settings"
            anchorEl={anchorSetting}
            handleMenuClick={handleSettingClick}
            handleMenuClose={handleSettingClose}
            Icon={SettingsIcon}
            menuItems={settingItems}
          />

          <TopBarMenu
            text="User"
            anchorEl={anchorUser}
            handleMenuClick={handleUserClick}
            handleMenuClose={handleUserClose}
            Icon={UserIcon}
            menuItems={userItems}
          />
        </Box>
      </Hidden>

      <Hidden mdUp>
        <Box mr={2}>
          <IconButton
            edge="end"
            color="inherit"
            aria-label="Menu"
            onClick={handleTopbarToggle}
          >
            <MenuIcon />
          </IconButton>
        </Box>
      </Hidden>
    </>
  );

  return (
    <AppBar position="static" className={classes.appBar}>
      <Toolbar className={classes.toolbar}>
        <Box display="flex" flex={1} width={1}>
          <Box display="flex" flex={1}>
            <Box
              component="img"
              display="block"
              src={LogoImg}
              alt="Vemos"
              height={64}
            />
          </Box>
          {!isLoggedIn && <Button color="inherit">Login</Button>}
          {isLoggedIn && showTopMenus}
        </Box>
        <Collapse
          in={openMobileTopBar}
          timeout={300}
          unmountOnExit
          classes={{ container: classes.mobileCollapse }}
        >
          <Box display="flex" flexDirection="column" width={1}>
            <TopBarButton route="/dashboard" isMenuItem={true}>
              <Box component="span" display="flex" color="white">
                <Box mr={1}>
                  <DashboardIcon />
                </Box>
                Dashboard
              </Box>
            </TopBarButton>

            <TopBarCollapse
              text="Upgrades"
              open={openUpgrade}
              Icon={LockOpenIcon}
              handleCollapse={handleUpgradeCollapse}
              menuItems={upgradeItems}
            />

            <TopBarCollapse
              text="Settings"
              open={openSetting}
              Icon={SettingsIcon}
              handleCollapse={handleSettingCollapse}
              menuItems={settingItems}
            />

            <TopBarCollapse
              text="User"
              open={openUser}
              Icon={UserIcon}
              handleCollapse={handleUserCollapse}
              menuItems={userItems}
            />
          </Box>
        </Collapse>
      </Toolbar>
    </AppBar>
  );
}

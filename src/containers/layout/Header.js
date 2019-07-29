import React from 'react';
import Box from '@material-ui/core/Box';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ReportIcon from '@material-ui/icons/Report';
import DataIcon from '@material-ui/icons/Storage';
import POSIcon from '@material-ui/icons/FiberManualRecord';
import LogoImg from '@assets/logo.png';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import TopBarButton from './components/TopbarButton';
import DashboardIcon from '@material-ui/icons/Dashboard';
import UpdateIcon from '@material-ui/icons/Update';
import SettingsIcon from '@material-ui/icons/Settings';
import UserIcon from '@material-ui/icons/Person';
import IDIcon from '@material-ui/icons/PictureInPicture';
import ConnectIcon from '@material-ui/icons/SwapHorizontalCircle';
import { ExpandLess, ExpandMore } from '@material-ui/icons';

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
  buttonIcon: {
    marginRight: theme.spacing(1)
  },
  toolbar: theme.mixins.toolbar
}));

Header.propTypes = {
  isLoggedIn: PropTypes.bool
};

const TopBarMenu = props => (
  <Menu
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'right'
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'right'
    }}
    keepMounted
    {...props}
  />
);

// @TODO logged-in menu
export default function Header({ isLoggedIn }) {
  const classes = useStyles();
  const [anchorUpgrade, setAnchorUpgrade] = React.useState(null);
  const [anchorSetting, setAnchorSetting] = React.useState(null);
  const [anchorUser, setAnchorUser] = React.useState(null);

  function handleDrawerToggle() {}

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

  function showTopMenus() {
    return (
      <Box display="flex">
        <TopBarButton route="/analytics" isMenuItem={true}>
          <DashboardIcon className={classes.buttonIcon} />
          Dashboard
        </TopBarButton>
        <TopBarButton
          aria-controls="upgrades-menu"
          onClick={handleUpgradeClick}
          height={64}
        >
          <UpdateIcon className={classes.buttonIcon} />
          Upgrades
          {anchorUpgrade ? <ExpandLess /> : <ExpandMore />}
        </TopBarButton>
        <TopBarMenu
          id="upgrades-menu"
          anchorEl={anchorUpgrade}
          open={Boolean(anchorUpgrade)}
          onClose={handleUpgradeClose}
        >
          <TopBarButton route="/upgrades/Reports" isMenuItem={true}>
            <ReportIcon className={classes.buttonIcon} />
            Automated Reports
          </TopBarButton>
          <TopBarButton route="/upgrades/dataoperations" isMenuItem={true}>
            <DataIcon className={classes.buttonIcon} />
            Data Operation
          </TopBarButton>
          <TopBarButton route="/upgrades/id-scan" isMenuItem={true}>
            <IDIcon className={classes.buttonIcon} />
            ID Scan
          </TopBarButton>
          <TopBarButton route="/upgrades/pos-integration" isMenuItem={true}>
            <POSIcon className={classes.buttonIcon} />
            POS Integration
          </TopBarButton>
          <TopBarButton route="/upgrades/vemos-connect" isMenuItem={true}>
            <ConnectIcon className={classes.buttonIcon} />
            Vemos Conect
          </TopBarButton>
        </TopBarMenu>
        <TopBarButton
          aria-controls="settings-menu"
          onClick={handleSettingClick}
          height={64}
        >
          <SettingsIcon className={classes.buttonIcon} />
          Settings
          {anchorSetting ? <ExpandLess /> : <ExpandMore />}
        </TopBarButton>
        <TopBarMenu
          id="settings-menu"
          anchorEl={anchorSetting}
          open={Boolean(anchorSetting)}
          onClose={handleSettingClose}
        >
          <TopBarButton route="/settings" isMenuItem={true}>
            Venue
          </TopBarButton>
          <TopBarButton route="/settings/event" isMenuItem={true}>
            Event
          </TopBarButton>
          <TopBarButton route="/users/staff" isMenuItem={true}>
            Users
          </TopBarButton>
          <TopBarButton route="/tables" isMenuItem={true}>
            Tables
          </TopBarButton>
          <TopBarButton route="/pricing/cover" isMenuItem={true}>
            Pricing
          </TopBarButton>
          <TopBarButton route="/emails" isMenuItem={true}>
            Emails
          </TopBarButton>
          <TopBarButton route="/upgrade-center" isMenuItem={true}>
            Upgrade Center
          </TopBarButton>
        </TopBarMenu>
        <TopBarButton onClick={handleUserClick} height={64}>
          <UserIcon className={classes.buttonIcon} />
          User
          {anchorUser ? <ExpandLess /> : <ExpandMore />}
        </TopBarButton>
        <TopBarMenu
          id="settings-menu"
          anchorEl={anchorUser}
          open={Boolean(anchorUser)}
          onClose={handleUserClose}
        >
          <TopBarButton route="/upgrades/Reports" isMenuItem={true}>
            My Account
          </TopBarButton>
          <TopBarButton route="/upgrades/Reports" isMenuItem={true}>
            Log Out
          </TopBarButton>
        </TopBarMenu>
      </Box>
    );
  }

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
        <Box flex={1} display="flex">
          <Box
            component="img"
            display="block"
            src={LogoImg}
            alt="Vemos"
            height={64}
          />
        </Box>
        {!isLoggedIn && <Button color="inherit">Login</Button>}
        {isLoggedIn && showTopMenus()}
      </Toolbar>
    </AppBar>
  );
}

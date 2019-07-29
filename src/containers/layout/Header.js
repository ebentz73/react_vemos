import React from 'react';
import PropTypes from 'prop-types';
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
import DashboardIcon from '@material-ui/icons/Dashboard';
import UpdateIcon from '@material-ui/icons/Update';
import SettingsIcon from '@material-ui/icons/Settings';
import UserIcon from '@material-ui/icons/Person';
import IDIcon from '@material-ui/icons/PictureInPicture';
import ConnectIcon from '@material-ui/icons/SwapHorizontalCircle';
import Hidden from '@material-ui/core/Hidden';
import Collapse from '@material-ui/core/Collapse';
import ExpandMore from '@material-ui/icons/ExpandMore';
import ExpandLess from '@material-ui/icons/ExpandLess';
import { makeStyles } from '@material-ui/core/styles';
import LogoImg from '@assets/logo.png';
import TopBarButton from '@containers/layout/components/TopbarButton';

const useStyles = makeStyles(theme => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('md')]: {
      display: 'none'
    }
  },
  buttonIcon: {
    marginRight: theme.spacing(1)
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
    getContentAnchorEl={null}
    keepMounted
    {...props}
  />
);

export default function Header({ isLoggedIn }) {
  const classes = useStyles();
  const [anchorUpgrade, setAnchorUpgrade] = React.useState(null);
  const [anchorSetting, setAnchorSetting] = React.useState(null);
  const [anchorUser, setAnchorUser] = React.useState(null);
  const [openMobileTopBar, setMobileTopBar] = React.useState(false);
  const [openUpgrade, setUpgradeCollapse] = React.useState(null);
  const [openSetting, setSettingCollapse] = React.useState(null);
  const [openUser, setUserCollapse] = React.useState(null);
  const settingItems = [
    {
      route: '/settings',
      text: 'Venue'
    },
    {
      route: '/settings/event',
      text: 'Event'
    },
    {
      route: '/users/staff',
      text: 'Users'
    },
    {
      route: '/tables',
      text: 'Tables'
    },
    {
      route: '/pricing/cover',
      text: 'Pricing'
    },
    {
      route: '/emails',
      text: 'Emails'
    },
    {
      route: '/upgrade-center',
      text: 'Upgrade Center'
    }
  ];

  const upgradeItems = [
    {
      route: '/upgrades/Reports',
      text: 'Automated Reports',
      icon: ReportIcon
    },
    {
      route: '/upgrades/dataoperations',
      text: 'Data Operation',
      icon: DataIcon
    },
    {
      route: '/upgrades/id-scan',
      text: 'ID Scan',
      icon: IDIcon
    },
    {
      route: '/upgrades/pos-integration',
      text: 'POS Integration',
      icon: POSIcon
    },
    {
      route: '/upgrades/vemos-connect',
      text: 'Vemos Connect',
      icon: ConnectIcon
    }
  ];

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

  function showTopMenus() {
    return (
      <React.Fragment>
        <Hidden smDown>
          <Box display="flex">
            <TopBarButton route="/analytics" isMenuItem={true}>
              <span style={{ display: 'flex', color: 'white' }}>
                <DashboardIcon className={classes.buttonIcon} />
                Dashboard
              </span>
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
              {upgradeItems.map((item, index) => {
                const Icon = item.icon;

                return (
                  <TopBarButton
                    key={index}
                    route={item.route}
                    isMenuItem={true}
                  >
                    <Icon className={classes.buttonIcon} />
                    {item.text}
                  </TopBarButton>
                );
              })}
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
              {settingItems.map((item, index) => {
                return (
                  <TopBarButton
                    key={index}
                    route={item.route}
                    isMenuItem={true}
                  >
                    {item.text}
                  </TopBarButton>
                );
              })}
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
              <TopBarButton route="/account" isMenuItem={true}>
                My Account
              </TopBarButton>
              <TopBarButton route="/dashboard" isMenuItem={true}>
                Log Out
              </TopBarButton>
            </TopBarMenu>
          </Box>
        </Hidden>

        <Hidden mdUp>
          <IconButton
            edge="end"
            color="inherit"
            aria-label="Menu"
            onClick={handleTopbarToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
        </Hidden>
      </React.Fragment>
    );
  }

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
          {isLoggedIn && showTopMenus()}
        </Box>
        <Collapse
          in={openMobileTopBar}
          timeout={300}
          unmountOnExit
          classes={{ container: classes.mobileCollapse }}
        >
          <Box display="flex" flexDirection="column" width={1}>
            <TopBarButton route="/dashboard" isMenuItem={true}>
              <span style={{ display: 'flex', color: 'white' }}>
                <DashboardIcon className={classes.buttonIcon} />
                Dashboard
              </span>
            </TopBarButton>
            <TopBarButton
              aria-controls="upgrades-menu"
              onClick={handleUpgradeCollapse}
              height={64}
            >
              <UpdateIcon className={classes.buttonIcon} />
              Upgrades
              {openUpgrade ? <ExpandLess /> : <ExpandMore />}
            </TopBarButton>
            <Collapse in={openUpgrade} timeout={300} unmountOnExit>
              {upgradeItems.map((item, index) => {
                const Icon = item.icon;

                return (
                  <TopBarButton
                    key={index}
                    kroute={item.route}
                    isMenuItem={true}
                  >
                    <Box display="flex" ml={1} color="white">
                      <Icon className={classes.buttonIcon} />
                      {item.text}
                    </Box>
                  </TopBarButton>
                );
              })}
            </Collapse>
            <TopBarButton
              aria-controls="settings-menu"
              onClick={handleSettingCollapse}
              height={64}
            >
              <SettingsIcon className={classes.buttonIcon} />
              Settings
              {openSetting ? <ExpandLess /> : <ExpandMore />}
            </TopBarButton>
            <Collapse in={openSetting} timeout={300} unmountOnExit>
              {settingItems.map((item, index) => {
                return (
                  <TopBarButton
                    key={index}
                    route={item.route}
                    isMenuItem={true}
                  >
                    <Box ml={1} color="white">
                      {item.text}
                    </Box>
                  </TopBarButton>
                );
              })}
            </Collapse>
            <TopBarButton onClick={handleUserCollapse} height={64}>
              <UserIcon className={classes.buttonIcon} />
              User
              {openUser ? <ExpandLess /> : <ExpandMore />}
            </TopBarButton>
            <Collapse in={openUser} timeout={300} unmountOnExit>
              <TopBarButton route="/account" isMenuItem={true}>
                <Box ml={1} color="white">
                  My Account
                </Box>
              </TopBarButton>
              <TopBarButton route="/dashboard" isMenuItem={true}>
                <Box ml={1} color="white">
                  Log Out
                </Box>
              </TopBarButton>
            </Collapse>
          </Box>
        </Collapse>
      </Toolbar>
    </AppBar>
  );
}

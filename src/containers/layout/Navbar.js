import React from 'react';
import PropTypes from 'prop-types';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import ListItemText from '@material-ui/core/ListItemText';
import Box from '@material-ui/core/Box';
import { makeStyles, styled, useTheme } from '@material-ui/core/styles';
import DashboardIcon from '@material-ui/icons/Dashboard';
import VenueIcon from '@material-ui/icons/Business';
import ReservationIcon from '@material-ui/icons/ListAlt';
import GroupIcon from '@material-ui/icons/Group';
import EventIcon from '@material-ui/icons/Event';
import MarketingIcon from '@material-ui/icons/RssFeed';
import TransactionIcon from '@material-ui/icons/MonetizationOn';
import WatchLaterIcon from '@material-ui/icons/WatchLater';
import { ExpandLess, ExpandMore } from '@material-ui/icons';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Collapse from '@material-ui/core/Collapse';

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  drawer: {
    [theme.breakpoints.up('sm')]: {
      flexShrink: 0
    }
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none'
    }
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
    backgroundColor: theme.palette.primary.main
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3)
  },
  listItem: {
    color: theme.palette.secondary,
    width: 1
  }
}));

function Navbar(props) {
  const { container } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [openAnalytics, setOpenAnalytics] = React.useState(true);
  const [openManage, setOpenManage] = React.useState(true);

  function handleAnalyticsClick() {
    setOpenAnalytics(!openAnalytics);
  }

  function handleManageClick() {
    setOpenManage(!openManage);
  }

  function handleDrawerToggle() {
    setMobileOpen(!mobileOpen);
  }

  const NavListItem = styled(ListItem)({
    color: theme.palette.secondary.main
  });

  const NavListItemText = styled(ListItemText)({
    color: theme.palette.secondary.main
  });

  const drawer = (
    <Box>
      <Box className={classes.toolbar} />
      <List component="nav">
        <NavListItem button>
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
          <NavListItemText secondary="DASHBOARD" />
        </NavListItem>
        <NavListItem button onClick={handleAnalyticsClick}>
          <NavListItemText secondary="ANALYTICS" />
          {openAnalytics ? <ExpandLess /> : <ExpandMore />}
        </NavListItem>
        <Collapse in={openAnalytics} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <NavListItem button color="secondary">
              <ListItemIcon>
                <WatchLaterIcon />
              </ListItemIcon>
              <NavListItemText secondary="Real Time" />
            </NavListItem>
            <NavListItem button color="secondary">
              <ListItemIcon>
                <VenueIcon />
              </ListItemIcon>
              <NavListItemText secondary="Venue" />
            </NavListItem>
            <NavListItem button color="secondary">
              <ListItemIcon>
                <ReservationIcon />
              </ListItemIcon>
              <NavListItemText secondary="Reservations" />
            </NavListItem>
            <NavListItem button color="secondary">
              <ListItemIcon>
                <GroupIcon />
              </ListItemIcon>
              <NavListItemText secondary="Guests" />
            </NavListItem>
            <NavListItem button color="secondary">
              <ListItemIcon>
                <EventIcon />
              </ListItemIcon>
              <NavListItemText secondary="Events" />
            </NavListItem>
            <NavListItem button color="secondary">
              <ListItemIcon>
                <MarketingIcon />
              </ListItemIcon>
              <NavListItemText secondary="Marketing" />
            </NavListItem>
            <NavListItem button color="secondary">
              <ListItemIcon>
                <TransactionIcon />
              </ListItemIcon>
              <NavListItemText secondary="Transactions" />
            </NavListItem>
          </List>
        </Collapse>
        <NavListItem button onClick={handleManageClick}>
          <NavListItemText secondary="MANAGE" />
          {openManage ? <ExpandLess /> : <ExpandMore />}
        </NavListItem>
        <Collapse in={openManage} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <NavListItem button color="secondary">
              <ListItemIcon>
                <EventIcon />
              </ListItemIcon>
              <NavListItemText secondary="Events & Tickets" />
            </NavListItem>
            <NavListItem button color="secondary">
              <ListItemIcon>
                <ReservationIcon />
              </ListItemIcon>
              <NavListItemText secondary="Reservations" />
            </NavListItem>
            <NavListItem button color="secondary">
              <ListItemIcon>
                <ReservationIcon />
              </ListItemIcon>
              <NavListItemText secondary="Reservations" />
            </NavListItem>
            <NavListItem button color="secondary">
              <ListItemIcon>
                <GroupIcon />
              </ListItemIcon>
              <NavListItemText secondary="Guest List" />
            </NavListItem>
            <NavListItem button color="secondary">
              <ListItemIcon>
                <MarketingIcon />
              </ListItemIcon>
              <NavListItemText secondary="Marketing" />
            </NavListItem>
            <NavListItem button color="secondary">
              <ListItemIcon>
                <GroupIcon />
              </ListItemIcon>
              <NavListItemText secondary="Guest Profiles" />
            </NavListItem>
            <NavListItem button color="secondary">
              <ListItemIcon>
                <GroupIcon />
              </ListItemIcon>
              <NavListItemText secondary="ID Scan" />
            </NavListItem>
          </List>
        </Collapse>
      </List>
    </Box>
  );

  return (
    <Box display="flex">
      <CssBaseline />
      <Box className={classes.drawer}>
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={'left'}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper
            }}
            ModalProps={{
              keepMounted: true
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </Box>
    </Box>
  );
}

Navbar.propTypes = {
  container: PropTypes.object
};

export default Navbar;

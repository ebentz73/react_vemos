import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import moment from 'moment';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import ListItemText from '@material-ui/core/ListItemText';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import DashboardIcon from '@material-ui/icons/Dashboard';
import VenueIcon from '@material-ui/icons/Business';
import ReservationIcon from '@material-ui/icons/ListAlt';
import GroupIcon from '@material-ui/icons/Group';
import EventIcon from '@material-ui/icons/Event';
import MarketingIcon from '@material-ui/icons/RssFeed';
import TransactionIcon from '@material-ui/icons/MonetizationOn';
import WatchLaterIcon from '@material-ui/icons/WatchLater';
import GuestListIcon from '@material-ui/icons/CheckCircle';
import TileIcon from '@material-ui/icons/ViewModule';
import ListIcon from '@material-ui/icons/ViewList';
import MapIcon from '@material-ui/icons/Place';
import ConnectIcon from '@material-ui/icons/SwapHorizontalCircle';
import ShareIcon from '@material-ui/icons/Share';
import IDIcon from '@material-ui/icons/PictureInPicture';
import DayIcon from '@material-ui/icons/AccessTime';
import BlockIcon from '@material-ui/icons/Block';
import { ExpandLess, ExpandMore } from '@material-ui/icons';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Collapse from '@material-ui/core/Collapse';
import SidebarButton from '@containers/layout/components/SidebarButton';
import { AuthSelectors } from '@redux/AuthRedux';

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
    color: 'white'
  },
  listButton: {
    color: 'white'
  },
  listText: {
    fontWeight: 500
  },
  buttonIcon: {
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(4)
  },
  subButton: {
    paddingLeft: theme.spacing(3)
  }
}));

Navbar.propTypes = {
  venue: PropTypes.object
};

function Navbar({ venue }) {
  const classes = useStyles();
  const [openAnalytics, setOpenAnalytics] = React.useState(true);
  const [openManage, setOpenManage] = React.useState(true);
  const [openReservation, setOpenReservation] = React.useState(false);
  const [openMarketing, setOpenMarketing] = React.useState(false);
  const [openID, setOpenID] = React.useState(false);
  const currentDate = moment().format('YYYY-MM-DD');
  const thirtyDaysAgo = moment()
    .subtract(29, 'days')
    .format('YYYY-MM-DD');

  function handleAnalyticsClick() {
    setOpenAnalytics(!openAnalytics);
  }

  function handleManageClick() {
    setOpenManage(!openManage);
  }

  function handleReservationClick() {
    setOpenReservation(!openReservation);
  }

  function handleMarketingClick() {
    setOpenMarketing(!openMarketing);
  }

  function handleIDClick() {
    setOpenID(!openID);
  }

  const analyticsArray = [
    {
      route: '/analytics',
      text: 'Real Time',
      icon: WatchLaterIcon
    },
    {
      route: `/analytics/${thirtyDaysAgo}/${currentDate}`,
      text: 'Venue',
      icon: VenueIcon
    },
    {
      route: `/analytics/${thirtyDaysAgo}/${currentDate}/reservations`,
      text: 'Reservations',
      icon: ReservationIcon
    },
    {
      route: `/analytics/${thirtyDaysAgo}/${currentDate}/guests`,
      text: 'Guests',
      icon: GroupIcon
    },
    {
      route: `/analytics/events/${venue.id}`,
      text: 'Events',
      icon: EventIcon
    },
    {
      route: `/analytics/${thirtyDaysAgo}/${currentDate}/referrers`,
      text: 'Marketing',
      icon: MarketingIcon
    }
  ];

  const drawer = (
    <Box>
      <Box className={classes.toolbar} />
      <List component="nav">
        <SidebarButton route="/analytics">
          <DashboardIcon className={classes.buttonIcon} />
          DASHBOARD
        </SidebarButton>
        <ListItem
          classes={{ root: classes.listItem, button: classes.listButton }}
          button
          onClick={handleAnalyticsClick}
        >
          <ListItemText
            classes={{ primary: classes.listText }}
            primary="ANALYTICS"
          />
          {openAnalytics ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={openAnalytics} timeout={500} unmountOnExit>
          {analyticsArray.map((item, index) => {
            const Icon = item.icon;

            return (
              <SidebarButton key={index} route={item.route}>
                <Icon className={classes.buttonIcon} />
                {item.text}
              </SidebarButton>
            );
          })}
          <SidebarButton
            route={`/transaction/?filters[start]=${thirtyDaysAgo}&filters[end]=${currentDate}`}
            externalLink={false}
          >
            <TransactionIcon className={classes.buttonIcon} />
            Transactions
          </SidebarButton>
        </Collapse>
        <ListItem
          button
          classes={{ root: classes.listItem, button: classes.listButton }}
          onClick={handleManageClick}
        >
          <ListItemText
            classes={{ primary: classes.listText }}
            primary="MANAGE"
          />
          {openManage ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={openManage} timeout={500} unmountOnExit>
          <List component="div" disablePadding>
            <SidebarButton route="/events">
              <EventIcon className={classes.buttonIcon} />
              Events & Tickets
            </SidebarButton>
            <SidebarButton
              onClick={handleReservationClick}
              hasSubButtons={true}
            >
              <ReservationIcon className={classes.buttonIcon} />
              Reservations
              {openReservation ? <ExpandLess /> : <ExpandMore />}
            </SidebarButton>
            <Collapse in={openReservation} timeout={300} unmountOnExit>
              <SidebarButton route="/reservations" isSubButton={true}>
                <TileIcon className={classes.buttonIcon} />
                Title View
              </SidebarButton>
              <SidebarButton route="/reservations/list" isSubButton={true}>
                <ListIcon className={classes.buttonIcon} />
                List View
              </SidebarButton>
              <SidebarButton route="/table-map" isSubButton={true}>
                <MapIcon className={classes.buttonIcon} />
                Table Map
              </SidebarButton>
            </Collapse>
            <SidebarButton route="/guestlist">
              <GuestListIcon className={classes.buttonIcon} />
              Guest List
            </SidebarButton>
            <SidebarButton onClick={handleMarketingClick} hasSubButtons={true}>
              <MarketingIcon className={classes.buttonIcon} />
              Marketing
              {openMarketing ? <ExpandLess /> : <ExpandMore />}
            </SidebarButton>
            <Collapse in={openMarketing} timeout={300} unmountOnExit>
              <SidebarButton route="/campaigns/list/done" isSubButton={true}>
                <ConnectIcon className={classes.buttonIcon} />
                Vemos Connect
              </SidebarButton>
              <SidebarButton route="/referrers" isSubButton={true}>
                <ShareIcon className={classes.buttonIcon} />
                Referrers
              </SidebarButton>
            </Collapse>
            <SidebarButton route="/guests">
              <GroupIcon className={classes.buttonIcon} />
              Guest Profiles
            </SidebarButton>
            <SidebarButton onClick={handleIDClick} hasSubButtons={true}>
              <IDIcon className={classes.buttonIcon} />
              ID Scan
              {openID ? <ExpandLess /> : <ExpandMore />}
            </SidebarButton>
            <Collapse in={openID} timeout={300} unmountOnExit>
              <SidebarButton route="/id-scan/history/" isSubButton={true}>
                <DayIcon className={classes.buttonIcon} />
                Day History
              </SidebarButton>
              <SidebarButton route="/id-scan/bans" isSubButton={true}>
                <BlockIcon className={classes.buttonIcon} />
                Ban List
              </SidebarButton>
            </Collapse>
          </List>
        </Collapse>
      </List>
    </Box>
  );

  return (
    <Box display="flex">
      <CssBaseline />
      <Box className={classes.drawer}>
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

const mapStateToProps = state => ({
  venue: AuthSelectors.selectCurrentVenue(state)
});

export default connect(mapStateToProps)(Navbar);

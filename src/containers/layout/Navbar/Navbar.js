import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import moment from 'moment';
import { useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import ListItemText from '@material-ui/core/ListItemText';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ReservationIcon from '@material-ui/icons/ListAlt';
import GroupIcon from '@material-ui/icons/Group';
import EventIcon from '@material-ui/icons/Event';
import MarketingIcon from '@material-ui/icons/RssFeed';
import TransactionIcon from '@material-ui/icons/MonetizationOn';
import GuestListIcon from '@material-ui/icons/CheckCircle';
import IDIcon from '@material-ui/icons/CreditCard';
import ExpandMore from '@material-ui/icons/ExpandMore';
import ExpandLess from '@material-ui/icons/ExpandLess';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Collapse from '@material-ui/core/Collapse';
import SidebarButton from '@containers/layout/Navbar/SidebarButton';
import SidebarCollapse from '@containers/layout/Navbar/SidebarCollapse';
import { AuthSelectors } from '@redux/AuthRedux';
import {
  getAnalyticsArray,
  reservationArray,
  marketingArray,
  IDScanArray
} from '@containers/layout/Navbar/constants';

const DRAWER_WIDTH = 240;
const CURRENT_DATE = moment().format('YYYY-MM-DD');
const THIRTY_DAYS_AGO = moment()
  .subtract(29, 'days')
  .format('YYYY-MM-DD');
const useStyles = makeStyles(theme => ({
  toolbar: theme.mixins.toolbar,
  drawer: {
    width: DRAWER_WIDTH,
    flexShrink: 0
  },
  drawerPaper: {
    width: DRAWER_WIDTH,
    backgroundColor: theme.palette.primary.main
  },
  listText: {
    fontWeight: 500
  }
}));

Navbar.propTypes = {
  venue: PropTypes.object
};

// @TODO move out all static icon and text stuff to constants
function Navbar({ venue }) {
  const classes = useStyles();
  const theme = useTheme();
  const xsDown = useMediaQuery(theme.breakpoints.down('sm'));
  const [openAnalytics, setOpenAnalytics] = useState(true);
  const [openManage, setOpenManage] = useState(true);
  const [openReservation, setOpenReservation] = useState(false);
  const [openMarketing, setOpenMarketing] = useState(false);
  const [openID, setOpenID] = useState(false);

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

  const transactionsLink = `/transactions?filters[start]=${THIRTY_DAYS_AGO}&filters[end]=${CURRENT_DATE}`; // eslint-disable-line

  if (xsDown) {
    return null;
  }

  const drawer = (
    <Box>
      <Box className={classes.toolbar} />
      <List component="nav">
        <SidebarButton route="/dashboard">
          <Box mr={2} ml={2}>
            <DashboardIcon />
          </Box>
          DASHBOARD
        </SidebarButton>

        <ListItem button onClick={handleAnalyticsClick}>
          <Box display="flex" flex={1} color="white">
            <ListItemText
              classes={{ primary: classes.listText }}
              primary="ANALYTICS"
            />
            {openAnalytics ? <ExpandLess /> : <ExpandMore />}
          </Box>
        </ListItem>

        <Collapse in={openAnalytics} timeout={500} unmountOnExit>
          {getAnalyticsArray(venue && venue.id).map((item, index) => {
            const Icon = item.icon;

            return (
              <SidebarButton key={index} route={item.route}>
                <Box mr={2} ml={2}>
                  <Icon />
                </Box>
                {item.text}
              </SidebarButton>
            );
          })}
          <SidebarButton route={transactionsLink} externalLink={false}>
            <Box mr={2} ml={2}>
              <TransactionIcon />
            </Box>
            Transactions
          </SidebarButton>
        </Collapse>

        <ListItem button onClick={handleManageClick}>
          <Box display="flex" flex={1} color="white">
            <ListItemText
              classes={{ primary: classes.listText }}
              primary="MANAGE"
            />
            {openManage ? <ExpandLess /> : <ExpandMore />}
          </Box>
        </ListItem>
        <Collapse in={openManage} timeout={500} unmountOnExit>
          <List component="div" disablePadding>
            <SidebarButton route="/events">
              <Box mr={2} ml={2}>
                <EventIcon />
              </Box>
              Events & Tickets
            </SidebarButton>

            <SidebarCollapse
              text="Reservations"
              handleClick={handleReservationClick}
              open={openReservation}
              Icon={ReservationIcon}
              items={reservationArray}
            />

            <SidebarButton route={`/guestlist/${CURRENT_DATE}`}>
              <Box mr={2} ml={2}>
                <GuestListIcon />
              </Box>
              Guest List
            </SidebarButton>

            <SidebarCollapse
              text="Marketing"
              handleClick={handleMarketingClick}
              open={openMarketing}
              Icon={MarketingIcon}
              items={marketingArray}
            />

            <SidebarButton route="/guests">
              <Box mr={2} ml={2}>
                <GroupIcon />
              </Box>
              Guest Profiles
            </SidebarButton>

            <SidebarCollapse
              text="ID Scan"
              handleClick={handleIDClick}
              open={openID}
              Icon={IDIcon}
              items={IDScanArray}
            />
          </List>
        </Collapse>
      </List>
    </Box>
  );

  return (
    <Drawer
      className={classes.drawer}
      classes={{
        paper: classes.drawerPaper
      }}
      variant="permanent"
      open
    >
      {drawer}
    </Drawer>
  );
}

const mapStateToProps = state => ({
  venue: AuthSelectors.selectCurrentVenue(state)
});

export default connect(mapStateToProps)(Navbar);

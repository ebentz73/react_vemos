import moment from 'moment';
import WatchLaterIcon from '@material-ui/icons/WatchLater';
import VenueIcon from '@material-ui/icons/Business';
import ReservationIcon from '@material-ui/icons/ListAlt';
import GroupIcon from '@material-ui/icons/Group';
import EventIcon from '@material-ui/icons/Event';
import MarketingIcon from '@material-ui/icons/RssFeed';
import TileIcon from '@material-ui/icons/ViewModule';
import ListIcon from '@material-ui/icons/ViewList';
import MapIcon from '@material-ui/icons/Place';
import ConnectIcon from '@material-ui/icons/SwapHorizontalCircle';
import ShareIcon from '@material-ui/icons/Share';
import DayIcon from '@material-ui/icons/AccessTime';
import BlockIcon from '@material-ui/icons/Block';

const currentDate = moment().format('YYYY-MM-DD');
const thirtyDaysAgo = moment()
  .subtract(29, 'days')
  .format('YYYY-MM-DD');

export function getAnalyticsArray(venueId) {
  return [
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
      route: `/analytics/events/${venueId}`,
      text: 'Events',
      icon: EventIcon
    },
    {
      route: `/analytics/${thirtyDaysAgo}/${currentDate}/referrers`,
      text: 'Marketing',
      icon: MarketingIcon
    }
  ];
}

export const reservationArray = [
  {
    route: '/reservations',
    text: 'Title View',
    icon: TileIcon
  },
  {
    route: '/reservations/list',
    text: 'List View',
    icon: ListIcon
  },
  {
    route: '/table-map',
    text: 'Table Map',
    icon: MapIcon
  }
];

export const marketingArray = [
  {
    route: '/campaigns/list/done',
    text: ' Vemos Connect',
    icon: ConnectIcon
  },
  {
    route: '/referrers',
    text: 'Referrers',
    icon: ShareIcon
  }
];

export const IDScanArray = [
  {
    route: '/id-scan/history/',
    text: 'Day History',
    icon: DayIcon
  },
  {
    route: '/id-scan/bans',
    text: 'Ban List',
    icon: BlockIcon
  }
];

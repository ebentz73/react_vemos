import ReportIcon from '@material-ui/icons/Report';
import DataIcon from '@material-ui/icons/Storage';
import POSIcon from '@material-ui/icons/FiberManualRecord';
import IDIcon from '@material-ui/icons/PictureInPicture';
import ConnectIcon from '@material-ui/icons/SwapHorizontalCircle';

export const settingItems = [
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

export const upgradeItems = [
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

export const userItems = [
  {
    route: '/account',
    text: 'My Account'
  },
  {
    route: '/dashboard',
    text: 'Log Out'
  }
];
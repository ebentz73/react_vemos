import React from 'react';
import POSIcon from '@material-ui/icons/MonetizationOn';
import IDIcon from '@material-ui/icons/CreditCard';
import ConnectIcon from '@material-ui/icons/SwapHorizontalCircle';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import SettingsIcon from '@material-ui/icons/Settings';
import UserIcon from '@material-ui/icons/Person';

// @TODO upgrades from upgrade firebase node
export default {
  settings: {
    icon: <SettingsIcon />,
    text: 'Settings',
    items: [
      {
        href: '/settings',
        text: 'Venue'
      },
      {
        href: '/settings/event',
        text: 'Event'
      },
      {
        href: '/users/staff',
        text: 'Users'
      },
      {
        href: '/tables',
        text: 'Tables'
      },
      {
        href: '/pricing/cover',
        text: 'Pricing'
      },
      {
        href: '/emails',
        text: 'Emails'
      },
      {
        href: '/upgrade-center',
        text: 'Upgrade Center'
      }
    ]
  },
  upgrades: {
    icon: <LockOpenIcon />,
    text: 'Upgrades',
    items: [
      {
        href: '/upgrades/id-scan',
        text: 'ID Scan',
        icon: <IDIcon />
      },
      {
        href: '/upgrades/pos-integration',
        text: 'POS Integration',
        icon: <POSIcon />
      },
      {
        href: '/upgrades/vemos-connect',
        text: 'Vemos Connect',
        icon: <ConnectIcon />
      }
    ]
  },
  user: {
    icon: <UserIcon />,
    text: 'User',
    items: [
      {
        href: '/account',
        text: 'My Account'
      },
      {
        href: '/dashboard',
        text: 'Log Out'
      }
    ]
  }
};

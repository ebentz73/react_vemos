import React from 'react';
import DashboardIcon from '@material-ui/icons/Dashboard';
import TopBarButton from '@containers/layout/Header/TopbarButton';

export default function DashboardButton(props) {
  const handleDashboardClick = () => {
    window.location.href = `https://${process.env.WEB_APP_URL}/dashboard`;
  };

  return (
    <TopBarButton
      icon={<DashboardIcon />}
      onClick={handleDashboardClick}
      justifyContent="flex-start"
      {...props}
    >
      Dashboard
    </TopBarButton>
  );
}

import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Typography from '@material-ui/core/Typography';
import TopBarButton from '@containers/layout/Header/TopbarButton';

TopbarMenu.propTypes = {
  text: PropTypes.string,
  icon: PropTypes.object,
  items: PropTypes.array
};

export default function TopbarMenu({ text, icon, items }) {
  const ref = useRef(null);
  const [open, setOpen] = useState(false);

  const handleClick = item => {
    setOpen(false);
    if (item.href) {
      window.open(`https://${process.env.WEB_APP_URL}${item.href}`, '_blank');
    }
  };

  return (
    <>
      <TopBarButton
        ref={ref}
        onClick={() => setOpen(true)}
        icon={icon}
        isOpen={open}
      >
        {text}
      </TopBarButton>
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
        anchorEl={ref.current}
        open={open}
        onClose={() => setOpen(false)}
      >
        {items.map((item, index) => {
          return (
            <MenuItem key={`menu_${index}`} onClick={() => handleClick(item)}>
              {item.icon && <ListItemIcon>{item.icon}</ListItemIcon>}
              <Typography variant="inherit">{item.text}</Typography>
            </MenuItem>
          );
        })}
      </Menu>
    </>
  );
}

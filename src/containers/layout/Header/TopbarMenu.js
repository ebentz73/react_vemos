import React from 'react';
import PropTypes from 'prop-types';
import Menu from '@material-ui/core/Menu';
import Box from '@material-ui/core/Box';
import TopBarButton from '@containers/layout/Header/TopbarButton';
import ExpandMore from '@material-ui/icons/ExpandMore';
import ExpandLess from '@material-ui/icons/ExpandLess';

TopbarMenu.propTypes = {
  text: PropTypes.string,
  anchorEl: PropTypes.object,
  Icon: PropTypes.object,
  handleMenuClick: PropTypes.func,
  handleMenuClose: PropTypes.func,
  menuItems: PropTypes.array
};

export default function TopbarMenu({
  text,
  anchorEl,
  Icon,
  handleMenuClick,
  handleMenuClose,
  menuItems
}) {
  return (
    <>
      <TopBarButton
        aria-controls="upgrades-menu"
        onClick={handleMenuClick}
        height={64}
      >
        <Box mr={1}>
          <Icon />
        </Box>
        {text}
        {anchorEl ? <ExpandLess /> : <ExpandMore />}
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
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        {menuItems.map((item, index) => {
          const Icon = item.icon;

          return (
            <TopBarButton key={index} route={item.route} isMenuItem={true}>
              {Icon && (
                <Box mr={1}>
                  <Icon />
                </Box>
              )}
              {item.text}
            </TopBarButton>
          );
        })}
      </Menu>
    </>
  );
}

import React from 'react';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import TopBarButton from '@containers/layout/Header/TopbarButton';
import ExpandMore from '@material-ui/icons/ExpandMore';
import ExpandLess from '@material-ui/icons/ExpandLess';
import Collapse from '@material-ui/core/Collapse';

TopbarMenu.propTypes = {
  text: PropTypes.string,
  open: PropTypes.bool,
  Icon: PropTypes.object,
  handleCollapse: PropTypes.func,
  menuItems: PropTypes.array
};

export default function TopbarMenu({
  text,
  open,
  Icon,
  handleCollapse,
  menuItems
}) {
  return (
    <>
      <TopBarButton
        aria-controls="upgrades-menu"
        onClick={handleCollapse}
        height={64}
      >
        <Box mr={1}>
          <Icon />
        </Box>
        {text}
        {open ? <ExpandLess /> : <ExpandMore />}
      </TopBarButton>
      <Collapse in={open} timeout={300} unmountOnExit>
        {menuItems.map((item, index) => {
          const Icon = item.icon;

          return (
            <TopBarButton key={index} kroute={item.route} isMenuItem={true}>
              <Box display="flex" ml={1} color="white">
                {Icon && (
                  <Box mr={1}>
                    <Icon />
                  </Box>
                )}
                {item.text}
              </Box>
            </TopBarButton>
          );
        })}
      </Collapse>
    </>
  );
}

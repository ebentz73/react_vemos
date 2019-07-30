import React from 'react';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import ExpandMore from '@material-ui/icons/ExpandMore';
import ExpandLess from '@material-ui/icons/ExpandLess';
import SidebarButton from '@containers/layout/Navbar/SidebarButton';

SidebarCollapse.propTypes = {
  text: PropTypes.string,
  handleClick: PropTypes.func,
  open: PropTypes.bool,
  Icon: PropTypes.object,
  items: PropTypes.array
};

export default function SidebarCollapse({
  text,
  handleClick,
  open,
  Icon,
  items
}) {
  return (
    <>
      <SidebarButton onClick={handleClick} hasSubButtons={true}>
        <Box mr={2} ml={2}>
          <Icon />
        </Box>
        {text}
        {open ? <ExpandLess /> : <ExpandMore />}
      </SidebarButton>
      <Collapse in={open} timeout={300} unmountOnExit>
        {items.map((item, index) => {
          const Icon = item.icon;

          return (
            <SidebarButton key={index} route={item.route} isSubButton={true}>
              <Box mr={2} ml={2}>
                <Icon />
              </Box>
              {item.text}
            </SidebarButton>
          );
        })}
      </Collapse>
    </>
  );
}

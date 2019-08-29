import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Collapse from '@material-ui/core/Collapse';
import TopBarButton from './TopbarButton';

TopbarCollapse.propTypes = {
  text: PropTypes.string,
  icon: PropTypes.object,
  items: PropTypes.array,
  onCollapse: PropTypes.func
};

export default function TopbarCollapse({ text, icon, items, onCollapse }) {
  const [open, setOpen] = useState(false);

  const handleClick = item => {
    setOpen(false);
    onCollapse();
    if (item.href) {
      window.location.href = `https://${process.env.WEB_APP_URL}${item.href}`;
    }
  };

  return (
    <>
      <TopBarButton
        onClick={() => setOpen(!open)}
        icon={icon}
        isOpen={open}
        fullWidth
        justifyContent="flex-start"
      >
        {text}
      </TopBarButton>
      <Collapse in={open} timeout={300} unmountOnExit>
        {items.map((item, index) => {
          return (
            <TopBarButton
              key={index}
              fullWidth
              onClick={() => handleClick(item)}
              icon={item.icon}
              justifyContent="flex-start"
              pl={3}
            >
              {item.text}
            </TopBarButton>
          );
        })}
      </Collapse>
    </>
  );
}

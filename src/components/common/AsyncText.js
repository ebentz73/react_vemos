import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Skeleton from '@material-ui/lab/Skeleton';
import { AuthSelectors } from '@redux/AuthRedux';
import logger from '@utils/logger';

AsyncText.propTypes = {
  id: PropTypes.string,
  loadData: PropTypes.func.isRequired,
  empty: PropTypes.node,
  venueId: PropTypes.string,
  transform: PropTypes.func.isRequired
};

AsyncText.defaultProps = {
  transform: data => (typeof data === 'string' ? data : null),
  empty: null
};

function AsyncText({ id, loadData, venueId, empty, transform }) {
  const [value, setValue] = useState(null);

  useEffect(() => {
    if (id) {
      loadData(venueId, id)
        .then(data => {
          if (data) {
            setValue(data);
          }
        })
        .catch(e => {
          logger.error(e);
        });
    } else {
      setValue(null);
    }
  }, [id]);

  if (id && !value) {
    return <Skeleton />;
  }

  if (!value) {
    return empty;
  }

  return transform(value, id);
}

const mapStatesToProps = state => ({
  venueId: AuthSelectors.selectVenueId(state)
});

export default connect(mapStatesToProps)(AsyncText);

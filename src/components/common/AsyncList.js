import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Skeleton from '@material-ui/lab/Skeleton';
import { AuthSelectors } from '@redux/AuthRedux';
import logger from '@utils/logger';

AsyncList.propTypes = {
  ids: PropTypes.array,
  loadData: PropTypes.func.isRequired,
  empty: PropTypes.node,
  venueId: PropTypes.string,
  transform: PropTypes.func.isRequired
};

AsyncList.defaultProps = {
  transform: data => (typeof data === 'string' ? data : null),
  empty: null
};

function AsyncList({ ids, venueId, loadData, empty, transform }) {
  const [value, setValue] = useState(null);

  const loadValue = id => {
    if (!id) {
      return Promise.resolve(null);
    }

    return loadData(venueId, id).catch(e => {
      logger.error(e);
      return null;
    });
  };

  useEffect(() => {
    setValue([]);
    if (ids && ids.length) {
      Promise.all(ids.map(id => loadValue(id)))
        .then(data => data.filter(d => d))
        .then(data => setValue(data));
    }
  }, [ids]);

  if (ids && ids.length && !value) {
    return <Skeleton />;
  }

  if (!value || !value.length) {
    return empty;
  }

  return transform(value);
}

const mapStatesToProps = state => ({
  venueId: AuthSelectors.selectVenueId(state)
});

export default connect(mapStatesToProps)(AsyncList);

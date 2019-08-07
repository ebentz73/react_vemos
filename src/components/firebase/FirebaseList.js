import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { AuthSelectors } from '@redux/AuthRedux';
import { getFirebaseValue } from '@utils/firebase';
import logger from '@utils/logger';

// import Skeleton from '@material-ui/lab/Skeleton';

FirebaseList.propTypes = {
  ids: PropTypes.array,
  type: PropTypes.oneOf(['fs', 'rtdb']), // firestore or rtdb
  getPath: PropTypes.func.isRequired,
  empty: PropTypes.node,
  venueId: PropTypes.string,
  transform: PropTypes.func.isRequired
};

FirebaseList.defaultProps = {
  type: 'rtdb',
  transform: data => (typeof data === 'string' ? data : null),
  getPath: () => null,
  empty: null
};

function FirebaseList({ ids, getPath, type, venueId, empty, transform }) {
  const [value, setValue] = useState([]);

  const loadValue = id => {
    if (!id) {
      return Promise.resolve(null);
    }

    return getFirebaseValue(getPath(venueId, id), type).catch(e => {
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

  // if (ids && ids.length && (!value || !value.length)) {
  //   return <Skeleton />;
  // }

  if (!value || !value.length) {
    return empty;
  }

  return transform(value);
}

const mapStatesToProps = state => ({
  venueId: AuthSelectors.selectVenueId(state)
});

export default connect(mapStatesToProps)(FirebaseList);

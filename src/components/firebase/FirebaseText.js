import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { AuthSelectors } from '@redux/AuthRedux';
import { getFirebaseValue } from '@utils/firebase';
import logger from '@utils/logger';

// import Skeleton from '@material-ui/lab/Skeleton';

FirebaseText.propTypes = {
  id: PropTypes.string,
  type: PropTypes.oneOf(['fs', 'rtdb']), // firestore or rtdb
  getPath: PropTypes.func.isRequired,
  empty: PropTypes.node,
  venueId: PropTypes.string,
  transform: PropTypes.func.isRequired
};

FirebaseText.defaultProps = {
  type: 'rtdb',
  transform: data => (typeof data === 'string' ? data : null),
  getPath: () => null,
  empty: null
};

function FirebaseText({ id, type, getPath, venueId, empty, transform }) {
  const [value, setValue] = useState(null);

  useEffect(() => {
    const path = getPath(venueId, id) || id;

    if (id) {
      getFirebaseValue(path, type)
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

  // if (id && !value) {
  //   return <Skeleton />;
  // }

  if (!value) {
    return empty;
  }

  return transform(value);
}

const mapStatesToProps = state => ({
  venueId: AuthSelectors.selectVenueId(state)
});

export default connect(mapStatesToProps)(FirebaseText);

import React from 'react';
import PropTypes from 'prop-types';
import { AsyncList } from '@components/common';
import { getFirebaseValue } from '@utils/firebase';

FirebaseList.propTypes = {
  type: PropTypes.oneOf(['fs', 'rtdb']), // firestore or rtdb
  getPath: PropTypes.func.isRequired
};

FirebaseList.defaultProps = {
  type: 'rtdb',
  getPath: () => null
};

function FirebaseList({ getPath, type, ...rest }) {
  const loadData = (venueId, id) => {
    if (!id) {
      return Promise.resolve(null);
    }

    return getFirebaseValue(getPath(venueId, id), type);
  };

  return <AsyncList loadData={loadData} {...rest} />;
}

export default FirebaseList;

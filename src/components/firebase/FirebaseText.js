import React from 'react';
import PropTypes from 'prop-types';
import { AsyncText } from '@components/common';
import { getFirebaseValue } from '@utils/firebase';

FirebaseText.propTypes = {
  type: PropTypes.oneOf(['fs', 'rtdb']), // firestore or rtdb
  getPath: PropTypes.func.isRequired
};

FirebaseText.defaultProps = {
  type: 'rtdb',
  getPath: () => null
};

function FirebaseText({ getPath, type, ...rest }) {
  const loadData = (venueId, id) => {
    if (!id) {
      return Promise.resolve(null);
    }

    return getFirebaseValue(getPath(venueId, id), type);
  };

  return <AsyncText loadData={loadData} {...rest} />;
}

export default FirebaseText;

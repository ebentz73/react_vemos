import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { AuthSelectors } from '@redux/AuthRedux';
import { AsyncOptionSelect } from '@components/common';
import { getFirebaseRef } from '@utils/firebase';

FirebaseSelect.propTypes = {
  label: PropTypes.string,
  venueId: PropTypes.string,
  value: PropTypes.any,
  onChange: PropTypes.func,
  getPath: PropTypes.func.isRequired,
  TextFieldProps: PropTypes.object
};

function FirebaseSelect({
  label,
  onChange,
  value,
  getPath,
  TextFieldProps,
  venueId,
  ...rest
}) {
  const loadOptions = () => {
    return getFirebaseRef()
      .child(getPath(venueId))
      .once('value')
      .then(snap => snap.val())
      .then(val => val || {})
      .then(val =>
        Object.keys(val).map(k => ({
          ...val[k],
          _id: k
        }))
      );
  };

  return (
    <AsyncOptionSelect
      loadOptions={loadOptions}
      onChange={onChange}
      value={value}
      getOptionValue={item => item._id}
      TextFieldProps={{
        label,
        ...TextFieldProps
      }}
      {...rest}
    />
  );
}

const mapStatesToProps = state => ({
  venueId: AuthSelectors.selectVenueId(state)
});

export default connect(mapStatesToProps)(FirebaseSelect);

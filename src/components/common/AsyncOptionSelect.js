import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { AuthSelectors } from '@redux/AuthRedux';
import { Select } from '@components/common';

AsyncOptionSelect.propTypes = {
  label: PropTypes.string,
  venueId: PropTypes.string,
  value: PropTypes.any,
  onChange: PropTypes.func,
  loadOptions: PropTypes.func,
  TextFieldProps: PropTypes.object
};

function AsyncOptionSelect({
  label,
  onChange,
  value,
  TextFieldProps,
  loadOptions,
  venueId,
  ...rest
}) {
  const [options, setOptions] = useState([]);
  const loadData = () => {
    return loadOptions(venueId).then(items => setOptions(items));
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <Select
      options={options}
      onChange={onChange}
      value={value || null}
      getOptionValue={item => item._id}
      TextFieldProps={{
        label,
        variant: 'standard',
        ...TextFieldProps
      }}
      {...rest}
    />
  );
}

const mapStatesToProps = state => ({
  venueId: AuthSelectors.selectVenueId(state)
});

export default connect(mapStatesToProps)(AsyncOptionSelect);

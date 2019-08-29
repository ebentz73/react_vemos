import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { AuthSelectors } from '@redux/AuthRedux';
import { AsyncSelect } from '@components/common';
import { searchGuests } from '@api/FlashlightApi';

GuestAsyncSelect.propTypes = {
  label: PropTypes.string,
  venueId: PropTypes.string,
  value: PropTypes.any,
  onChange: PropTypes.func,
  TextFieldProps: PropTypes.object
};

function GuestAsyncSelect({
  label,
  onChange,
  value,
  TextFieldProps,
  venueId,
  ...rest
}) {
  const loadOptions = query => {
    return searchGuests(venueId, query).then(result => {
      console.log(result);
      return result.hits;
    });
  };
  return (
    <AsyncSelect
      loadOptions={loadOptions}
      onChange={v => onChange(v)}
      value={value || null}
      getOptionLabel={guest =>
        [`${guest.firstName} ${guest.lastName}`, guest.email, guest.phone]
          .filter(t => t)
          .join(' | ')
      }
      getOptionValue={guest => guest._id}
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

export default connect(mapStatesToProps)(GuestAsyncSelect);

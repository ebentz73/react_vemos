import moment from 'moment';
import { HAS_RESERVATION, REFUNDED } from '@containers/transactions/constants';

function neNull(value, yesValue) {
  return value[0] === yesValue ? { $ne: null } : null;
}

function ne0(value, yesValue) {
  return value[0] === yesValue ? { $ne: 0 } : 0;
}

function numberRange(value) {
  if (!isNaN(value[0]) && !isNaN(value[1])) {
    return {
      $gte: value[0] * 100,
      $lte: value[1] * 100
    };
  } else if (!isNaN(value[0])) {
    return {
      $gte: value[0] * 100
    };
  } else if (!isNaN(value[1])) {
    return {
      $lte: value[1] * 100
    };
  }
}

function dateRange(value) {
  if (value[0] && value[1]) {
    return {
      $gte:
        moment(value[0])
          .startOf('day')
          .unix() * 1000,
      $lte:
        moment(value[1])
          .endOf('day')
          .unix() * 1000
    };
  } else if (value[0]) {
    return {
      $gte:
        moment(value[0])
          .startOf('day')
          .unix() * 1000
    };
  } else if (value[1]) {
    return {
      $lte:
        moment(value[1])
          .endOf('day')
          .unix() * 1000
    };
  }
}

function transformFilters(filters = {}) {
  const result = {};

  Object.keys(filters).forEach(filterName => {
    const value = filters[filterName];

    // skip empty value
    if (!value || !value.length) {
      return;
    }

    switch (filterName) {
      case 'timestamp':
        if (value[0]) {
          result[filterName] = dateRange(value);
        }
        break;
      case 'amount':
      case 'amount_voided':
      case 'amount_comped':
        result[filterName] = numberRange(value);
        break;
      case 'amount_refunded':
        result[filterName] = ne0(value, REFUNDED.YES);
        break;
      case 'transaction_type':
      case 'payment_method':
        result[filterName] = {
          $in: value.map(v => v.value)
        };
        break;
      case 'revenue_center_id':
      case 'order_type_id':
        result[filterName] = {
          $in: value.map(v => v._id)
        };
        break;
      case 'areas':
        result.area_id = {
          $in: value.map(v => v._id)
        };
        break;
      case 'tables':
        result.table_id = {
          $in: value.map(v => v._id)
        };
        break;
      case 'servers': {
        const $in = [value[0]._id];
        if (value[0].employeeID) {
          $in.push(value[0].employeeID);
        }
        result.server_id = {
          $in
        };
        break;
      }
      case 'guest_id':
      case 'referrer_id':
      case 'promocode_id':
        result[filterName] = value[0]._id;
        break;
      case 'reservation_id':
        result[filterName] = neNull(value, HAS_RESERVATION.YES);
        break;
      default:
    }
  });

  return result;
}

export default transformFilters;

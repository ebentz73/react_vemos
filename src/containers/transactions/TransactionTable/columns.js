import React from 'react';
import { FirebaseText, FirebaseList } from '@components/firebase';
import moment from 'moment';
import PAYMENT_METHODS from '@constants/payment-methods';
import TRANSACTION_TYPES from '@constants/transaction-types';
import { getPrice } from '@utils/currency';

const columns = [
  {
    name: 'timestamp',
    label: 'Date',
    options: {
      filter: true,
      customBodyRender: value => moment(value).format('MM/DD/YYYY HH:mm A')
    }
  },
  {
    name: 'transaction_type',
    label: 'Type',
    options: {
      filter: true,
      customBodyRender: value => TRANSACTION_TYPES[value]
    }
  },
  {
    name: 'guest_id',
    label: 'Guest',
    options: {
      sort: false,
      filter: true,
      customBodyRender: value => (
        <FirebaseText
          id={value}
          type="fs"
          getPath={(venueId, id) => `venues/${venueId}/guests/${id}`}
          transform={guest => `${guest.firstName} ${guest.lastName}`}
        />
      )
    }
  },
  {
    name: 'payment_method',
    label: 'Payment method',
    options: {
      filter: true,
      customBodyRender: value => PAYMENT_METHODS[value]
    }
  },
  {
    name: 'amount',
    label: 'Amount',
    options: {
      filter: true,
      customBodyRender: value => getPrice(value)
    }
  },
  {
    name: 'amount_refunded',
    label: 'Refunded',
    options: {
      filter: true,
      customBodyRender: value => (value ? 'Refunded' : '')
    }
  },
  {
    name: 'referrer_id',
    label: 'Referrer',
    options: {
      display: false,
      sort: false,
      filter: true,
      customBodyRender: value => (
        <FirebaseText
          id={value}
          getPath={(venueId, id) => `venues/${venueId}/referrers/${id}/name`}
        />
      )
    }
  },
  {
    name: 'promocode_id',
    label: 'Promo Code',
    options: {
      display: false,
      sort: false,
      filter: true,
      customBodyRender: value => (
        <FirebaseText
          id={value}
          getPath={(venueId, id) => `venues/${venueId}/promotions/${id}/name`}
        />
      )
    }
  },
  {
    name: 'servers',
    label: 'Servers',
    options: {
      display: false,
      sort: false,
      filter: true,
      customBodyRender: value => (
        <FirebaseList
          ids={(value || []).map(s => s.server_id)}
          getPath={(venueId, id) => `venues/${venueId}/pos/employees/${id}`}
          transform={servers =>
            servers.map(s => `${s.first_name} ${s.last_name}`).join(', ')
          }
        />
      )
    }
  },
  {
    name: 'revenue_center_id',
    label: 'Revenue Center',
    options: {
      display: false,
      sort: false,
      filter: true,
      customBodyRender: value => (
        <FirebaseText
          id={value}
          getPath={(venueId, id) =>
            `venues/${venueId}/pos/revenue_centers/${id}/name`
          }
        />
      )
    }
  },
  {
    name: 'order_type_id',
    label: 'Order Type',
    options: {
      display: false,
      sort: false,
      filter: true,
      customBodyRender: value => (
        <FirebaseText
          id={value}
          getPath={(venueId, id) =>
            `venues/${venueId}/pos/order_types/${id}/name`
          }
        />
      )
    }
  },
  {
    name: 'amount_voided',
    label: 'Voided',
    options: {
      display: false,
      filter: true,
      customBodyRender: value => (value ? getPrice(value) : null)
    }
  },
  {
    name: 'amount_comped',
    label: 'Comps',
    options: {
      display: false,
      filter: true,
      customBodyRender: value => (value ? getPrice(value) : null)
    }
  },
  {
    name: 'tables',
    label: 'Tables',
    options: {
      display: false,
      sort: false,
      filter: true,
      customBodyRender: value => (
        <FirebaseList
          ids={(value || []).map(s => s.table_id)}
          getPath={(venueId, id) => `venues/${venueId}/tables/${id}/number`}
          transform={tableNumbers => tableNumbers.join(', ')}
        />
      )
    }
  },
  {
    name: 'areas',
    label: 'Areas',
    options: {
      display: false,
      sort: false,
      filter: true,
      customBodyRender: value => (
        <FirebaseList
          ids={(value || []).map(s => s.area_id)}
          getPath={(venueId, id) => `venues/${venueId}/areas/${id}/name`}
          transform={areas => areas.join(', ')}
        />
      )
    }
  }
];

export default columns;

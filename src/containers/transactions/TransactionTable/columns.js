import React from 'react';
import moment from 'moment';
import Link from '@material-ui/core/Link';
import {
  FirebaseText,
  FirebaseList,
  GuestAsyncSelect
} from '@components/firebase';
import { AsyncList, AsyncText, AsyncOptionSelect } from '@components/common';
import { getPrice } from '@utils/currency';
import {
  numberRange,
  firebaseSingle,
  firebaseMulti,
  textMulti
} from '@components/filters/mui-table';
import { DateRangeFilter } from '@components/filters';
import * as ServerService from '@services/ServerService';
import * as PromoService from '@services/PromoService';
import URL from '@utils/url';
import {
  PAYMENT_METHODS,
  TRANSACTION_TYPES,
  HAS_RESERVATION,
  REFUNDED
} from '@containers/transactions/constants';

const columns = [
  {
    name: 'timestamp',
    label: 'Date',
    options: {
      filter: true,
      customBodyRender: value => moment(value).format('MM/DD/YYYY hh:mm A'),
      filterType: 'custom',
      customFilterListRender: v => {
        if (v[0] && v[1]) {
          return `Start: ${moment(v[0]).format('MM/DD/YYYY')}, End: ${moment(
            v[1]
          ).format('MM/DD/YYYY')}`;
        } else if (v[0]) {
          return `Start: ${moment(v[0]).format('MM/DD/YYYY')}`;
        } else if (v[1]) {
          return `End: ${moment(v[1]).format('MM/DD/YYYY')}`;
        }

        return null;
      },
      filterOptions: {
        display: (filterList, onChange, index, column) => {
          return (
            <DateRangeFilter
              label="Date"
              value={filterList[index]}
              onChange={v => onChange(v, index, column)}
            />
          );
        }
      }
    }
  },
  {
    name: 'transaction_type',
    label: 'Type',
    options: {
      filter: true,
      customBodyRender: value => TRANSACTION_TYPES[value],
      ...textMulti('Transction Type', TRANSACTION_TYPES)
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
          transform={(guest, id) => (
            <Link
              href={URL.guest.detail(id)}
              onClick={e => e.stopPropagation()}
            >{`${guest.firstName} ${guest.lastName}`}</Link>
          )}
        />
      ),
      filterType: 'custom',
      customFilterListRender: v =>
        v[0] ? `Guest: ${v[0].firstName} ${v[0].lastName}` : null,
      filterOptions: {
        display: (filterList, onChange, index, column) => (
          <GuestAsyncSelect
            label="Guest"
            placeholder="Search Guests..."
            value={filterList[index][0]}
            onChange={v => onChange(v ? [v] : [], index, column)}
          />
        )
      }
    }
  },
  {
    name: 'payment_method',
    label: 'Payment method',
    options: {
      filter: true,
      customBodyRender: value => PAYMENT_METHODS[value],
      ...textMulti('Payment Method', PAYMENT_METHODS)
    }
  },
  {
    name: 'amount',
    label: 'Amount',
    options: {
      filter: true,
      customBodyRender: value => getPrice(value),
      ...numberRange('Amount')
    }
  },
  {
    name: 'amount_refunded',
    label: 'Refunded',
    options: {
      filter: true,
      customBodyRender: value => (value ? 'Refunded' : ''),
      filterOptions: {
        names: [REFUNDED.YES, REFUNDED.NO]
      }
    }
  },
  {
    name: 'referrer_id',
    label: 'Referrer',
    options: {
      sort: false,
      filter: true,
      customBodyRender: value => (
        <FirebaseText
          id={value}
          getPath={(venueId, id) => `venues/${venueId}/referrers/${id}/name`}
        />
      ),
      ...firebaseSingle(
        'Referrer',
        venueId => `venues/${venueId}/referrers`,
        referrer => referrer.name
      )
    }
  },
  {
    name: 'promocode_id',
    label: 'Promo Code',
    options: {
      sort: false,
      filter: true,
      customBodyRender: value => (
        <AsyncText
          id={value}
          loadData={(venueId, id) => PromoService.getPromo(venueId, id)}
          transform={promo => promo.name}
        />
      ),
      filterType: 'custom',
      customFilterListRender: v => (v[0] ? `Promo Code: ${v[0].name}` : null),
      filterOptions: {
        display: (filterList, onChange, index, column) => (
          <AsyncOptionSelect
            label="Promo Code"
            loadOptions={venueId => PromoService.getVenuePromos(venueId)}
            getOptionLabel={p => p.name}
            onChange={v => onChange(v ? [v] : [], index, column)}
            value={filterList[index][0]}
          />
        )
      }
    }
  },
  {
    name: 'servers',
    label: 'Servers',
    options: {
      sort: false,
      filter: true,
      customBodyRender: value => (
        <AsyncList
          ids={(value || []).map(s => s.server_id)}
          loadData={(venueId, id) => ServerService.getServer(venueId, id)}
          transform={servers =>
            servers.map(s => ServerService.getName(s)).join(', ')
          }
        />
      ),
      filterType: 'custom',
      customFilterListRender: v =>
        v[0] ? `Server: ${ServerService.getName(v[0])}` : null,
      filterOptions: {
        display: (filterList, onChange, index, column) => (
          <AsyncOptionSelect
            label="Server"
            loadOptions={venueId => ServerService.getVenueServers(venueId)}
            getOptionLabel={s => ServerService.getName(s)}
            onChange={v => onChange(v ? [v] : [], index, column)}
            value={filterList[index][0]}
          />
        )
      }
    }
  },
  {
    name: 'revenue_center_id',
    label: 'Revenue Center',
    options: {
      sort: false,
      filter: true,
      customBodyRender: value => (
        <FirebaseText
          id={value}
          getPath={(venueId, id) =>
            `venues/${venueId}/pos/revenue_centers/${id}/name`
          }
        />
      ),
      ...firebaseMulti(
        'Revenue Center',
        venueId => `venues/${venueId}/pos/revenue_centers`,
        c => c.name
      )
    }
  },
  {
    name: 'order_type_id',
    label: 'Order Type',
    options: {
      sort: false,
      filter: true,
      customBodyRender: value => (
        <FirebaseText
          id={value}
          getPath={(venueId, id) =>
            `venues/${venueId}/pos/order_types/${id}/name`
          }
        />
      ),
      ...firebaseMulti(
        'Order Type',
        venueId => `venues/${venueId}/pos/order_types`,
        c => c.name
      )
    }
  },
  {
    name: 'amount_voided',
    label: 'Voided',
    options: {
      filter: true,
      customBodyRender: value => (value ? getPrice(value) : null),
      ...numberRange('Voids')
    }
  },
  {
    name: 'amount_comped',
    label: 'Comps',
    options: {
      filter: true,
      customBodyRender: value => (value ? getPrice(value) : null),
      ...numberRange('Comps')
    }
  },
  {
    name: 'tables',
    label: 'Tables',
    options: {
      sort: false,
      filter: true,
      customBodyRender: value => (
        <FirebaseList
          ids={(value || []).map(s => s.table_id)}
          getPath={(venueId, id) => `venues/${venueId}/tables/${id}/label`}
          transform={tableLabels => tableLabels.join(', ')}
        />
      ),
      ...firebaseMulti(
        'Tables',
        venueId => `venues/${venueId}/tables`,
        c => c.label
      )
    }
  },
  {
    name: 'areas',
    label: 'Areas',
    options: {
      sort: false,
      filter: true,
      customBodyRender: value => (
        <FirebaseList
          ids={(value || []).map(s => s.area_id)}
          getPath={(venueId, id) => `venues/${venueId}/areas/${id}/name`}
          transform={areas => areas.join(', ')}
        />
      ),
      ...firebaseMulti(
        'Areas',
        venueId => `venues/${venueId}/areas`,
        c => c.name
      )
    }
  },
  {
    name: 'reservation_id',
    label: 'Reservation',
    options: {
      sort: false,
      filter: true,
      customBodyRender: value =>
        value ? (
          <Link
            href={URL.reservation.edit(value)}
            onClick={e => e.stopPropagation()}
          >
            View
          </Link>
        ) : (
          ''
        ),
      filterOptions: {
        names: [HAS_RESERVATION.YES, HAS_RESERVATION.NO]
      }
    }
  }
];

export default columns;

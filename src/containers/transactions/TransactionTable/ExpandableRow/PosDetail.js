import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Typography from '@material-ui/core/Typography';
import { LoadingContainer } from '@components/common';
import { getDate } from '@utils/datetime';
import { getPrice } from '@utils/currency';
import * as PosService from '@services/PosService';

PosDetail.propTypes = {
  transaction: PropTypes.object,
  venueId: PropTypes.string,
  endOfNight: PropTypes.string
};

const OTHER_ITEMS = [
  { path: 'totals.other_charges', label: 'Other Charges' },
  { path: 'totals.service_charges', label: 'Service Charges' },
  { path: 'totals.discounts', label: 'Discount' },
  { path: 'totals.tip', label: 'Tip' },
  { path: 'totals.tax', label: 'Tax' }
];

function PosDetail({ transaction, venueId, endOfNight }) {
  const [items, setItems] = useState([]);
  const [payments, setPayments] = useState([]);
  const [ticket, setTicket] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const loadData = async () => {
    try {
      const date = getDate(transaction.timestamp, endOfNight);
      const ticketId = transaction.transaction_number;
      setLoading(true);

      await Promise.all([
        PosService.getTicket(ticketId, date, venueId).then(result =>
          setTicket(result)
        ),
        PosService.getPayments(ticketId, date, venueId).then(result =>
          setPayments(result)
        ),
        PosService.getMenuItemsForTicket(ticketId, date, venueId).then(result =>
          setItems(result)
        )
      ]);
    } catch (e) {
      setError(e.message || 'There was problem loading data');
    }
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <LoadingContainer loading={loading} error={error}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Item Name</TableCell>
            <TableCell align="right">Price</TableCell>
            <TableCell align="right">Quantity</TableCell>
            <TableCell align="right">Item Total</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {items.map(item => (
            <TableRow key={item._id}>
              <TableCell>{item.menu_item.name}</TableCell>
              <TableCell align="right">
                {getPrice(item.menu_item.price_per_unit)}
              </TableCell>
              <TableCell align="right">{item.quantity}</TableCell>
              <TableCell align="right">{getPrice(item.price)}</TableCell>
            </TableRow>
          ))}
          {OTHER_ITEMS.map(item => {
            const price = get(ticket, item.path);
            if (!price) {
              return null;
            }
            return (
              <TableRow key={item.path}>
                <TableCell colSpan={3}>{item.label}</TableCell>
                <TableCell align="right">
                  {item.label === 'Discount'
                    ? `(${getPrice(price)})`
                    : getPrice(price)}
                </TableCell>
              </TableRow>
            );
          })}
          <TableRow>
            <TableCell colSpan={3}>
              <Typography variant="h6">TOTAL</Typography>
            </TableCell>
            <TableCell align="right">
              <Typography variant="h6">
                {getPrice(get(ticket, 'totals.total'))}
              </Typography>
            </TableCell>
          </TableRow>
          {payments.map(payment => {
            const tenderType = get(payment, 'tenderType.name', '');
            const { amount, last4 } = payment;
            const type = last4 ? `${tenderType} ${last4}` : tenderType;

            return (
              <TableRow key={payment._id}>
                <TableCell colSpan={3}>Amount Paid ({type})</TableCell>
                <TableCell align="right">{getPrice(amount)}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </LoadingContainer>
  );
}

export default PosDetail;

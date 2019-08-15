import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import get from 'lodash/get';
import startCase from 'lodash/startCase';
import { LoadingContainer, DescriptionList } from '@components/common';
import { getDate } from '@utils/datetime';
import { getPrice } from '@utils/currency';
import * as TicketSaleService from '@services/TicketSaleService';
import * as GuestService from '@services/GuestService';
import * as ReferrerService from '@services/ReferrerService';
import * as TransactionService from '@services/TransactionService';

TicketDetail.propTypes = {
  transaction: PropTypes.object,
  venueId: PropTypes.string,
  endOfNight: PropTypes.string
};

function TicketDetail({ transaction, venueId, endOfNight }) {
  const [sale, setSale] = useState(null);
  const [ticket, setTicket] = useState(null);
  const [party, setParty] = useState(null);
  const [guest, setGuest] = useState(null);
  const [referrer, setReferrer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const loadData = async () => {
    try {
      const date = getDate(transaction.timestamp, endOfNight);
      const transactionId = transaction.transaction_number;
      setLoading(true);
      const saleId = await TransactionService.getTicketSaleId(
        venueId,
        `${date}/${transactionId}`
      );
      if (!saleId) {
        throw new Error('Ticket sale not found');
      }

      await Promise.all([
        TicketSaleService.getTicketSale(venueId, saleId).then(result =>
          setSale(result)
        ),
        TicketSaleService.getTicket(venueId, saleId).then(result =>
          setTicket(result)
        ),
        TicketSaleService.getParty(venueId, saleId).then(result =>
          setParty(result)
        ),
        ReferrerService.getReferrer(venueId, transaction.referrer_id).then(
          result => setReferrer(result)
        ),
        GuestService.getGuest(venueId, transaction.guest_id).then(result =>
          setGuest(result)
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

  const items = [
    { label: 'Time', value: moment(transaction.timestamp).format('LLL') },
    { label: 'Ticket Name', value: get(ticket, 'name', '') },
    { label: 'Purchaser', value: GuestService.getName(guest) },
    { label: 'Email', value: get(guest, 'email', '') },
    { label: 'Phone Number', value: get(guest, 'phone', '') },
    { label: 'Number of Guys', value: get(party, 'guys', 0) },
    { label: 'Number of Girls', value: get(party, 'girls', 0) },
    { label: 'Referrer', value: get(referrer, 'name', '') },
    { label: 'Promo Code', value: transaction.promocode_id },
    {
      label: 'Total Paid',
      value: getPrice(get(sale, 'priceData.totalPaid', 0))
    },
    {
      label: 'Ticket Price',
      value: getPrice(get(sale, 'priceData.ticketUnit', 0))
    },
    { label: 'Vemos Fee', value: getPrice(get(sale, 'priceData.vemosFee', 0)) },
    {
      label: 'Venue Kickback',
      value: getPrice(get(sale, 'priceData.venueKickback', 0))
    },
    { label: 'CC Fees', value: getPrice(get(sale, 'priceData.stripeFee', 0)) },
    {
      label: 'Amount Deposited',
      value: getPrice(get(sale, 'priceData.deposit', 0))
    },
    {
      label: 'Refunded',
      value: transaction.amount_refunded > 0 ? 'Yes' : 'No'
    },
    { label: 'Checked-In', value: startCase(get(party, 'status', '')) }
  ];

  return (
    <LoadingContainer loading={loading} error={error}>
      <DescriptionList items={items} />
    </LoadingContainer>
  );
}

export default TicketDetail;

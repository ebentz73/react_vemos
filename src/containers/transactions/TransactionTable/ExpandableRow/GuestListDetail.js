import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import get from 'lodash/get';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { LoadingContainer, DescriptionList } from '@components/common';
import { getDate } from '@utils/datetime';
import { getPrice } from '@utils/currency';
import * as CoverService from '@services/CoverService';
import * as PartyService from '@services/PartyService';
import * as GuestService from '@services/GuestService';
import * as TransactionService from '@services/TransactionService';

GuestListDetail.propTypes = {
  transaction: PropTypes.object,
  venueId: PropTypes.string,
  endOfNight: PropTypes.string
};

function GuestListDetail({ transaction, venueId, endOfNight }) {
  const [cover, setCover] = useState(null);
  const [party, setParty] = useState(null);
  const [guest, setGuest] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const loadData = async () => {
    try {
      const date = getDate(transaction.timestamp, endOfNight);
      const transactionId = transaction.transaction_number;
      setLoading(true);
      const coverId = await TransactionService.getCoverId(
        venueId,
        `${date}/${transactionId}`
      );
      if (!coverId) {
        throw new Error('Cover not found');
      }

      const partyId = await CoverService.getPartyId(venueId, coverId);
      if (!partyId) {
        throw new Error('Party not found');
      }

      await Promise.all([
        CoverService.getCover(venueId, coverId).then(result =>
          setCover(result)
        ),
        PartyService.getParty(venueId, partyId).then(result =>
          setParty(result)
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

  const coverItems = [
    { label: 'Time', value: moment(transaction.timestamp).format('LLL') },
    { label: 'Number of Guys', value: get(cover, 'group.guys', 0) },
    { label: 'Number of Girls', value: get(cover, 'group.girls', 0) },
    { label: 'Price Guys', value: getPrice(get(cover, 'price.guys', 0)) },
    { label: 'Price Girls', value: getPrice(get(cover, 'price.girls', 0)) }
  ];

  const partyItems = [
    { label: 'Guest', value: GuestService.getName(guest) },
    { label: 'Number of Guys', value: get(party, 'guys', 0) },
    { label: 'Number of Girls', value: get(party, 'girls', 0) },
    { label: 'Paid Guys', value: get(party, 'paidGuys', 0) },
    { label: 'Paid Girls', value: get(party, 'paidGirls', 0) }
  ];

  return (
    <LoadingContainer loading={loading} error={error}>
      <Box mb={3}>
        <Typography variant="h6" gutterBottom>
          Cover Details
        </Typography>
        <DescriptionList items={coverItems} />
      </Box>
      <Box>
        <Typography variant="h6" gutterBottom>
          Party Details
        </Typography>
        <DescriptionList items={partyItems} />
      </Box>
    </LoadingContainer>
  );
}

export default GuestListDetail;

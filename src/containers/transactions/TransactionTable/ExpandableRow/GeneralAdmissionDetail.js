import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import get from 'lodash/get';
import { LoadingContainer, DescriptionList } from '@components/common';
import { getDate } from '@utils/datetime';
import { getPrice } from '@utils/currency';
import * as PromoService from '@services/PromoService';
import * as AdmissionService from '@services/AdmissionService';
import * as TransactionService from '@services/TransactionService';

GeneralAdmissionDetail.propTypes = {
  transaction: PropTypes.object,
  venueId: PropTypes.string,
  endOfNight: PropTypes.string
};

function GeneralAdmissionDetail({ transaction, venueId, endOfNight }) {
  const [admission, setAdmission] = useState(null);
  const [promotion, setPromotion] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const loadData = async () => {
    try {
      const date = getDate(transaction.timestamp, endOfNight);
      const transactionId = transaction.transaction_number;
      setLoading(true);
      const admissionId = await TransactionService.getAdmissionId(
        venueId,
        `${date}/${transactionId}`
      );
      if (!admissionId) {
        throw new Error('Admission not found');
      }

      const loadedAdmission = await AdmissionService.getAdmission(
        venueId,
        admissionId
      );
      setAdmission(loadedAdmission);

      if (transaction.promotion_id) {
        PromoService.getAdmissionPromotion(
          venueId,
          transaction.promotion_id
        ).then(loadedPromotion => setPromotion(loadedPromotion));
      }
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
    { label: 'Number of Guys', value: get(admission, 'group.guys', 0) },
    { label: 'Number of Girls', value: get(admission, 'group.girls', 0) },
    { label: 'Price Guys', value: getPrice(get(admission, 'price.guys', 0)) },
    { label: 'Price Girls', value: getPrice(get(admission, 'price.girls', 0)) },
    { label: 'Comped', value: transaction.amount_comped > 0 ? 'Yes' : 'No' },
    { label: 'Promotion', value: get(promotion, 'name', '-') }
  ];

  return (
    <LoadingContainer loading={loading} error={error}>
      <DescriptionList items={items} />
    </LoadingContainer>
  );
}

export default GeneralAdmissionDetail;

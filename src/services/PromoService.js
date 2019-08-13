import each from 'lodash/each';
import { getFirebaseValue } from '@utils/firebase';

// NOTE: has both promo and promotion
export function getPromo(venue, id) {
  return Promise.all([
    getFirebaseValue(`venues/${venue}/promos/${id}`),
    getFirebaseValue(`venues/${venue}/promotions/${id}`)
  ]).then(result => {
    const promo = result[0];
    const promotion = result[1];

    if (promo) {
      return {
        _id: id,
        ...promo,
        name: id
      };
    }

    if (promotion) {
      return {
        _id: id,
        ...promotion
      };
    }

    return null;
  });
}

export function getVenuePromos(venue) {
  return Promise.all([
    getFirebaseValue(`venues/${venue}/promos`),
    getFirebaseValue(`venues/${venue}/promotions`)
  ]).then(result => {
    const items = [];
    const promos = result[0];
    const promotions = result[1];

    each(promos, (val, id) => {
      items.push({
        _id: id,
        name: id,
        ...val
      });
    });

    each(promotions, (val, id) => {
      items.push({
        _id: id,
        ...val
      });
    });

    return items;
  });
}

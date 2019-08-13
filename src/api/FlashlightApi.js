import { getFirebaseRef } from '@utils/firebase';
import logger from '@utils/logger';

export function searchRequest(data, indexType = 'guest') {
  return new Promise((resolve, reject) => {
    const ref = getFirebaseRef();
    const req = ref.child('search/request').push({
      index: 'firebase',
      type: indexType,
      body: JSON.stringify(data)
    });
    const resp = ref.child('search/response').child(req.key);
    logger.debug('Search Request: ', data);

    resp.on('value', snap => {
      const value = snap.val();
      if (value !== null) {
        resp.off();
        if (!value.error) {
          resolve(value);
        } else {
          reject(value.error);
        }

        logger.debug('Search Response: ', value);
      }
    });
  });
}

export function searchGuests(venue, query, options = { from: 0, size: 5 }) {
  const searchCondition = [
    {
      match: { venue: venue }
    },
    {
      multi_match: {
        query,
        type: 'phrase_prefix',
        fields: ['firstName', 'lastName', 'phone', 'email']
      }
    }
  ];

  return searchRequest(
    {
      _source: { includes: ['firstName', 'lastName', 'phone', 'email'] },
      query: { bool: { filter: searchCondition } },
      ...options
    },
    'guest'
  )
    .then(data => {
      const result = {
        total: data.hits.total,
        hits: (data.hits.hits || []).map(function(hit) {
          return Object.assign({ _id: hit._id }, hit._source); // eslint-disable-line
        })
      };

      return result || { total: 0, hits: [] };
    })
    .catch(err => {
      logger.error(err);
      // silent error handling
      return { total: 0, hits: [] };
    });
}

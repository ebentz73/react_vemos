import { createBrowserHistory } from 'history';
import qs from 'qs';
import isEqual from 'lodash/isEqual';
import mergeWith from 'lodash/mergeWith';
import isObject from 'lodash/isObject';
import isArray from 'lodash/isArray';

const browserHistory = createBrowserHistory();

export const getDomain = () => {
  const domainParts = window.location.host.split('.');
  const domain = domainParts.slice(domainParts.length - 2).join('.');

  return domain.split(':')[0];
};

export function getPathname() {
  return browserHistory.location.pathname;
}

function getNewQuery(query) {
  const { location } = browserHistory;
  const { pathname, search } = location;
  const prevQuery = qs.parse(search, { ignoreQueryPrefix: true }) || {};
  const hasMutation = !isEqual(prevQuery, query);

  if (!hasMutation) {
    return { pathname, newQuery: null };
  }

  return {
    pathname,
    newQuery: mergeWith(prevQuery, query, (objValue, srcValue) => {
      if (isArray(objValue) || isObject(objValue)) {
        return srcValue;
      }
    })
  };
}

// update URL with new search params silently
export function updateQuery(query) {
  const { pathname, newQuery } = getNewQuery(query);
  if (newQuery === null) {
    return;
  }
  browserHistory.replace({
    pathname,
    search: qs.stringify(newQuery, { encodeValuesOnly: true, skipNulls: true })
  });
}

// get search params as object
export function getQuery() {
  const location = browserHistory.location;
  return qs.parse(location.search, { ignoreQueryPrefix: true });
}

// go to a path with query string
export function goToPage(pathname, params) {
  browserHistory.push({
    pathname,
    search: qs.stringify(params, { encodeValuesOnly: true, skipNulls: true })
  });
}

// build full url including query string
export function buildFullUrl(pathname, params) {
  const strParams = qs.stringify(params, {
    encodeValuesOnly: true,
    skipNulls: true
  });
  return `${pathname}?${strParams}`;
}

export default browserHistory;

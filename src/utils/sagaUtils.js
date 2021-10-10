import { stringifyUrl } from 'query-string';

const path = require('path-params');
const { pathParams } = require('path-params');

// noParams - value for parallel request if we don't need to add params to endpoint
export const addParamsToURL = (action, url, noParams) => {
  const { queryParams, routeParams } = action;

  let urlWithRouteParams;

  // 2 imports and condition assignement for test, jest can't find pathParams
  // TODO: find solution to solve this problem
  if (pathParams) {
    urlWithRouteParams = pathParams(url, routeParams);
  } else {
    urlWithRouteParams = path(url, routeParams);
  }

  if (!noParams) {
    return stringifyUrl(
      { url: urlWithRouteParams, query: queryParams },
      { skipNull: true, skipEmptyString: true, arrayFormat: 'comma' },
    );
  }

  return urlWithRouteParams;
};

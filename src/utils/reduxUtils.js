export const createActionType = (
  action,
  addFailureType,
) => {
  const actionTypes = {
    REQUEST: `${action}_REQUEST`,
    SUCCESS: `${action}_SUCCESS`,
  };

  if (addFailureType) {
    return {
      ...actionTypes,
      FAILURE: `${action}_FAILURE`,
    };
  }

  return actionTypes;
};

export const createRequest = (
  actionType,
  endpoint,
  responseType,
) => (payloadObj = {}) => {
  // payload - props which we'll provide to the back,
  // rest - query params
  const { payload, routeParams, fileName, ...rest } = payloadObj;

  const action = {
    queryParams: { ...rest },
    routeParams,
    payload,
    endpoint, // check utils/sagasHelpers.js -> addParamsToURL func for passed props in query string
    responseType,
    fileName,
    type: actionType.REQUEST,
    successCb: (data, paylod) => ({
      data,
      payload: paylod,
      type: actionType.SUCCESS,
    }),
  };

  if (actionType.FAILURE) {
    action.failureCb = data => ({
      data,
      type: actionType.FAILURE,
    });
  }

  return action;
};

export const createParallelRequest = (
  actionType,
  endpoints,
  responseType,
) => (payloadObj = {}) => {
  // payload - props which we'll provide to the back,
  // rest - query params
  const { payload, routeParams, ...rest } = payloadObj;

  const action = {
    queryParams: { ...rest },
    routeParams,
    payload,
    endpoints, // check utils/sagasHelpers.js -> addParamsToURL func for passed props in query string
    responseType,
    type: actionType.REQUEST,
    successCb: data => ({
      data,
      type: actionType.SUCCESS,
    }),
  };

  return action;
};

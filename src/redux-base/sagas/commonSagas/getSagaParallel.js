import { takeLatest, put, all, call } from 'redux-saga/effects';
import mapKeys from 'lodash/mapKeys';
import {
  apiClient,
  addParamsToURL,
  parallelActions,
} from '../../../utils';

export function* getSagaParallel(action) {
  try {
    // add params to url if params are provided
    const urls = [];

    // process endpoints and add params
    action.endpoints.forEach(endpoint => urls.push(addParamsToURL(action, endpoint.url, endpoint.noParams)));

    // create request object for 'all' effect
    const requestsObj = {};

    urls.forEach((url, index) => {
      const { responseAlias } = Object(action.endpoints[index]);

      requestsObj[responseAlias] = call(apiClient.get, url, {});
    });

    // make a parallel call
    const responses = yield all(requestsObj);

    const data = {};
    mapKeys(responses, (value, key) => {
      data[key] = value;
    });

    yield put(action.successCb(data));

  } catch (error) {
    if (error.response) {
      if (action.failureCb) {
        yield put(action.failureCb(error.response.data));
      }

      yield put({ type: 'ERROR' });
    } else {
      yield put({ type: 'ERROR' });
    }
  }
}

export default function* watchLastGetParallelSagaAction() {
  try {
    yield takeLatest(parallelActions, getSagaParallel);
  } catch (error) {
    yield put({ type: 'ERROR' });
  }
}

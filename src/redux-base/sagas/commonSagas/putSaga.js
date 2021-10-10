import { takeLatest, put, call } from 'redux-saga/effects';
import {
  apiClient,
  addParamsToURL,
  putActions,
} from '../../../utils';

export function* putSaga(action) {
  try {
    const url = addParamsToURL(action, action.endpoint);
    const response = yield call(apiClient.put, url, action.payload);

    yield put(action.successCb(response, action.payload));
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

export default function* watchLastPutAction() {
  try {
    yield takeLatest(putActions, putSaga);
  } catch (error) {
    yield put({ type: 'ERROR' });
  }
}

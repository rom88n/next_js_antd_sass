import { takeLatest, put, call } from 'redux-saga/effects';
import {
  apiClient,
  addParamsToURL,
  deleteActions,
} from '../../../utils';

export function* deleteSaga(action) {
  try {
    const url = addParamsToURL(action, action.endpoint);
    const response = yield call(apiClient.delete, url, action.payload);

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

export default function* watchLastDeleteAction() {
  try {
    yield takeLatest(deleteActions, deleteSaga);
  } catch (error) {
    yield put({ type: 'ERROR' });
  }
}

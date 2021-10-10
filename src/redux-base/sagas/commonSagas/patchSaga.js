import { takeLatest, put, call } from 'redux-saga/effects';
import {
  apiClient,
  addParamsToURL,
  patchActions,
} from '../../../utils';

export function* patchSaga(action) {
  try {
    const url = addParamsToURL(action, action.endpoint);
    const response = yield call(apiClient.patch, url, action.payload);

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

export default function* watchLastPatchAction() {
  try {
    yield takeLatest(patchActions, patchSaga);
  } catch (error) {
    yield put({ type: 'ERROR' });
  }
}

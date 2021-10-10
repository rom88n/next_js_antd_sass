import { takeLatest, put, call } from 'redux-saga/effects';
import {
  apiClient,
  addParamsToURL,
  postActions,
} from '../../../utils';

export function* postSaga(action) {
  try {
    const url = addParamsToURL(action, action.endpoint);
    const response = yield call(apiClient.post, url, action.payload);

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

export default function* watchLastPostAction() {
  try {
    yield takeLatest(postActions, postSaga);
  } catch (error) {
    yield put({ type: 'ERROR' });
  }
}

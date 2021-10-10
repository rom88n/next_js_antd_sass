import { takeEvery, put, call } from 'redux-saga/effects';
import { saveAs } from 'file-saver';
import {
  apiClient,
  addParamsToURL,
  getActions,
} from '../../../utils';

export function* getSaga(action) {
  try {
    const url = addParamsToURL(action, action.endpoint);
    const response = yield call(apiClient.get, url, { responseType: action.responseType });

    if (action.responseType === 'blob') {
      saveAs(response, action.fileName);
    }

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

export default function* watchLastGetAction() {
  try {
    yield takeEvery(getActions, getSaga);
  } catch (error) {
    yield put({ type: 'ERROR' });
  }
}

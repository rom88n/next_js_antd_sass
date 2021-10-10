import {
  fork,
  put,
  // cancel,
  all,
} from 'redux-saga/effects';

import {
  watchLastGetAction,
  watchLastPostSagaAction,
  watchLastPutSagaAction,
  watchLastPatchSagaAction,
  watchLastDeleteSagaAction,
  watchLastGetParallelSagaAction,
} from './commonSagas';

export default function* rootSaga() {
  try {
    while (true) {
      yield all([
        // common sagas
        fork(watchLastGetParallelSagaAction),
        fork(watchLastGetAction),
        fork(watchLastPutSagaAction),
        fork(watchLastPatchSagaAction),
        fork(watchLastPostSagaAction),
        fork(watchLastDeleteSagaAction),
      ]);

      // yield cancel([...tasks]);
    }
  } catch (error) {
    yield put({ type: 'ERROR' });
  }
}

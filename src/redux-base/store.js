import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';

import createRootReducer from './reducers/createRootReducer';
import rootSaga from './sagas/rootSaga';
import { createWrapper } from 'next-redux-wrapper';

const sagaMiddleware = createSagaMiddleware();

const bindMiddleware = (middleware) => {
  if (process.env.NODE_ENV !== 'production') {
    const { composeWithDevTools } = require('redux-devtools-extension');
    // 开发模式打印redux信息
    const { logger } = require('redux-logger');
    middleware.push(logger);
    return composeWithDevTools(applyMiddleware(...middleware));
  }
  return applyMiddleware(...middleware);
};

function store (initialState) {
  const store = createStore(
    createRootReducer,
    initialState,
    bindMiddleware([sagaMiddleware])
  );

  store.runSagaTask = () => {
    store.sagaTask = sagaMiddleware.run(rootSaga);
  };

  store.runSagaTask();
  return store;
}

const configureStore = createWrapper(store);

export default configureStore;

import { fork } from 'redux-saga/effects';

import { handleQueue } from '../queue/queueSaga';

export function* rootSaga(): Generator<any, any, any> {
  yield fork(handleQueue);
}

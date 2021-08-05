import {
  actionChannel,
  call,
  delay,
  fork,
  put,
  take,
} from 'redux-saga/effects';

import { Logger } from '../logger';
import { RestClient } from '../repository/RestClient';
import {
  FetchQueueAction,
  FetchQueueFirstTimeAction,
  QueueActionType,
  queueFetched,
  queueFetchError,
} from './actions';

const QUEUE_FETCHING_INTERVAL = 30 * 1000; // refresh every 30 seconds

export function* handleQueue(): Generator<any, any, any> {
  const channel = yield actionChannel([
    QueueActionType.FetchQueueFirstTime,
    QueueActionType.FetchQueue,
  ]);
  const backend = new RestClient();

  while (true) {
    const action: FetchQueueFirstTimeAction | FetchQueueAction = yield take(
      channel,
    );

    switch (action.type) {
      case QueueActionType.FetchQueueFirstTime:
        yield fork(handleQueueAutoUpdate, backend);
        break;
      case QueueActionType.FetchQueue:
        yield call(handleFetchQueue, backend);
        break;
    }
  }
}

function* handleQueueAutoUpdate(backend: RestClient) {
  while (true) {
    yield call(handleFetchQueue, backend);
    yield delay(QUEUE_FETCHING_INTERVAL);
  }
}

function* handleFetchQueue(backend: RestClient) {
  try {
    const {
      data: { queueData },
    } = yield call([backend, backend.fetchQueue], 'gj9fs');
    yield put(queueFetched(queueData));
  } catch (error) {
    yield put(queueFetchError());
    Logger.error(`Fetching queue error: ${error.message}`);
  }
}

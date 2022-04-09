import {
  actionChannel,
  call,
  delay,
  fork,
  put,
  take,
} from 'redux-saga/effects';
import RestClient from '../api/RestClient';
import { Logger } from '../logger';
import { fetchQueueFailure, fetchQueueSuccess } from './actionCreators';
import {
  FetchQueueAction,
  FetchQueueFirstTimeAction,
  QueueActionType,
} from './types';

const QUEUE_FETCHING_INTERVAL = 30 * 1000; // 30 seconds

export function* handleQueue(): Generator<any, any, any> {
  const channel = yield actionChannel([
    QueueActionType.FetchQueueFirstTime,
    QueueActionType.FetchQueue,
  ]);

  while (true) {
    const action: FetchQueueFirstTimeAction | FetchQueueAction = yield take(
      channel,
    );

    switch (action.type) {
      case QueueActionType.FetchQueueFirstTime:
        yield fork(handleQueueAutoUpdate);
        break;
      case QueueActionType.FetchQueue:
        yield call(handleFetchQueue);
        break;
    }
  }
}

function* handleQueueAutoUpdate() {
  while (true) {
    yield call(handleFetchQueue);
    yield delay(QUEUE_FETCHING_INTERVAL);
  }
}

function* handleFetchQueue() {
  try {
    const {
      data: { queueData },
    } = yield call([RestClient, RestClient.fetchQueue], 'gj9fs');
    yield put(fetchQueueSuccess(queueData));
  } catch (error: any) {
    yield put(fetchQueueFailure());
    Logger.error(`Fetching queue error: ${error.message}`);
  }
}

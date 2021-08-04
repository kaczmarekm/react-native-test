import { actionChannel, call, put, take } from 'redux-saga/effects';
import { Logger } from '../logger';
import { RestClient } from '../repository/RestClient';
import { QueueActionType, queueFetched } from './actions';

export function* handleQueue(): Generator<any, any, any> {
  const channel = yield actionChannel([QueueActionType.FetchQueue]);
  const backend = new RestClient();

  while (true) {
    yield take(channel);

    try {
      const { data } = yield call([backend, backend.fetchQueue], 'gj9fs');
      console.log('xxx', JSON.stringify(data));
      // yield put(queueFetched(data));
    } catch (error) {
      Logger.error(`Fetching queue error: ${error.message}`);
    }
  }
}

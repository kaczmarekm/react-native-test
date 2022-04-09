import { QueueData } from '../api/models';
import {
  FetchQueueAction,
  FetchQueueFailureAction,
  FetchQueueFirstTimeAction,
  FetchQueueSuccessAction,
  QueueActionType,
  SetCustomersListSearchTermAction,
} from './types';

export function fetchQueueFirstTime(): FetchQueueFirstTimeAction {
  return {
    type: QueueActionType.FetchQueueFirstTime,
    meta: { thunk: true },
  };
}

export function fetchQueue(): FetchQueueAction {
  return {
    type: QueueActionType.FetchQueue,
    meta: { thunk: true },
  };
}

export function fetchQueueSuccess(
  queueData: QueueData,
): FetchQueueSuccessAction {
  return {
    type: QueueActionType.FetchQueueSuccess,
    queueData,
  };
}

export function fetchQueueFailure(): FetchQueueFailureAction {
  return {
    type: QueueActionType.FetchQueueFailure,
  };
}

export function setCustomersListSearchTerm(
  searchTerm: string,
): SetCustomersListSearchTermAction {
  return { type: QueueActionType.SetCustomersListSearchTerm, searchTerm };
}

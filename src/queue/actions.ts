import { ReduxSagaThunkAction } from 'redux-saga-thunk';
import { QueueData } from '../repository/models';

export enum QueueActionType {
  FetchQueueFirstTime = 'FETCH_QUEUE_FIRST_TIME',
  FetchQueue = 'FETCH_QUEUE',
  QueueFetched = 'QUEUE_FETCHED',
  QueueFetchError = 'QUEUE_FETCH_ERROR',
  SetCustomersListSearchTerm = 'SET_CUSTOMERS_LIST_SEARCH_TERM',
}

export interface FetchQueueFirstTimeAction extends ReduxSagaThunkAction {
  type: QueueActionType.FetchQueueFirstTime;
}

export interface FetchQueueAction extends ReduxSagaThunkAction {
  type: QueueActionType.FetchQueue;
}

export interface QueueFetchedAction {
  type: QueueActionType.QueueFetched;
  queueData: QueueData;
}

export interface QueueFetchErrorAction {
  type: QueueActionType.QueueFetchError;
}

export interface SetCustomersListSearchTermAction {
  type: QueueActionType.SetCustomersListSearchTerm;
  searchTerm: string;
}

export type QueueAction =
  | FetchQueueFirstTimeAction
  | FetchQueueAction
  | QueueFetchedAction
  | QueueFetchErrorAction
  | SetCustomersListSearchTermAction;

export function fetchQueueFirstTime(): FetchQueueFirstTimeAction {
  return {
    type: QueueActionType.FetchQueueFirstTime,
    meta: { thunk: true },
  };
}

export function fetchQueue(
  shouldAutoUpdate: boolean = false,
): FetchQueueAction {
  return {
    type: QueueActionType.FetchQueue,
    meta: { thunk: true },
  };
}

export function queueFetched(queueData: QueueData): QueueFetchedAction {
  return {
    type: QueueActionType.QueueFetched,
    queueData,
  };
}

export function queueFetchError(): QueueFetchErrorAction {
  return {
    type: QueueActionType.QueueFetchError,
  };
}

export function setCustomersListSearchTerm(
  searchTerm: string,
): SetCustomersListSearchTermAction {
  return { type: QueueActionType.SetCustomersListSearchTerm, searchTerm };
}

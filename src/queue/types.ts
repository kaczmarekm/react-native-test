import { ReduxSagaThunkAction } from 'redux-saga-thunk';
import { QueueData } from '../api/models';

export enum QueueActionType {
  FetchQueueFirstTime = 'FETCH_QUEUE_FIRST_TIME',
  FetchQueue = 'FETCH_QUEUE',
  FetchQueueSuccess = 'FETCH_QUEUE_SUCCESS',
  FetchQueueFailure = 'FETCH_QUEUE_FAILURE',
  SetCustomersListSearchTerm = 'SET_CUSTOMERS_LIST_SEARCH_TERM',
}

export interface FetchQueueFirstTimeAction extends ReduxSagaThunkAction {
  type: QueueActionType.FetchQueueFirstTime;
}

export interface FetchQueueAction extends ReduxSagaThunkAction {
  type: QueueActionType.FetchQueue;
}

export interface FetchQueueSuccessAction {
  type: QueueActionType.FetchQueueSuccess;
  queueData: QueueData;
}

export interface FetchQueueFailureAction {
  type: QueueActionType.FetchQueueFailure;
}

export interface SetCustomersListSearchTermAction {
  type: QueueActionType.SetCustomersListSearchTerm;
  searchTerm: string;
}

export type QueueAction =
  | FetchQueueFirstTimeAction
  | FetchQueueAction
  | FetchQueueSuccessAction
  | FetchQueueFailureAction
  | SetCustomersListSearchTermAction;

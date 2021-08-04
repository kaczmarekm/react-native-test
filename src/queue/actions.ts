import { Queue } from '../repository/models';

export enum QueueActionType {
  FetchQueue = 'FETCH_QUEUE',
  QueueFetched = 'QUEUE_FETCHED',
}

export type FetchQueueAction = {
  type: QueueActionType.FetchQueue;
};

export type QueueFetchedAction = {
  type: QueueActionType.QueueFetched;
  queue: Queue;
};

export type QueueAction = FetchQueueAction | QueueFetchedAction;

export function fetchQueue(): FetchQueueAction {
  return { type: QueueActionType.FetchQueue };
}

export function queueFetched(queue: Queue): QueueFetchedAction {
  return {
    type: QueueActionType.QueueFetched,
    queue,
  };
}

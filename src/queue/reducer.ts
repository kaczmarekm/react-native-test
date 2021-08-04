import { Queue } from '../repository/models';
import { QueueAction, QueueActionType } from './actions';

export interface QueueState {
  queue?: Queue;
}

const initialState: () => QueueState = () => {
  return {};
};

export function queueReducer(
  state: QueueState = initialState(),
  action: QueueAction,
): QueueState {
  switch (action.type) {
    case QueueActionType.QueueFetched:
      return {
        queue: action.queue,
      };
    default:
      return state;
  }
}

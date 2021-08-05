import { QueueData } from '../repository/models';
import { QueueAction, QueueActionType } from './actions';

export interface QueueState {
  queueData?: QueueData;
  fetchingQueueData: boolean;
  customersListSearchTerm: string;
}

export const initialState: () => QueueState = () => {
  return {
    queueData: undefined,
    fetchingQueueData: false,
    customersListSearchTerm: '',
  };
};

export function queueReducer(
  state: QueueState = initialState(),
  action: QueueAction,
): QueueState {
  switch (action.type) {
    case QueueActionType.FetchQueue:
      return {
        ...state,
        fetchingQueueData: true,
      };
    case QueueActionType.QueueFetched:
      return {
        ...state,
        queueData: action.queueData,
        fetchingQueueData: false,
      };
    case QueueActionType.QueueFetchError:
      return {
        ...state,
        fetchingQueueData: false,
      };
    case QueueActionType.SetCustomersListSearchTerm:
      return {
        ...state,
        customersListSearchTerm: action.searchTerm,
      };
    default:
      return state;
  }
}

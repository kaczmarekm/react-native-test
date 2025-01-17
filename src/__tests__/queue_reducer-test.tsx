import {
  fetchQueue,
  queueFetchError,
  setCustomersListSearchTerm,
} from '../queue/actions';
import { initialState, queueReducer } from '../queue/reducer';

test('should return initial state', () => {
  expect(queueReducer(undefined, {})).toEqual(initialState());
});

test('should set text after typing into search bar', () => {
  const previousState = initialState();
  const testSearchTerm = 'Test search term';
  expect(
    queueReducer(previousState, setCustomersListSearchTerm(testSearchTerm)),
  ).toEqual({
    ...previousState,
    customersListSearchTerm: testSearchTerm,
  });
});

test('should handle fetching status', () => {
  const previousState = initialState();
  expect(queueReducer(previousState, fetchQueue())).toEqual({
    ...previousState,
    fetchingQueueData: true,
  });
});

test('should handle error fetching status', () => {
  const previousState = {
    ...initialState(),
    fetchingQueueData: true,
  };
  expect(queueReducer(previousState, queueFetchError())).toEqual({
    ...previousState,
    fetchingQueueData: false,
  });
});

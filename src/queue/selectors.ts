import { compareAsc } from 'date-fns';
import { createSelector } from 'reselect';
import { AppState } from '../store';

export const fetchingQueueDataSelector = (state: AppState) =>
  state.queue.fetchingQueueData;

export const queueCustomersSelector = (state: AppState) =>
  state.queue.queueData?.queue.customersToday || [];

export const queueNameSelector = (state: AppState) =>
  state.queue.queueData?.queue.name || null;

export const customersListSearchTermSelector = (state: AppState) =>
  state.queue.customersListSearchTerm;

export const queueCustomersSortedAndFiltered = createSelector(
  [queueCustomersSelector, customersListSearchTermSelector],
  (customers, searchTerm) => {
    return customers
      .filter((customer) => customer.customer.name.includes(searchTerm))
      .sort((customer1, customer2) =>
        compareAsc(
          new Date(customer1.expectedTime),
          new Date(customer2.expectedTime),
        ),
      );
  },
);

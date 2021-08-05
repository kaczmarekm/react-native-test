import React, { useEffect } from 'react';
import { View, StyleSheet, Text, LayoutAnimation } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Colors } from '../../utils/colors';

import { fetchQueue, setCustomersListSearchTerm } from '../actions';
import {
  queueNameSelector,
  queueCustomersSortedAndFiltered,
  fetchingQueueDataSelector,
  customersListSearchTermSelector,
} from '../selectors';
import SearchInput from '../components/SearchInput';
import CustomersList from '../components/CustomersList';

export default function QueueScreen() {
  const dispatch = useDispatch();

  const queueName = useSelector(queueNameSelector);
  const customersListSearchTerm = useSelector(customersListSearchTermSelector);
  const fetchingQueueData = useSelector(fetchingQueueDataSelector);
  const queueCustomers = useSelector(queueCustomersSortedAndFiltered);

  const handleCustomersListRefresh = () => dispatch(fetchQueue());
  const handleCustomersListSearch = (text: string) =>
    dispatch(setCustomersListSearchTerm(text));

  useEffect(() => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
  }, [queueName, queueCustomers, customersListSearchTerm]);

  return (
    <View style={styles.container}>
      {!!queueName && <Text style={styles.title}>{queueName}</Text>}
      <SearchInput
        searchTerm={customersListSearchTerm}
        handleSearchTermChange={handleCustomersListSearch}
      />
      <CustomersList
        customers={queueCustomers}
        refreshing={fetchingQueueData}
        onRefresh={handleCustomersListRefresh}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    alignItems: 'center',
    paddingTop: 60,
  },
  title: {
    fontSize: 24,
    fontWeight: '500',
    color: Colors.black,
    marginBottom: 60,
  },
});

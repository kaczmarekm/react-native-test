import React, { useEffect } from 'react';
import { LayoutAnimation, StyleSheet, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Colors } from '../../utils/colors';
import { fetchQueue, setCustomersListSearchTerm } from '../actionCreators';
import CustomersList from '../components/CustomersList';
import SearchInput from '../components/SearchInput';
import {
  customersListSearchTermSelector,
  fetchingQueueDataSelector,
  queueCustomersSortedAndFiltered,
  queueNameSelector,
} from '../selectors';

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

const QueueScreen = () => {
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
};

export default QueueScreen;

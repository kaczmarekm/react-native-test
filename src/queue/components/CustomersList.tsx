import React from 'react';
import { FlatList, RefreshControl, StyleSheet } from 'react-native';
import { Customer } from '../../api/models/Queue';
import CustomersListItem from './CustomersListItem';

const styles = StyleSheet.create({
  customersList: {
    flex: 1,
    alignSelf: 'stretch',
    marginTop: 10,
  },
  customerListContentContainer: {
    marginTop: 40,
    paddingBottom: 40,
  },
});

const renderCustomerItem = ({ item }: { item: Customer }) => (
  <CustomersListItem item={item} />
);

interface CustomersListProps {
  customers: Array<Customer>;
  refreshing: boolean;
  onRefresh: () => void;
}

const CustomersList = ({
  customers,
  refreshing,
  onRefresh,
}: CustomersListProps) => (
  <FlatList
    data={customers}
    renderItem={renderCustomerItem}
    style={styles.customersList}
    contentContainerStyle={styles.customerListContentContainer}
    refreshControl={
      <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
    }
  />
);

export default CustomersList;

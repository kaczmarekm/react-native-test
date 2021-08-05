import React from 'react';
import { FlatList, RefreshControl, StyleSheet } from 'react-native';

import { Customer } from '../../repository/models/Queue';
import CustomersListItem from './CustomersListItem';

interface CustomersListProps {
  customers: Array<Customer>;
  refreshing: boolean;
  onRefresh: () => void;
}

export default function CustomersList({
  customers,
  refreshing,
  onRefresh,
}: CustomersListProps) {
  return (
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
}

function renderCustomerItem({ item }: { item: Customer }) {
  return <CustomersListItem item={item} />;
}

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

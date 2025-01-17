import React from 'react';
import { TextInput, StyleSheet } from 'react-native';
import { Colors } from '../../utils/colors';
import { translate } from '../../localizable';

const styles = StyleSheet.create({
  searchInput: {
    backgroundColor: Colors.gray,
    alignSelf: 'stretch',
    marginHorizontal: 30,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    color: Colors.black,
    fontSize: 18,
  },
});

interface SearchInputProps {
  searchTerm: string;
  handleSearchTermChange: (text: string) => void;
}

const SearchInput = ({
  searchTerm,
  handleSearchTermChange,
}: SearchInputProps) => (
  <TextInput
    style={styles.searchInput}
    value={searchTerm}
    onChangeText={handleSearchTermChange}
    placeholder={translate('search')}
    placeholderTextColor={Colors.background}
  />
);

export default SearchInput;

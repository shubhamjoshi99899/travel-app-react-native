import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { RootScreenProps } from '@/navigation/types';

interface SearchBarProps {
  onSearch: () => void;
}
function SearchBar({ onSearch }: SearchBarProps) {
  const [search, setSearch] = useState<string>('');

  const handleTypeChange = (e: any) => {
    setSearch(e.nativeEvent.text);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <View style={styles.container}>
        {/* Uber logo */}
        <Text style={styles.logo}>Ride On</Text>

        {/* Search Bar */}
        <TouchableOpacity onPress={onSearch} style={styles.searchBar}>
          <TextInput
            placeholder="Where to?"
            style={styles.input}
            placeholderTextColor="#8E8E93"
            value={search}
            onChange={onSearch}
          />
          <TouchableOpacity style={styles.laterButton}>
            {/* <Icon name="add-circle" size={16} color="#FFD700" /> */}
            <Text style={styles.laterText}>Search</Text>
          </TouchableOpacity>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
    // backgroundColor: '#fff',
  },
  logo: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#000',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F3F3',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  icon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#000',
    fontWeight: 'bold',
  },
  laterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderColor: '#E5E5E5',
    borderWidth: 1,
  },
  laterText: {
    marginLeft: 4,
    fontSize: 14,
    color: '#000',
    fontWeight: '500',
  },
});

export default SearchBar;

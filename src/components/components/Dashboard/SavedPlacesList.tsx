import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const SavedPlaces = () => {
  const places = [
    {
      id: 1,
      icon: '💙',
      title: 'Gym',
      address: 'KIAL Rd, Bengaluru, Bengaluru Urban, Karnataka 560...',
    },
    {
      id: 2,
      icon: '🏠',
      title: 'Home',
      address: 'Whitefield Main Rd, Devasandra Industrial Estate, Ka...',
    },
    {
      id: 3,
      icon: '🏢',
      title: 'Work',
      address: 'Bus Sta Upas, Majestic, Bengaluru, Karnataka 560009',
    },
  ];

  return (
    <View>
      <Text style={styles.header}>Saved Places</Text>

      <View style={styles.container}>
        {places.map((place) => (
          <View key={place.id} style={styles.placeItem}>
            <View style={styles.iconContainer}>
              <Text style={styles.icon}>{place.icon}</Text>
            </View>
            <View style={styles.placeDetails}>
              <Text style={styles.placeTitle}>{place.title}</Text>
              <Text style={styles.placeAddress}>{place.address}</Text>
            </View>
          </View>
        ))}

        <TouchableOpacity>
          <Text style={styles.viewAllText}>View all saved places</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 16,
    // shadowColor: '#000',
    // shadowOffset: { width: 0, height: 2 },
    // shadowOpacity: 0.2,
    // shadowRadius: 4,
    elevation: 2,
    marginBottom: 24,
  },
  header: {
    fontSize: 14,
    color: '#000',
    fontWeight: '600',
    marginBottom: 8,
  },
  placeItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#e0f0ff',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  icon: {
    fontSize: 18,
  },
  placeDetails: {
    flex: 1,
  },
  placeTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  placeAddress: {
    fontSize: 14,
    color: '#8e8e8e',
  },
  viewAllText: {
    fontSize: 14,
    color: '#007bff',
    textAlign: 'center',
    marginTop: 8,
    fontWeight: 'bold',
  },
});

export default SavedPlaces;

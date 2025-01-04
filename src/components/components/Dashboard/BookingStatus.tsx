import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const BookingStatusCard = () => {
  return (
    <View>
      <Text style={styles.header}>Booking Status</Text>

      <View style={styles.card}>
        <View style={styles.statusContainer}>
          <View>
            <Text style={styles.title}>Searching Driver</Text>
            <Text style={styles.subTitle}>13 Feb 2024, 11:59 AM</Text>
          </View>
          <View style={styles.statusBadge}>
            <Text style={styles.statusText}>Pending</Text>
          </View>
        </View>

        <View style={styles.detailsContainer}>
          <View style={styles.detail}>
            <Text style={styles.detailIcon}>🚐</Text>
            <Text style={styles.detailText}>One Way</Text>
          </View>
          <View style={styles.detail}>
            <Text style={styles.detailIcon}>📍</Text>
            <Text style={styles.detailText}>15.36 km</Text>
          </View>
          <View style={styles.detail}>
            <Text style={styles.detailIcon}>⏱</Text>
            <Text style={styles.detailText}>0h 50min</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.trackButton}>
          <Text style={styles.trackButtonText}>Track Status</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    // shadowOffset: { width: 0, height: 2 },
    // shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
    marginBottom: 24,
  },
  header: {
    fontSize: 14,
    color: '#000',
    fontWeight: '600',
    marginBottom: 8,
  },
  statusContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  subTitle: {
    fontSize: 12,
    color: '#8e8e8e',
    fontWeight: 'bold',
  },
  statusBadge: {
    backgroundColor: '#e0f0ff',
    borderRadius: 20,
    paddingHorizontal: 12,
    padding: 8,
  },
  statusText: {
    color: '#007bff',
    fontWeight: 'bold',
    fontSize: 12,
  },
  detailsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  detail: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailIcon: {
    fontSize: 16,
    marginRight: 4,
  },
  detailText: {
    fontSize: 14,
    color: '#333',
    fontWeight: 'bold',
  },
  trackButton: {
    backgroundColor: '#e0f0ff',
    borderRadius: 5,
    paddingVertical: 12,
    alignItems: 'center',
  },
  trackButtonText: {
    color: '#007bff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default BookingStatusCard;

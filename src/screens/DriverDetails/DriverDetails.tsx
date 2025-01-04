import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { Paths } from '@/navigation/paths';
import { RootScreenProps } from '@/navigation/types';

function DriverDetailsScreen({
  navigation,
}: RootScreenProps<Paths.DriverDetails>) {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity>
          {/* <Text style={styles.iconText}>←</Text> */}
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Driver Details</Text>
      </View>

      {/* Profile Section */}
      <View style={styles.profileContainer}>
        <Image
          source={{
            uri: 'https://gratisography.com/wp-content/uploads/2024/10/gratisography-cool-cat-800x525.jpg', // Fallback or placeholder image
          }}
          onError={() => console.log('Image failed to load')}
          style={styles.profileImage}
        />

        <Text style={styles.name}>Shubham Joshi</Text>
        <View style={styles.phoneContainer}>
          <Text style={styles.phone}>+91 8954665493</Text>
          <Text style={styles.iconText}>📋</Text>
        </View>
      </View>

      {/* Statistics Section */}
      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <Text style={styles.iconText}>⭐</Text>
          <Text style={styles.statValue}>4.8</Text>
          <Text style={styles.statLabel}>Ratings</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.iconText}>🚗</Text>
          <Text style={styles.statValue}>279</Text>
          <Text style={styles.statLabel}>Trips</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.iconText}>⏳</Text>
          <Text style={styles.statValue}>5</Text>
          <Text style={styles.statLabel}>Years</Text>
        </View>
      </View>

      {/* Driver Details */}
      <View style={styles.detailsContainer}>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Member Since</Text>
          <Text style={styles.detailValue}>July 15, 2019</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Car Model</Text>
          <Text style={styles.detailValue}>Mercedes-Benz E-Class</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Plate Number</Text>
          <Text style={styles.detailValue}>HSW 4736 XK</Text>
        </View>
      </View>

      {/* Action Buttons */}
      <View style={styles.actionsContainer}>
        <TouchableOpacity style={styles.actionButton}>
          <Text style={styles.iconTextAction}>💬</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Text style={styles.iconTextAction}>📞</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default DriverDetailsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    paddingHorizontal: 16,
    paddingTop: 40,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginLeft: 16,
  },
  iconText: {
    fontSize: 20,
    color: '#333',
  },
  profileContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 8,
    borderWidth: 10,
    borderColor: '#000',
  },
  name: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },
  phoneContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  phone: {
    fontSize: 14,
    color: '#333',
    marginRight: 8,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  statCard: {
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 4,
    backgroundColor: '#FFF',
    paddingVertical: 16,
    borderRadius: 8,
    elevation: 3,
  },
  statValue: {
    fontSize: 16,
    fontWeight: '600',
    marginVertical: 4,
  },
  statLabel: {
    fontSize: 14,
    color: '#666',
  },
  detailsContainer: {
    backgroundColor: '#FFF',
    borderRadius: 8,
    padding: 16,
    marginBottom: 24,
    elevation: 3,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  detailLabel: {
    fontSize: 14,
    color: '#666',
  },
  detailValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 16,
  },
  actionButton: {
    backgroundColor: '#007AFF',
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconTextAction: {
    fontSize: 24,
    color: '#FFF',
  },
});

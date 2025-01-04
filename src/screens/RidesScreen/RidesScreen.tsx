import LottieView from 'lottie-react-native';
import React, { useState } from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';

import { Paths } from '@/navigation/paths';
import { RootScreenProps, TabScreenProps } from '@/navigation/types';

import { icons } from '@/constants';

function MyRidesScreen({ navigation }: RootScreenProps<Paths.RideDetails>) {
  const [activeTab, setActiveTab] = useState('Upcoming'); // Tracks the active tab

  const handleNavigation = () => {
    navigation.navigate(Paths.RideDetails);
  };

  // Dummy data for each tab
  const rides: any = {
    Upcoming: [
      {
        id: 1,
        type: 'Manual • Sedan',
        price: '₹1053.99',
        paymentMethod: 'Cash',
        date: '18/11/2023, 10:24 AM',
        duration: 'One Way | 4 Hours',
        pickup: 'Bus Sta Upas, Majestic, Bengaluru, Karnataka',
        destination: 'M.G. Railway Colony, Majestic, Bengaluru, Karnataka',
        driverArrival: '15mins',
        pickupCoordinates: { latitude: 12.971598, longitude: 77.594566 },
        destinationCoordinates: { latitude: 12.975227, longitude: 77.591831 },
      },
    ],
    Completed: [],
    Cancelled: [],
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity>{/* Add back button icon here */}</TouchableOpacity>
        <Text style={styles.headerTitle}>My Rides</Text>
      </View>

      {/* Tabs */}
      <View style={styles.tabs}>
        {['Upcoming', 'Completed', 'Cancelled'].map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[styles.tab, activeTab === tab && styles.activeTab]}
            onPress={() => setActiveTab(tab)}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === tab && styles.activeTabText,
              ]}
            >
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Rides List or Placeholder */}
      {rides[activeTab].length > 0 ? (
        <ScrollView style={styles.rideList}>
          {rides[activeTab].map((ride: any) => (
            <TouchableOpacity onPress={() => handleNavigation()} key={ride.id}>
              <View style={styles.rideCard}>
                {/* Ride Details */}
                <View style={styles.rideHeader}>
                  <Text style={styles.rideType}>{ride.type}</Text>
                  <Text style={styles.ridePrice}>{ride.price}</Text>
                </View>
                <View style={styles.paymentMethod}>
                  <Image source={icons.dollar} style={styles.icon} />
                  <Text style={styles.paymentText}>{ride.paymentMethod}</Text>
                </View>
                <Text style={styles.rideDate}>{ride.date}</Text>
                <Text style={styles.rideDuration}>{ride.duration}</Text>
                <View style={styles.location}>
                  <View style={styles.locationRow}>
                    <View style={[styles.dot, styles.pickupDot]} />
                    <Text style={styles.locationText}>{ride.pickup}</Text>
                  </View>
                  <View style={styles.locationRow}>
                    <View style={[styles.dot, styles.destinationDot]} />
                    <Text style={styles.locationText}>{ride.destination}</Text>
                  </View>
                </View>
                <MapView
                  style={styles.map}
                  initialRegion={{
                    latitude: ride.pickupCoordinates.latitude,
                    longitude: ride.pickupCoordinates.longitude,
                    latitudeDelta: 0.01,
                    longitudeDelta: 0.01,
                  }}
                >
                  <Marker
                    coordinate={ride.pickupCoordinates}
                    title="Pickup"
                    pinColor="green"
                  />
                  <Marker
                    coordinate={ride.destinationCoordinates}
                    title="Destination"
                    pinColor="red"
                  />
                </MapView>
                <Text style={styles.driverText}>
                  Driver arrived in{' '}
                  <Text style={styles.highlightedText}>
                    {ride.driverArrival}
                  </Text>
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      ) : (
        <View style={styles.placeholderContainer}>
          <LottieView
            source={require('@/assets/animations/not-found.json')} // Replace with your Lottie file path
            autoPlay
            loop
            style={styles.lottie}
          />
          <Text style={styles.placeholderText}>No rides found!</Text>
        </View>
      )}
    </View>
  );
}

export default MyRidesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  icon: {},
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
  tabs: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  activeTab: {
    borderBottomColor: '#007AFF',
  },
  tabText: {
    fontSize: 16,
    color: '#8E8E93',
  },
  activeTabText: {
    color: '#007AFF',
    fontWeight: '600',
  },
  rideList: {
    flex: 1,
    marginBottom: 100,
  },
  rideCard: {
    backgroundColor: '#FFF',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  rideHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  rideType: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  ridePrice: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  paymentMethod: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  paymentText: {
    marginLeft: 8,
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
  },
  rideDate: {
    fontSize: 14,
    color: '#8E8E93',
    fontWeight: '500',
  },
  rideDuration: {
    fontSize: 14,
    color: '#8E8E93',
    marginBottom: 8,
    fontWeight: '500',
  },
  location: {
    marginBottom: 8,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 8,
  },
  pickupDot: {
    backgroundColor: 'green',
  },
  destinationDot: {
    backgroundColor: 'red',
  },
  locationText: {
    fontSize: 14,
    color: '#333',
  },
  map: {
    height: 150,
    borderRadius: 8,
    marginVertical: 8,
  },
  driverText: {
    fontSize: 14,
    color: '#8E8E93',
    backgroundColor: '#e0f0ff',
    borderRadius: 5,
    paddingVertical: 12,
    textAlign: 'center',
  },
  highlightedText: {
    color: '#007AFF',
    fontWeight: '600',
  },
  placeholderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  lottie: {
    width: 200,
    height: 200,
  },
  placeholderText: {
    fontSize: 18,
    color: '#8E8E93',
    marginTop: 16,
    fontWeight: '500',
  },
});

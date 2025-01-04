import React from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';

import { Paths } from '@/navigation/paths';
import { RootScreenProps } from '@/navigation/types';

import { icons } from '@/constants';

function RideDetails({ navigation }: RootScreenProps<Paths.RideDetails>) {
  // Define the coordinates for the start and end locations
  const startLocation = {
    latitude: 17.385044, // Replace with actual latitude
    longitude: 78.486671, // Replace with actual longitude
  };

  const endLocation = {
    latitude: 17.4375, // Replace with actual latitude
    longitude: 78.4485, // Replace with actual longitude
  };

  // Example route coordinates
  const routeCoordinates = [
    { latitude: 17.385044, longitude: 78.486671 },
    { latitude: 17.4202, longitude: 78.4521 },
    { latitude: 17.4375, longitude: 78.4485 },
  ];

  const handleDriverNavigation = () => {
    navigation.navigate(Paths.DriverDetails);
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity>
          {/* <Text style={styles.backText}>&lt;</Text> */}
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Ride details</Text>
      </View>

      {/* Help Section */}
      <View style={styles.helpContainer}>
        <Text style={styles.helpText}>
          Having an issue with a different driver?
        </Text>
        <TouchableOpacity style={styles.helpButton}>
          <Text style={styles.helpButtonText}>Get help</Text>
        </TouchableOpacity>
      </View>

      {/* Map Section */}
      <View style={styles.mapContainer}>
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: (startLocation.latitude + endLocation.latitude) / 2,
            longitude: (startLocation.longitude + endLocation.longitude) / 2,
            latitudeDelta: 0.05,
            longitudeDelta: 0.05,
          }}
        >
          {/* Markers */}
          <Marker coordinate={startLocation} title="Pickup Location" />
          <Marker coordinate={endLocation} title="Dropoff Location" />

          {/* Route Polyline */}
          <Polyline
            coordinates={routeCoordinates}
            strokeColor="#007AFF"
            strokeWidth={4}
          />
        </MapView>
      </View>

      {/* Ride Info */}
      <View style={styles.rideInfo}>
        <View style={styles.rideHeader}>
          <Text style={styles.rideTitle}>Moto Saver ride with V BALRAJ</Text>
          <TouchableOpacity onPress={() => handleDriverNavigation()}>
            <Image
              source={icons.person} // Replace with the actual profile image URL
              style={styles.icon}
            />
          </TouchableOpacity>
        </View>
        <Text style={styles.rideDate}>27 Dec 9:57AM</Text>
        <Text style={styles.ridePrice}>₹74.05</Text>
        <TouchableOpacity style={styles.receiptButton}>
          <Text style={styles.receiptText}>Receipt</Text>
        </TouchableOpacity>
      </View>

      {/* Locations */}
      <View style={styles.locationContainer}>
        <View style={styles.locationRow}>
          <Image source={icons.pin} style={styles.icon} />
          <View style={styles.locationDetails}>
            <Text style={styles.locationText}>
              Shaikh's Manor 1-61/2/4b, New, P Janardhan Reddy Nagar, Gachibowli
            </Text>
            <Text style={styles.locationTime}>10:03 AM</Text>
          </View>
        </View>
        <View style={styles.locationRow}>
          <Image source={icons.pin} style={styles.icon} />
          <View style={styles.locationDetails}>
            <Text style={styles.locationText}>
              Sun trinity complex, 12-7-134/371/III, Green Hills Rd, Anjaneya
              Nagar
            </Text>
            <Text style={styles.locationTime}>10:23 AM</Text>
          </View>
        </View>
      </View>

      {/* Tip Section */}
      {/* <View style={styles.tipContainer}>
        <Text style={styles.tipText}>No tip added</Text>
        <TouchableOpacity>
          <Text style={styles.addTip}>Add tip</Text>
        </TouchableOpacity>
      </View> */}

      {/* Rating */}
      {/* <View style={styles.ratingContainer}>
        <Text style={styles.ratingText}>Rated 5</Text>
        <Text style={styles.starText}>★</Text>
      </View> */}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    // margin: 10,
    backgroundColor: '#fff',
  },
  icon: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
    marginRight: 10,
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  backText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginRight: 10,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
  },
  helpContainer: {
    backgroundColor: '#f0f8ff',
    borderRadius: 8,
    padding: 10,
    marginVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  helpText: {
    fontSize: 14,
    color: '#555',
  },
  helpButton: {
    backgroundColor: '#dcefff',
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  helpButtonText: {
    color: '#007aff',
    fontSize: 14,
  },
  mapContainer: {
    height: 300,
    marginVertical: 10,
    borderRadius: 8,
    overflow: 'hidden',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  rideInfo: {
    marginVertical: 10,
  },
  rideHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  rideTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    flex: 1,
  },
  profileIcon: {
    width: 20,
    height: 20,
    borderRadius: 50,
    resizeMode: 'contain',
    marginLeft: 10,
    borderColor: '#000',
    borderWidth: 1,
    padding: 20,
    marginTop: 10,
  },
  rideDate: {
    fontSize: 14,
    color: '#555',
  },
  ridePrice: {
    fontSize: 16,
    fontWeight: '600',
    marginVertical: 5,
  },
  receiptButton: {
    alignSelf: 'flex-start',
    backgroundColor: '#e0f0ff',

    padding: 10,
    paddingHorizontal: 25,
    borderRadius: 25,
  },
  receiptText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  locationContainer: {
    marginVertical: 10,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    padding: 10,
  },
  locationDetails: {
    flex: 1,
  },
  locationText: {
    fontSize: 14,
    color: '#555',
    fontWeight: 'bold',
  },
  locationTime: {
    fontSize: 12,
    color: '#999',
    fontWeight: '600',
  },
  tipContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  tipText: {
    fontSize: 14,
    color: '#555',
  },
  addTip: {
    color: '#007aff',
    fontWeight: '600',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  ratingText: {
    fontSize: 14,
    marginRight: 5,
  },
  starText: {
    fontSize: 18,
    color: '#ffa500',
  },
});

export default RideDetails;

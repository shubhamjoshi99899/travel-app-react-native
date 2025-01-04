import Geolocation from '@react-native-community/geolocation';
import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react';
import {
  Alert,
  Image,
  Linking,
  PermissionsAndroid,
  Platform,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { PERMISSIONS, request, RESULTS } from 'react-native-permissions';

import { Paths } from '@/navigation/paths';
import { RootScreenProps } from '@/navigation/types';

import DashboardLayout from '@/components/components/DashboardLayout';
import { icons, images } from '@/constants';
import { useLocationStore } from '@/store';

const googleDirectionsApiKey = process.env.EXPO_PUBLIC_DIRECTIONS_API_KEY;

const delhiFamousLocations = [
  {
    name: 'Red Fort (Lal Qila)',
    address:
      'Netaji Subhash Marg, Chandni Chowk, New Delhi, Delhi 110006, India.',
    latitude: 28.6562,
    longitude: 77.241,
  },
  {
    name: 'Qutub Minar',
    address: 'Mehrauli, New Delhi, Delhi 110030, India.',
    latitude: 28.5245,
    longitude: 77.1855,
  },
  {
    name: 'India Gate',
    address:
      'Rajpath, India Gate, Central Secretariat, New Delhi, Delhi 110001, India.',
    latitude: 28.6129,
    longitude: 77.2295,
  },
];

function Dashboard({ navigation }: RootScreenProps<Paths.Dashboard>) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);
  const setUserLocation = useLocationStore((state) => state.setUserLocation);
  const setDestinationLocation = useLocationStore(
    (state) => state.setDestinationLocation,
  );
  const { userAddress } = useLocationStore();

  const requestLocationPermission = async () => {
    if (Platform.OS === 'android') {
      await requestAndroidLocationPermission();
    } else {
      const result = await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
      handlePermissionResult(result);
    }
  };

  const requestAndroidLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Location Access Required',
          message:
            'This app needs to access your location for finding nearby rides',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      console.log(granted);
      handlePermissionResult(granted);
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handlePermissionResult = (result: string) => {
    if (
      result === RESULTS.GRANTED ||
      result === PermissionsAndroid.RESULTS.GRANTED
    ) {
      getLocation();
    } else if (
      result === RESULTS.BLOCKED ||
      result === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN
    ) {
      showSettingsAlert();
    } else {
      setError('Location permission denied');
    }
  };

  const getLocation = () => {
    Geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        console.log(latitude, longitude);
        if (latitude && longitude) {
          const address = await getAddressFromCoordinates(latitude, longitude);
          console.log(latitude, longitude, address);
          setUserLocation({ latitude, longitude, address });
        } else {
          setError('Failed to retrieve location coordinates');
        }
        setLoading(false);
      },
      (err) => {
        setError(err.message);
        setLoading(false);
      },
      // { enableHighAccuracy: true, maximumAge: 10000 },-
    );
  };

  const getAddressFromCoordinates = async (
    latitude: number,
    longitude: number,
  ) => {
    console.log(latitude, latitude);
    try {
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${googleDirectionsApiKey}`,
      );
      return response.data.results[0]?.formatted_address || 'Unknown Address';
    } catch (error) {
      console.error('Error fetching address:', error);
      return 'Error fetching address';
    }
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 2000);
  }, []);

  const showSettingsAlert = () => {
    Alert.alert(
      'Location Permission Required',
      'Please enable location permissions in settings to continue.',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Open Settings', onPress: Linking.openSettings },
      ],
      { cancelable: false },
    );
  };

  const handleSignOut = () => navigation.navigate(Paths.SignUp);

  const handleSearchPress = () => {
    setDestinationLocation({ latitude: null, longitude: null, address: '' });

    navigation.navigate(Paths.SelectDestination);
  };

  const handleDestinationPress = (location: {
    latitude: number;
    longitude: number;
    address: string;
  }) => {
    setDestinationLocation(location);
    navigation.navigate(Paths.SelectRide);
  };

  useEffect(() => {
    requestLocationPermission();
  }, []);

  useEffect(() => {
    getLocation();
  }, []);

  return (
    <DashboardLayout title={'Choose'} snapPoints={['45%', '85%']}>
      <View style={styles.container}>
        <View style={styles.searchInput} onTouchEnd={handleSearchPress}>
          <Image source={icons.search} style={styles.icon} resizeMode="cover" />
          <Text style={styles.searchText}>Search Destination</Text>
        </View>
        {delhiFamousLocations?.map((location, index) => (
          <View
            key={index}
            style={styles.historySearch}
            onTouchEnd={() =>
              handleDestinationPress({
                latitude: location.latitude,
                longitude: location.longitude,
                address: location.address,
              })
            }
          >
            <Image
              source={icons.history}
              style={styles.icon}
              resizeMode="cover"
            />
            <Text>{location.address}</Text>
          </View>
        ))}
      </View>
    </DashboardLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f9f9f9',
    padding: 10,
    elevation: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  icon: {
    width: 24,
    height: 24,
    marginRight: 10,
    color: 'green',
  },
  searchInput: {
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white', // Added background color for contrast
    borderRadius: 8, // Added border radius
    shadowOpacity: 0.2,
    shadowRadius: 4,
    marginBottom: 10,
    elevation: 5,
  },
  searchText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  historySearch: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    width: '90%',
  },
});

export default Dashboard;

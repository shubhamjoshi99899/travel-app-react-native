import Geolocation from '@react-native-community/geolocation';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react';
import {
  Alert,
  Linking,
  PermissionsAndroid,
  Platform,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import { PERMISSIONS, request, RESULTS } from 'react-native-permissions';

import { Paths } from '@/navigation/paths';
import {
  RootScreenProps,
  TabParamList,
  TabScreenProps,
} from '@/navigation/types';

import DashboardHomeScreen from '@/screens/Dashboard/DashboardHome';

import { useLocationStore } from '@/store';

import BookingStatus from './BookingStatus';
import MapViewComponent from './MapViewComponent';
import OlderRidesList from './OlderRides';
import RideTypeSelector from './RideSelector';
import RideSuggestionList from './RideSuggestionList';
import SavedPlacesList from './SavedPlacesList';
import SearchBar from './SearchBar';

const rideSuggestions = [
  {
    from: 'Bus Sta Upas, Majestic, Bengaluru',
    to: 'M.G. Railway Colony, Majestic, Bengaluru',
    type: 'One Way',
    duration: '3h 50min',
    price: '₹1529',
  },
  {
    from: 'Bus Sta Upas, Majestic, Bengaluru',
    to: 'M.G. Railway Colony, Majestic, Bengaluru',
    type: 'Round Trip',
    duration: '4h 20min',
    price: '₹1829',
  },
];

const olderRides = [
  {
    driverName: 'Nikolas Mcpherson',
    rating: 4.5,
    from: 'Bus Sta Upas, Majestic, Bengaluru',
    to: 'M.G. Railway Colony, Majestic, Bengaluru',
    type: 'Round Trip',
    duration: '3h 50min',
    price: '₹1529',
  },
  {
    driverName: 'John Doe',
    rating: 4.0,
    from: 'Bus Sta Upas, Majestic, Bengaluru',
    to: 'M.G. Railway Colony, Majestic, Bengaluru',
    type: 'One Way',
    duration: '2h 30min',
    price: '₹1329',
  },
];

type DashboardHomeProps = BottomTabScreenProps<
  TabParamList,
  Paths.DashboardHome
>;
function DashboardComponent({
  navigation,
}: TabScreenProps<Paths.DashboardHome>) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);
  const setUserLocation = useLocationStore((state) => state.setUserLocation);
  const setDestinationLocation = useLocationStore(
    (state) => state.setDestinationLocation,
  );
  const { userAddress } = useLocationStore();
  // const googleDirectionsApiKey = process.env.EXPO_PUBLIC_DIRECTIONS_API_KEY;
  const googleDirectionsApiKey = 'AIzaSyDbQiGGaZbyoqJzZ6Y7k1bfL0ENEAMsSVU';

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

  // const handleSignOut = () => navigation.navigate(Paths.Dashboard);

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
    // navigation.navigate(Paths.SelectRde);
  };

  useEffect(() => {
    requestLocationPermission();
  }, []);

  useEffect(() => {
    getLocation();
  }, []);

  const handleSearch = () => {
    navigation.navigate(Paths.SelectPickupLocation);
  };
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <SearchBar onSearch={handleSearch} />
      <SavedPlacesList />
      <BookingStatus />
      {/* <RideTypeSelector /> */}
      {/* <RideSuggestionList suggestions={rideSuggestions} /> */}
      <OlderRidesList />
    </ScrollView>
  );
}

export default DashboardComponent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    paddingTop: 20,
    // marginTop: 10,
  },
  content: {
    paddingHorizontal: 16,
  },
});

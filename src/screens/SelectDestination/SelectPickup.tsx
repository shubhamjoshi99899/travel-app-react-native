import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import Geolocation from '@react-native-community/geolocation';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  Alert,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import MapView, { Marker, Region } from 'react-native-maps';

import { Paths } from '@/navigation/paths';
import { RootScreenProps } from '@/navigation/types';

function PickupLocationScreen({
  navigation,
}: RootScreenProps<Paths.SelectPickupLocation>) {
  const [region, setRegion] = useState<Region>({
    latitude: 0,
    longitude: 0,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  });
  const [address, setAddress] = useState<string>('Fetching your location...');
  const [searchText, setSearchText] = useState<string>('');
  const [predictions, setPredictions] = useState<any[]>([]);
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState<boolean>(false);
  const [showSaveAsFavorite, setShowSaveAsFavorite] = useState<boolean>(false);
  const [isConfirmLocationVisible, setIsConfirmLocationVisible] =
    useState<boolean>(false);

  const mapRef = useRef<MapView>(null);
  const bottomSheetRef = useRef<BottomSheet>(null);

  const snapPoints = useMemo(() => ['40%'], []);

  useEffect(() => {
    getCurrentLocation();
  }, []);

  const getCurrentLocation = () => {
    Geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        updateRegionAndFetchAddress(latitude, longitude);
      },
      (error) => {
        Alert.alert(
          'Error',
          'Unable to fetch location. Please enable location services.',
        );
      },
      { enableHighAccuracy: true },
    );
  };

  const updateRegionAndFetchAddress = (latitude: number, longitude: number) => {
    const newRegion = {
      latitude,
      longitude,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    };
    setRegion(newRegion);
    fetchAddressFromCoordinates(latitude, longitude);
    mapRef.current?.animateToRegion(newRegion, 1000);
    setIsConfirmLocationVisible(true); // Show confirm location button
    setShowSaveAsFavorite(false); // Hide save as favorite until confirmed
  };

  const fetchAddressFromCoordinates = async (
    latitude: number,
    longitude: number,
  ) => {
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=AIzaSyDbQiGGaZbyoqJzZ6Y7k1bfL0ENEAMsSVU`,
      );
      const data = await response.json();
      if (data.results && data.results.length > 0) {
        const location = data.results[0].formatted_address;
        setAddress(location);
        setSearchText(location);
      } else {
        setAddress('No nearby address found.');
      }
    } catch (error) {
      console.error('Error fetching address:', error);
    }
  };

  const fetchPredictions = async (input: string) => {
    if (input.trim() === '') {
      setPredictions([]);
      return;
    }

    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${input}&key=AIzaSyDbQiGGaZbyoqJzZ6Y7k1bfL0ENEAMsSVU`,
      );
      const data = await response.json();
      setPredictions(data.predictions || []);
    } catch (error) {
      console.error('Error fetching predictions:', error);
    }
  };

  const handleClearSearch = () => {
    setSearchText('');
    setPredictions([]);
  };

  const handleSelectPrediction = async (placeId: string) => {
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&key=AIzaSyDbQiGGaZbyoqJzZ6Y7k1bfL0ENEAMsSVU`,
      );
      const data = await response.json();
      const { lat, lng } = data.result.geometry.location;
      const locationAddress = data.result.formatted_address;

      updateRegionAndFetchAddress(lat, lng);
      setAddress(locationAddress);
      setSearchText(locationAddress);
      setPredictions([]);
    } catch (error) {
      console.error('Error selecting prediction:', error);
    }
  };

  const handleConfirmLocation = () => {
    setShowSaveAsFavorite(true);
    setIsConfirmLocationVisible(false);
    bottomSheetRef.current?.expand();
    navigation.navigate(Paths.SelectDestination);
  };

  const handleSave = () => {
    console.log('Saved Location:', {
      region,
      address,
    });
    bottomSheetRef.current?.close();
    setIsBottomSheetOpen(false);
  };

  return (
    <View style={styles.container}>
      {/* Search Field */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchBox}
          placeholder="Search for a location"
          value={searchText}
          onChangeText={(text) => {
            setSearchText(text);
            fetchPredictions(text);
          }}
        />
        {searchText.length > 0 && (
          <TouchableOpacity
            style={styles.clearButton}
            onPress={handleClearSearch}
          >
            <Text style={styles.clearButtonText}>X</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Autocomplete Dropdown */}
      {predictions.length > 0 && (
        <FlatList
          data={predictions}
          keyExtractor={(item) => item.place_id}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.predictionItem}
              onPress={() => handleSelectPrediction(item.place_id)}
            >
              <Text style={styles.predictionText}>{item.description}</Text>
            </TouchableOpacity>
          )}
          style={styles.predictionsList}
        />
      )}

      {/* Map */}
      <MapView
        ref={mapRef}
        style={styles.map}
        region={region}
        onPress={(e) => {
          const { latitude, longitude } = e.nativeEvent.coordinate;
          updateRegionAndFetchAddress(latitude, longitude);
        }}
        zoomEnabled={true}
      >
        <Marker coordinate={region} />
      </MapView>

      {/* Bottom Sheet */}
      <BottomSheet
        ref={bottomSheetRef}
        snapPoints={snapPoints}
        onChange={(index) => setIsBottomSheetOpen(index !== -1)}
      >
        <BottomSheetView style={styles.bottomSheetContent}>
          {showSaveAsFavorite ? (
            <>
              <Text style={styles.addressLabel}>Save as favorite</Text>
              <Text style={styles.address}>{address}</Text>
              <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                <Text style={styles.saveButtonText}>Save</Text>
              </TouchableOpacity>
            </>
          ) : (
            <Text style={styles.address}>
              Confirm your location to proceed.
            </Text>
          )}
        </BottomSheetView>
      </BottomSheet>

      {/* Confirm Button */}
      {isConfirmLocationVisible && (
        <TouchableOpacity
          style={styles.confirmButton}
          onPress={handleConfirmLocation}
        >
          <Text style={styles.buttonText}>Confirm Location</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  map: {
    flex: 1,
  },
  searchContainer: {
    position: 'absolute',
    top: 10,
    left: 10,
    right: 10,
    zIndex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  searchBox: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 10,
  },
  clearButton: {
    marginLeft: 10,
  },
  clearButtonText: {
    color: '#007BFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  predictionsList: {
    position: 'absolute',
    top: 60,
    left: 10,
    right: 10,
    zIndex: 2,
    backgroundColor: '#fff',
    borderRadius: 8,
    maxHeight: 200,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  predictionItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  predictionText: {
    fontSize: 16,
    color: '#007BFF',
  },
  bottomSheetContent: {
    padding: 20,
  },
  addressLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  address: {
    fontSize: 16,
    marginBottom: 20,
  },
  saveButton: {
    backgroundColor: '#007BFF',
    padding: 15,
    alignItems: 'center',
    borderRadius: 8,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  confirmButton: {
    backgroundColor: '#007BFF',
    padding: 15,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 15,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default PickupLocationScreen;

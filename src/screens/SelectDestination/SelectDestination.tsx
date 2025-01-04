import Geolocation from '@react-native-community/geolocation';
import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import MapView, { Marker, Region } from 'react-native-maps';

const GOOGLE_API_KEY = 'AIzaSyDbQiGGaZbyoqJzZ6Y7k1bfL0ENEAMsSVU'; // Replace with your Google API Key

function SelectDestination() {
  const [pickupLocation, setPickupLocation] = useState('');
  const [dropLocation, setDropLocation] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [address, setAddress] = useState<string>('Fetching your location...');
  const [searchText, setSearchText] = useState<string>('');
  const [isConfirmLocationVisible, setIsConfirmLocationVisible] =
    useState<boolean>(false);
  const [showSaveAsFavorite, setShowSaveAsFavorite] = useState<boolean>(false);

  const mapRef = useRef<MapView>(null);

  const [region, setRegion] = useState<Region>({
    latitude: 0,
    longitude: 0,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  });

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

  const fetchAddressFromCoords = async (latitude: any, longitude: any) => {
    try {
      setLoading(true);
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}key=AIzaSyDbQiGGaZbyoqJzZ6Y7k1bfL0ENEAMsSVU&types=geocode`,
      );
      console.log(response);
      const address =
        response.data.results[0]?.formatted_address || 'Unknown Location';
      setPickupLocation(address);
    } catch (error) {
      console.error('Error fetching address:', error);
    } finally {
      setLoading(false);
    }
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

  const fetchSuggestions = async (query: any) => {
    if (!query) {
      setSuggestions([]);
      return;
    }
    try {
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${query}&key=AIzaSyDbQiGGaZbyoqJzZ6Y7k1bfL0ENEAMsSVU&types=geocode`,
      );
      setSuggestions(response.data.predictions || []);
    } catch (error) {
      console.error('Error fetching suggestions:', error);
    }
  };

  const handleDropLocationChange = (text: string) => {
    setDropLocation(text);
    fetchSuggestions(text);
  };

  const handleSuggestionSelect = (place: any) => {
    setDropLocation(place.description);
    setSuggestions([]);
  };

  return (
    <View style={styles.container}>
      {/* Pickup Location Field */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Pickup Location</Text>
        <TextInput
          style={styles.input}
          value={pickupLocation}
          onChangeText={(text) => setPickupLocation(text)}
          placeholder="Enter pickup location"
        />
        {loading && <ActivityIndicator size="small" color="#000" />}

        {/* Drop Location Field */}
        <Text style={styles.label}>Drop Location</Text>
        <TextInput
          style={styles.input}
          value={dropLocation}
          onChangeText={handleDropLocationChange}
          placeholder="Enter drop location"
        />
      </View>

      {/* Suggestions List */}
      {suggestions.length > 0 && (
        <FlatList
          data={suggestions}
          keyExtractor={(item: any) => item.place_id}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.listItem}
              onPress={() => handleSuggestionSelect(item)}
            >
              <Text style={styles.suggestionText}>{item.description}</Text>
            </TouchableOpacity>
          )}
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  inputContainer: {
    marginBottom: 20,
    padding: 20,
  },
  map: {
    flex: 1,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  input: {
    backgroundColor: '#f1f1f1',
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#ddd',
    marginBottom: 10,
  },
  listItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  suggestionText: {
    fontSize: 16,
  },
});

export default SelectDestination;

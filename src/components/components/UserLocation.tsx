import React, { useEffect, useState } from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import { icons } from '@/constants';
import { useLocationStore } from '@/store';
import { GoogleInputProps } from '@/types/type';

const googlePlacesApiKey = process.env.EXPO_PUBLIC_PLACES_API_KEY;

interface GooglePlacePrediction {
  description: string;
  place_id: string;
}

const UserLocation: React.FC<GoogleInputProps> = ({
  icon,
  initialLocation,
  handlePress,
  textInputBackgroundColor,
}) => {
  const [query, setQuery] = useState('');
  const [predictions, setPredictions] = useState<GooglePlacePrediction[]>([]);
  const setDestinationLocation = useLocationStore(
    (state) => state.setDestinationLocation,
  );

  const fetchPlaces = async (inputValue: string) => {
    if (inputValue.length < 3) {
      setPredictions([]);
      return;
    }

    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${inputValue}&key=${googlePlacesApiKey}`,
      );
      const data = await response.json();
      setPredictions(data.predictions || []);
    } catch (error) {
      console.error('Error fetching places:', error);
    }
  };

  const fetchDetails = async (placeId: string) => {
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&key=${googlePlacesApiKey}`,
      );
      const data = await response.json();
      const location = data.result.geometry.location;
      handlePress({
        latitude: location.lat,
        longitude: location.lng,
        address: data.result.formatted_address,
      });
    } catch (error) {
      console.error('Error fetching place details:', error);
    }
  };

  useEffect(() => {
    fetchPlaces(query);
  }, [query]);

  const handleSelect = (prediction: GooglePlacePrediction) => {
    setQuery(prediction.description);
    fetchDetails(prediction.place_id);
    setPredictions([]);
  };

  const handleClear = () => {
    setQuery('');
    setPredictions([]);
    setDestinationLocation({
      latitude: null,
      longitude: null,
      address: null,
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <Image source={icons.point} style={styles.icon} resizeMode="cover" />
        <TextInput
          style={[
            styles.textInput,
            { backgroundColor: textInputBackgroundColor || 'white' },
          ]}
          placeholder={initialLocation || 'Where do you want to go?'}
          value={query}
          onChangeText={setQuery}
          clearButtonMode={'never'}
        />
        {query.length > 0 && (
          <TouchableOpacity onPress={handleClear} style={styles.clearButton}>
            <Text style={styles.clearButtonText}>×</Text>
          </TouchableOpacity>
        )}
      </View>
      {predictions.length > 0 && (
        <FlatList
          data={predictions}
          keyExtractor={(item) => item.place_id}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handleSelect(item)}>
              <View style={styles.option}>
                <Text>{item.description}</Text>
              </View>
            </TouchableOpacity>
          )}
          style={styles.predictionList}
        />
      )}
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    position: 'relative',
    zIndex: 50,
    borderRadius: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 20,
    marginHorizontal: 10,
    shadowColor: '#d4d4d4',
    elevation: 5,
    padding: 4,
  },
  textInput: {
    flex: 1,
    fontSize: 12,
    fontWeight: '600',
    paddingHorizontal: 12,
    borderRadius: 10,
    paddingVertical: 10,
  },
  icon: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  clearButton: {
    paddingHorizontal: 10,
  },
  clearButtonText: {
    fontSize: 18,
    color: '#888',
  },
  predictionList: {
    position: 'absolute',
    top: 50,
    left: 20,
    right: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    elevation: 3,
  },
  option: {
    padding: 10,
  },
});

export default UserLocation;

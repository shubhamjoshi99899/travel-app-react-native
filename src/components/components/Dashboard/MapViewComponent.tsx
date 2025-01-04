import React from 'react';
import { StyleSheet, View } from 'react-native';
import MapView from 'react-native-maps';

const MapViewComponent: React.FC = () => (
  <View style={styles.container}>
    <MapView
      style={styles.map}
      initialRegion={{
        latitude: 17.385044,
        longitude: 78.486671,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
      }}
    />
  </View>
);

const styles = StyleSheet.create({
  container: {
    height: 500,
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
  map: {
    flex: 1,
  },
});

export default MapViewComponent;

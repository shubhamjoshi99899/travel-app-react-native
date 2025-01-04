import polyline from '@mapbox/polyline';
import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MapView, { Marker, Polyline, PROVIDER_GOOGLE } from 'react-native-maps';

import { useLocationStore } from '@/store';

const googleDirectionsApiKey = process.env.EXPO_PUBLIC_DIRECTIONS_API_KEY;

const Map = () => {
  const {
    userLatitude,
    userLongitude,
    destinationLatitude,
    destinationLongitude,
  } = useLocationStore();

  const [routeCoordinates, setRouteCoordinates] = useState([]);
  const [distance, setDistance] = useState('');
  const [duration, setDuration] = useState('');
  const [nearbyLandmarks, setNearbyLandmarks] = useState([]);
  const mapRef = useRef<MapView>(null);

  const fetchRoute = async () => {
    if (
      !userLatitude ||
      !userLongitude ||
      !destinationLatitude ||
      !destinationLongitude
    )
      return;

    const url = `https://maps.googleapis.com/maps/api/directions/json?origin=${userLatitude},${userLongitude}&destination=${destinationLatitude},${destinationLongitude}&key=${googleDirectionsApiKey}`;
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);

    if (data.routes.length) {
      const points = polyline.decode(data.routes[0].overview_polyline.points);
      const coordinates = points.map((point) => ({
        latitude: point[0],
        longitude: point[1],
      }));
      setRouteCoordinates(coordinates as any);

      const route = data.routes[0].legs[0];
      setDistance(route.distance.text);
      setDuration(route.duration.text);

      mapRef.current?.fitToCoordinates(coordinates, {
        edgePadding: { top: 20, right: 50, bottom: 450, left: 50 },
      });
    }
  };

  const fetchNearbyLandmarks = async () => {
    if (!userLatitude || !userLongitude) return;

    const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${userLatitude},${userLongitude}&radius=1000&key=${googleDirectionsApiKey}`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      if (data.results) {
        setNearbyLandmarks(
          data.results.map((place: any) => ({
            id: place.place_id,
            name: place.name,
            latitude: place.geometry.location.lat,
            longitude: place.geometry.location.lng,
          })),
        );
      }
    } catch (error) {
      console.error('Error fetching landmarks:', error);
    }
  };

  useEffect(() => {
    fetchRoute();
    fetchNearbyLandmarks();
  }, [userLatitude, userLongitude, destinationLatitude, destinationLongitude]);

  return (
    <View style={styles.container}>
      {userLatitude && userLongitude ? (
        <MapView
          ref={mapRef}
          provider={PROVIDER_GOOGLE}
          style={StyleSheet.absoluteFillObject}
          mapType="standard"
          initialRegion={{
            latitude: userLatitude!,
            longitude: userLongitude!,
            latitudeDelta:
              destinationLatitude && destinationLongitude ? 0.0922 : 0.01,
            longitudeDelta:
              destinationLatitude && destinationLongitude ? 0.0421 : 0.01,
          }}
          showsUserLocation={true}
          showsMyLocationButton={true}
          showsCompass={true}
          zoomEnabled={true}
        >
          {userLatitude && userLongitude && (
            <Marker
              coordinate={{ latitude: userLatitude, longitude: userLongitude }}
              title="Your Location"
              pinColor="red"
            />
          )}
          {destinationLatitude && destinationLongitude && (
            <Marker
              coordinate={{
                latitude: destinationLatitude,
                longitude: destinationLongitude,
              }}
              title="Destination"
              pinColor="green"
            />
          )}
          {routeCoordinates.length > 0 &&
            destinationLatitude &&
            destinationLongitude && (
              <Polyline
                coordinates={routeCoordinates}
                strokeColor="#000"
                strokeWidth={3}
              />
            )}
        </MapView>
      ) : (
        <View>
          <Text>Loading....</Text>
        </View>
      )}
      {destinationLatitude && destinationLongitude && distance && duration && (
        <View style={styles.infoContainer}>
          <Text style={styles.infoText}>Distance: {distance}</Text>
          <Text style={styles.infoText}>ETA: {duration}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  infoContainer: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 4,
  },
  infoText: {
    fontSize: 16,
    color: '#333',
  },
});

export default Map;

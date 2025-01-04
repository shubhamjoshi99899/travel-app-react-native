import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import RideCard from './OldRidesCard';

// Main App
const OlderRidesList: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Old Rides</Text>

      <RideCard
        name="Nikolas Mcpherson"
        rating={4.5}
        date="31/01/2023"
        tripType="Round Trip"
        pickup="Bus Sta Upas, Majestic, Bengaluru, Karnataka"
        drop="M.G. Railway Colony, Majestic, Bengaluru, Karnataka"
        price={1529}
        distance={15.36}
        duration="3h 50m"
      />
      <RideCard
        name="Nikolas Mcpherson"
        rating={4.5}
        date="31/01/2023"
        tripType="Round Trip"
        pickup="Bus Sta Upas, Majestic, Bengaluru, Karnataka"
        drop="M.G. Railway Colony, Majestic, Bengaluru, Karnataka"
        price={1529}
        distance={15.36}
        duration="3h 50m"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    fontSize: 14,
    color: '#000',
    fontWeight: '600',
    marginBottom: 8,
  },
  container: {
    marginBottom: 100,
  },
});

export default OlderRidesList;

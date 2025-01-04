import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface RideType {
  name: string;
  icon: string;
}

const rideTypes: RideType[] = [
  { name: 'One Way', icon: 'road' },
  { name: 'Round Trip', icon: 'repeat' },
  { name: 'Outstation', icon: 'map-marker' },
  { name: 'Flexi', icon: 'clock' },
  { name: 'Monthly', icon: 'calendar' },
  { name: 'Valet Parking', icon: 'car' },
];

const RideTypeSelector: React.FC = () => {
  return (
    <View style={styles.container}>
      {rideTypes.map((type, index) => (
        <TouchableOpacity key={index} style={styles.button}>
          <Text style={styles.text}>{type.name}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginVertical: 16,
  },
  button: {
    width: '30%',
    paddingVertical: 12,
    marginVertical: 8,
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    alignItems: 'center',
  },
  text: {
    fontSize: 14,
    color: '#333',
  },
});

export default RideTypeSelector;

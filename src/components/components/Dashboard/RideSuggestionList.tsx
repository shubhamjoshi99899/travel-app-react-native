// RideSuggestionList.tsx
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

type RideSuggestion = {
  from: string;
  to: string;
  type: string;
  duration: string;
  price: string;
};

type RideSuggestionListProps = {
  suggestions: RideSuggestion[];
};

const RideSuggestionList: React.FC<RideSuggestionListProps> = ({
  suggestions,
}) => (
  <View style={styles.container}>
    <Text style={styles.title}>Ride Suggestions</Text>
    {suggestions.map((ride, index) => (
      <TouchableOpacity key={index} style={styles.card}>
        <Text style={styles.text}>
          {ride.from} ➔ {ride.to}
        </Text>
        <Text style={styles.details}>
          {ride.type} • {ride.duration} • {ride.price}
        </Text>
      </TouchableOpacity>
    ))}
  </View>
);

const styles = StyleSheet.create({
  container: {
    marginVertical: 16,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  card: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  text: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  details: {
    fontSize: 12,
    color: '#555',
    marginTop: 4,
  },
});

export default RideSuggestionList;

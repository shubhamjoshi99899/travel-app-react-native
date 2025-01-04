import React from 'react';
import {
  Image,
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

// TypeScript Interface for Props
interface RideCardProps {
  name: string;
  rating: number;
  date: string;
  tripType: string;
  pickup: string;
  drop: string;
  price: number;
  distance: number;
  duration: string;
  style?: StyleProp<ViewStyle>; // Optional custom style prop
}

const RideCard: React.FC<RideCardProps> = ({
  name,
  rating,
  date,
  tripType,
  pickup,
  drop,
  price,
  distance,
  duration,
  style,
}) => {
  return (
    <View style={[styles.card, style]}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.profileSection}>
          <Image
            source={{
              uri: 'https://t4.ftcdn.net/jpg/03/64/21/11/360_F_364211147_1qgLVxv1Tcq0Ohz3FawUfrtONzz8nq3e.jpg',
            }} // Replace with profile image URL
            style={styles.profileImage}
          />
          <View style={styles.userInfo}>
            <Text style={styles.name}>{name}</Text>
            <View style={styles.rating}>
              <Icon name="star" size={16} color="#FFD700" />
              <Text style={styles.ratingText}>{rating}</Text>
            </View>
          </View>
        </View>
        <View style={styles.tripInfo}>
          <Text style={styles.date}>{date}</Text>
          <View style={styles.tripType}>
            <Icon name="directions-bike" size={16} color="#000" />
            <Text style={styles.tripTypeText}>{tripType}</Text>
          </View>
        </View>
      </View>

      {/* Locations */}
      <View style={styles.locations}>
        <View style={styles.location}>
          <Icon name="circle" size={12} color="green" />
          <Text style={styles.locationText} numberOfLines={1}>
            {pickup}
          </Text>
        </View>
        <View style={styles.location}>
          <Icon name="circle" size={12} color="red" />
          <Text style={styles.locationText} numberOfLines={1}>
            {drop}
          </Text>
        </View>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.price}>₹{price}</Text>
        <Text style={styles.distance}>{distance} km</Text>
        <Text style={styles.duration}>{duration}</Text>
      </View>

      {/* Repeat Ride Button */}
      <TouchableOpacity style={styles.repeatButton}>
        <Text style={styles.repeatButtonText}>Repeat Ride</Text>
      </TouchableOpacity>
    </View>
  );
};

export default RideCard;
// Styles
const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 16,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  userInfo: {
    marginLeft: 8,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  ratingText: {
    marginLeft: 4,
    fontSize: 14,
    color: '#555',
  },
  tripInfo: {
    alignItems: 'flex-end',
  },
  date: {
    fontSize: 14,
    color: '#777',
  },
  tripType: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  tripTypeText: {
    marginLeft: 4,
    fontSize: 14,
    color: '#555',
  },
  locations: {
    marginBottom: 16,
  },
  location: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 4,
  },
  locationText: {
    marginLeft: 8,
    fontSize: 14,
    color: '#333',
    flex: 1,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  distance: {
    fontSize: 14,
    color: '#555',
  },
  duration: {
    fontSize: 14,
    color: '#555',
  },
  repeatButton: {
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
    paddingVertical: 8,
    alignItems: 'center',
  },
  repeatButtonText: {
    fontSize: 16,
    color: '#007BFF',
    fontWeight: 'bold',
  },
});

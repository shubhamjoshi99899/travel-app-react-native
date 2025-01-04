import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { icons } from '@/constants';
import { formatTime } from '@/lib/utils';
import { DriverCardProps } from '@/types/type';

const DriverCard = ({ item, selected, setSelected }: DriverCardProps) => {
  return (
    <TouchableOpacity
      onPress={setSelected}
      style={[
        styles.cardContainer,
        selected === item.id ? styles.selectedCard : styles.defaultCard,
      ]}
    >
      <Image
        source={{ uri: item.profile_image_url }}
        style={styles.profileImage}
      />

      <View style={styles.infoContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.titleText}>{item.title}</Text>

          <View style={styles.ratingContainer}>
            <Image source={icons.star} style={styles.ratingIcon} />
            <Text style={styles.ratingText}>{item.rating}</Text>
          </View>
        </View>

        <View style={styles.detailsContainer}>
          <View style={styles.priceContainer}>
            <Image source={icons.dollar} style={styles.priceIcon} />
            <Text style={styles.priceText}>${item.price}</Text>
          </View>

          <Text style={styles.separator}>|</Text>
          {/* <Text style={styles.timeText}>{formatTime(item.time!)}</Text> */}

          <Text style={styles.separator}>|</Text>
          <Text style={styles.seatsText}>{item.car_seats} seats</Text>
        </View>
      </View>
      <View>
        <Text style={styles.seatsText}>{item.time} </Text>

        <Image
          source={{ uri: item.car_image_url }}
          style={styles.carImage}
          resizeMode="contain"
        />
      </View>
    </TouchableOpacity>
  );
};

// Define styles using StyleSheet
const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 12,
    borderRadius: 16,
    marginVertical: 8, // Added margin for separation between cards
    elevation: 2, // Shadow for Android
    shadowColor: '#000', // Shadow for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  selectedCard: {
    backgroundColor: '#FFFDE7',
  },
  defaultCard: {
    backgroundColor: '#FFFFFF',
  },
  profileImage: {
    width: 56,
    height: 56,
    borderRadius: 28,
  },
  infoContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
    marginHorizontal: 12,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginBottom: 4,
  },
  titleText: {
    fontSize: 18,
    fontFamily: 'JakartaBold', // Changed to bold font for emphasis
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 8,
  },
  ratingIcon: {
    width: 14,
    height: 14,
  },
  ratingText: {
    fontSize: 14,
    fontFamily: 'JakartaRegular',
    color: '#FFD700', // Gold color for star rating
  },
  detailsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginTop: 4, // Added margin for spacing
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  priceIcon: {
    width: 16,
    height: 16,
  },
  priceText: {
    fontSize: 14, // Increased font size
    fontFamily: 'JakartaRegular',
    marginLeft: 4,
  },
  separator: {
    fontSize: 14, // Increased font size
    fontFamily: 'JakartaRegular',
    color: '#4B6F88',
    marginHorizontal: 4,
  },
  timeText: {
    fontSize: 14, // Increased font size
    fontFamily: 'JakartaRegular',
    color: '#4B6F88',
  },
  seatsText: {
    fontSize: 14, // Increased font size
    fontFamily: 'JakartaRegular',
    color: '#4B6F88',
  },
  carImage: {
    height: 56,
    width: 56,
    borderRadius: 100,
  },
});

export default DriverCard;

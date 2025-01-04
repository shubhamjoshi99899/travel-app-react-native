import { Image, StyleSheet, Text, View } from 'react-native';

import { icons } from '@/constants';
import { formatDate, formatTime } from '@/lib/utils';
import { Ride } from '@/types/type';

const RideCard = ({ ride }: { ride: Ride }) => {
  return (
    <View style={styles.cardContainer}>
      <View style={styles.innerContainer}>
        <View style={styles.headerContainer}>
          <Image
            source={{
              uri: `https://maps.geoapify.com/v1/staticmap?style=osm-bright&width=600&height=400&center=lonlat:${ride.destination_longitude},${ride.destination_latitude}&zoom=14&apiKey=${process.env.EXPO_PUBLIC_GEOAPIFY_API_KEY}`,
            }}
            style={styles.mapImage}
          />

          <View style={styles.addressContainer}>
            <View style={styles.addressRow}>
              <Image source={icons.to} style={styles.icon} />
              <Text style={styles.addressText} numberOfLines={1}>
                {ride.origin_address}
              </Text>
            </View>

            <View style={styles.addressRow}>
              <Image source={icons.point} style={styles.icon} />
              <Text style={styles.addressText} numberOfLines={1}>
                {ride.destination_address}
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.detailsContainer}>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Date & Time</Text>
            <Text style={styles.detailValue} numberOfLines={1}>
              {formatDate(ride.created_at)}, {formatTime(ride.ride_time)}
            </Text>
          </View>

          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Driver</Text>
            <Text style={styles.detailValue}>
              {ride.driver.first_name} {ride.driver.last_name}
            </Text>
          </View>

          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Car Seats</Text>
            <Text style={styles.detailValue}>{ride.driver.car_seats}</Text>
          </View>

          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Payment Status</Text>
            <Text
              style={[
                styles.detailValue,
                ride.payment_status === 'paid'
                  ? styles.paidStatus
                  : styles.unpaidStatus,
              ]}
            >
              {ride.payment_status}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
    marginBottom: 12,
  },
  innerContainer: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
    padding: 12,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  mapImage: {
    width: 80,
    height: 90,
    borderRadius: 10,
  },
  addressContainer: {
    flexDirection: 'column',
    marginHorizontal: 15,
    gap: 10,
    flex: 1,
  },
  addressRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    width: 20,
    height: 20,
  },
  addressText: {
    fontSize: 16,
    fontFamily: 'JakartaMedium',
  },
  detailsContainer: {
    flexDirection: 'column',
    width: '100%',
    marginTop: 10,
    backgroundColor: '#F0F9FF', // Assuming this is the same as `bg-general-500`
    borderRadius: 10,
    padding: 12,
    alignItems: 'flex-start',
  },
  detailRow: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  detailLabel: {
    fontSize: 16,
    fontFamily: 'JakartaMedium',
    color: '#6B7280', // Similar to `text-gray-500`
  },
  detailValue: {
    fontSize: 16,
    fontFamily: 'JakartaBold',
  },
  paidStatus: {
    color: '#10B981', // Green for paid
  },
  unpaidStatus: {
    color: '#EF4444', // Red for unpaid
  },
});

export default RideCard;

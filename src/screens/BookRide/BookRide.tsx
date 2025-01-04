import { StripeProvider } from '@stripe/stripe-react-native';
import { ActivityIndicator, Image, StyleSheet, Text, View } from 'react-native';

import { Paths } from '@/navigation/paths';
import { RootScreenProps } from '@/navigation/types';

import CustomButton from '@/components/components/CustomButton';
import RideLayout from '@/components/components/RideLayout';
import { icons } from '@/constants';
import { formatTime } from '@/lib/utils';
import { useDriverStore, useLocationStore } from '@/store';

function ConfirmRide({ navigation }: RootScreenProps<Paths.ConfirmRide>) {
  const { userAddress, destinationAddress } = useLocationStore();

  const driverDetails = {
    latitude: 34.0522,
    longitude: -118.2437,
    id: 1,
    title: "John's Car",
    profile_image_url:
      'https://img.freepik.com/free-photo/man-car-driving_23-2148889981.jpg',
    car_image_url:
      'https://imgd.aeplcdn.com/1056x594/n/itk98db_1738093.jpg?q=80',
    car_seats: 4,
    rating: 4.5,
    first_name: 'John',
    last_name: 'Doe',
    time: 1627593600, // Unix timestamp
    price: '$20',
  };

  if (!driverDetails) {
    return (
      <RideLayout title="Book Ride">
        <View style={styles.centered}>
          <Text style={styles.errorText}>Driver not found.</Text>
        </View>
      </RideLayout>
    );
  }

  const handleNavigation = () => {
    navigation.navigate(Paths.RiderDetails);
  };

  return (
    // <StripeProvider
    //   publishableKey={process.env.EXPO_PUBLIC_STRIPE_PUBLISHABLE_KEY!}
    //   merchantIdentifier="merchant.com.uber"
    //   urlScheme="myapp"
    // >
    // {/* <View style={styles.container}> */}
    <RideLayout title="Book Ride" snapPoints={['65%', '85%']}>
      <>
        <Text style={styles.title}>Ride Information</Text>

        <View style={styles.driverInfoContainer}>
          <Image
            source={{ uri: driverDetails?.profile_image_url }}
            style={styles.profileImage}
          />

          <View style={styles.driverDetails}>
            <Text style={styles.driverName}>{driverDetails.title}</Text>

            <View style={styles.ratingContainer}>
              <Image
                source={icons.star}
                style={styles.ratingIcon}
                resizeMode="contain"
              />
              <Text style={styles.ratingText}>{driverDetails.rating}</Text>
            </View>
          </View>
        </View>

        <View style={styles.rideInfoContainer}>
          <View style={styles.infoRow}>
            <Text style={styles.infoText}>Ride Price</Text>
            <Text style={[styles.infoText, styles.priceText]}>
              ${driverDetails.price}
            </Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.infoText}>Pickup Time</Text>
            <Text style={styles.infoText}>
              {formatTime(driverDetails.time!)}
            </Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.infoText}>Car Seats</Text>
            <Text style={styles.infoText}>{driverDetails.car_seats}</Text>
          </View>
        </View>

        <View style={styles.addressContainer}>
          <View style={styles.addressRow}>
            <Image source={icons.to} style={styles.addressIcon} />
            <Text style={styles.addressText}>{userAddress}</Text>
          </View>

          <View style={styles.addressRow}>
            <Image source={icons.point} style={styles.addressIcon} />
            <Text style={styles.addressText}>{destinationAddress}</Text>
          </View>
        </View>

        {/* <Payment
          // fullName={user?.fullName!}
          // email={user?.emailAddresses[0]?.emailAddress!}
          fullName="Shubham"
          email="shubham@gmail.com"
          amount={driverDetails.price!}
          driverId={driverDetails.id}
          rideTime={driverDetails.time!}
        /> */}
        <CustomButton title="Select Ride" onPress={() => handleNavigation()} />
      </>
    </RideLayout>
    // {/* </View> */}
    // </StripeProvider>
  );
}

// Stylesheet
const styles = StyleSheet.create({
  // container: {
  //   marginBottom: 2,
  // },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 18,
    fontFamily: 'JakartaRegular',
  },
  title: {
    fontSize: 20,
    fontFamily: 'JakartaSemiBold',
    marginBottom: 12,
  },
  driverInfoContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
  },
  profileImage: {
    width: 112,
    height: 112,
    borderRadius: 56,
  },
  driverDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    marginHorizontal: 10,
  },
  driverName: {
    fontSize: 18,
    fontFamily: 'JakartaSemiBold',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 8,
  },
  ratingIcon: {
    width: 20,
    height: 20,
  },
  ratingText: {
    fontSize: 18,
    fontFamily: 'JakartaRegular',
  },
  rideInfoContainer: {
    flexDirection: 'column',
    width: '100%',
    backgroundColor: '#4A4A4A', // Replace with your color
    borderRadius: 24,
    padding: 20,
    marginTop: 20,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#fff',
    paddingVertical: 12,
  },
  infoText: {
    fontSize: 18,
    fontFamily: 'JakartaRegular',
    color: '#fff', // Adjust as needed
  },
  priceText: {
    color: '#0CC25F',
  },
  addressContainer: {
    flexDirection: 'column',
    width: '100%',
    marginTop: 20,
    marginBottom: 10,
  },
  addressRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#A9A9A9',
    paddingVertical: 12,
  },
  addressIcon: {
    width: 24,
    height: 24,
  },
  addressText: {
    fontSize: 12,
    fontFamily: 'JakartaRegular',
    marginLeft: 8,
  },
});

export default ConfirmRide;

import { FlatList, StyleSheet, View } from 'react-native';

import { Paths } from '@/navigation/paths';
import { RootScreenProps } from '@/navigation/types';

import CustomButton from '@/components/components/CustomButton';
import DriverCard from '@/components/components/DriverCard';
import RideLayout from '@/components/components/RideLayout';
import { useDriverStore } from '@/store';
import { MarkerData } from '@/types/type';

const markerDataArray: MarkerData[] = [
  {
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
    time: '10:00', // Unix timestamp
    price: '$20',
  },
  {
    latitude: 36.1699,
    longitude: -115.1398,
    id: 2,
    title: "Jane's Ride",
    profile_image_url:
      'https://indian-drivers.com/wp-content/uploads/2024/05/Rectangle-13.png',
    car_image_url:
      'https://imgd.aeplcdn.com/1056x594/n/itk98db_1738093.jpg?q=80',
    car_seats: 5,
    rating: 4.8,
    first_name: 'Jane',
    last_name: 'Smith',
    time: '10:30', // Unix timestamp
    price: '$25',
  },
];

function SelectRide({ navigation }: RootScreenProps<Paths.SelectRide>) {
  const { drivers, selectedDriver, setSelectedDriver } = useDriverStore();

  const handleNavigation = () => {
    navigation.navigate(Paths.SelectSeat);
  };
  return (
    <RideLayout title={'Choose a Rider'} snapPoints={['65%', '85%']}>
      <FlatList
        data={markerDataArray}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <DriverCard
            item={item}
            selected={selectedDriver!}
            setSelected={() => setSelectedDriver(item.id!)}
          />
        )}
        ListFooterComponent={() => (
          <View style={styles.footerContainer}>
            <CustomButton
              title="Select Ride"
              onPress={() => handleNavigation()}
            />
          </View>
        )}
      />
    </RideLayout>
  );
}

// Define styles using StyleSheet
const styles = StyleSheet.create({
  footerContainer: {
    marginHorizontal: 20, // Equivalent to 'mx-5'
    marginTop: 10, // Equivalent to 'mt-10'
  },
});

export default SelectRide;

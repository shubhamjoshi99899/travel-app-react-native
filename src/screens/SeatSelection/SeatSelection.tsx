import { StyleSheet, Text, View } from 'react-native';

import { Paths } from '@/navigation/paths';
import { RootScreenProps } from '@/navigation/types';

import CarSeatPicker from '@/components/components/CarSeatPicker';
import CustomButton from '@/components/components/CustomButton';
import RideLayout from '@/components/components/RideLayout';

function SelectSeat({ navigation }: RootScreenProps<Paths.SelectSeat>) {
  const handleNavigation = () => {
    navigation.navigate(Paths.SelectPreference);
  };
  return (
    <RideLayout title="Ride" snapPoints={['65%', '85%']}>
      <View style={styles.container}>
        <Text style={styles.label}>Select Seat</Text>
        <View style={styles.inputContainer}>
          <CarSeatPicker seatConfig={6} />
        </View>
        <CustomButton
          style={styles.button}
          title="Select Seat"
          onPress={() => handleNavigation()}
        />
      </View>
    </RideLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
  },
  label: {
    fontSize: 18,
    fontFamily: 'JakartaSemiBold', // Ensure that this font is available in your project
    marginBottom: 2,
    textAlign: 'center',
  },
  inputContainer: {
    marginBottom: 4,
  },
  button: {
    backgroundColor: '#007AFF', // Use the color code provided by the design team
    padding: 12,
    marginHorizontal: 20,
    width: '85%',
  },
});

export default SelectSeat;

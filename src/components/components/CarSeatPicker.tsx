import React, { useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { icons } from '@/constants';

const CarWithSeats = ({ seatConfig = 4 }) => {
  const [selectedSeat, setSelectedSeat] = useState(null);

  const handleSeatSelection = (seat: any) => {
    setSelectedSeat(seat);
    console.log(`Seat ${seat} selected`);
  };

  return (
    <View style={styles.container}>
      <View style={styles.car}>
        {/* Driver Seat */}
        <TouchableOpacity
          style={[
            styles.seat,
            styles.driverSeat,
            selectedSeat === 'Driver' && styles.selectedSeat,
          ]}
          onPress={() => handleSeatSelection('Driver')}
        >
          <Image source={icons.driver} style={styles.icon} resizeMode="cover" />
          <Text style={styles.seatLabel}>Driver</Text>
        </TouchableOpacity>

        {/* Front Passenger Seat */}
        <TouchableOpacity
          style={[
            styles.seat,
            styles.frontSeat,
            selectedSeat === 'Passenger' && styles.selectedSeat,
          ]}
          onPress={() => handleSeatSelection('Passenger')}
        >
          <Image source={icons.seat} style={styles.icon} resizeMode="contain" />
          <Text style={styles.seatLabel}>Passenger</Text>
        </TouchableOpacity>

        {/* Rear Seats */}
        <View style={styles.rearSeats}>
          {['RearLeft', 'RearMiddle', 'RearRight'].map((seat) => (
            <TouchableOpacity
              key={seat}
              style={[
                styles.seat,
                selectedSeat === seat && styles.selectedSeat,
              ]}
              onPress={() => handleSeatSelection(seat)}
            >
              <Image
                source={icons.seat}
                style={styles.icon}
                resizeMode="cover"
              />

              <Text style={styles.seatLabel}>{seat.replace('Rear', '')}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Extra Seats for 6-seater configuration */}
        {seatConfig === 6 && (
          <View style={styles.extraSeats}>
            {['ExtraLeft', 'ExtraRight'].map((seat) => (
              <TouchableOpacity
                key={seat}
                style={[
                  styles.seat,
                  selectedSeat === seat && styles.selectedSeat,
                ]}
                onPress={() => handleSeatSelection(seat)}
              >
                <Image
                  source={icons.seat}
                  style={styles.icon}
                  resizeMode="cover"
                />

                <Text style={styles.seatLabel}>
                  {seat.replace('Extra', '')}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 10,
  },
  car: {
    width: 300,
    height: 400,
    borderWidth: 2,
    borderColor: '#000',
    borderRadius: 20,
    backgroundColor: '#d3d3d3',
    position: 'relative',
    padding: 10,
  },
  seat: {
    width: 80,
    height: 80,
    backgroundColor: '#fff',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
    borderWidth: 1,
    borderColor: '#000',
  },
  imageContainer: {
    textAlign: 'center',
  },
  icon: {
    width: 24,
    height: 24,
    color: 'green',
    textAlign: 'center',
  },
  selectedSeat: {
    backgroundColor: '#FFFDE7',
  },
  seatLabel: {
    fontSize: 10,
    marginTop: 2,
    color: '#000',
  },
  driverSeat: {
    position: 'absolute',
    top: 20,
    right: 20,
  },
  frontSeat: {
    position: 'absolute',
    top: 20,
    left: 20,
  },
  rearSeats: {
    position: 'absolute',
    top: 120,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 16,
  },
  extraSeats: {
    position: 'absolute',
    top: 220,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 20,
  },
});

export default CarWithSeats;

import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

// types.ts
export interface RideOption {
  type: string; // e.g., "Economy", "Luxury"
  price: number;
  eta: number; // Estimated time of arrival in minutes
  promoAvailable: boolean;
  icon: any; // Icon source, e.g., an imported image or an icon path
}

interface RideOptionsCardProps {
  rideOption: RideOption;
  onSelect: (option: RideOption) => void;
}

const RideOptionsCard: React.FC<RideOptionsCardProps> = ({
  rideOption,
  onSelect,
}) => {
  return (
    <TouchableOpacity
      style={styles.cardContainer}
      onPress={() => onSelect(rideOption)}
    >
      <View style={styles.row}>
        <Image source={rideOption.icon} style={styles.icon} />
        <View style={styles.details}>
          <Text style={styles.rideType}>{rideOption.type}</Text>
          <Text style={styles.price}>${rideOption.price}</Text>
        </View>
      </View>

      <View style={styles.optionsRow}>
        {rideOption.promoAvailable && (
          <TouchableOpacity style={styles.promoButton}>
            <Text style={styles.promoText}>Apply Promo</Text>
          </TouchableOpacity>
        )}
        <Text style={styles.etaText}>ETA: {rideOption.eta} mins</Text>
      </View>
    </TouchableOpacity>
  );
};

export default RideOptionsCard;

const styles = StyleSheet.create({
  cardContainer: {
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#fff',
    marginVertical: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    width: 40,
    height: 40,
    marginRight: 15,
  },
  details: {
    flex: 1,
  },
  rideType: {
    fontSize: 16,
    fontWeight: '600',
  },
  price: {
    fontSize: 14,
    color: '#888',
    marginTop: 4,
  },
  optionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 15,
  },
  promoButton: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    backgroundColor: '#FFD700',
    borderRadius: 5,
  },
  promoText: {
    fontSize: 12,
    color: '#fff',
    fontWeight: '500',
  },
  etaText: {
    fontSize: 12,
    color: '#888',
  },
});

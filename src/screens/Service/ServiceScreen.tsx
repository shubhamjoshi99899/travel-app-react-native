import React from 'react';
import {
  GestureResponderEvent,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { icons, images } from '@/constants';

// Define types for the service items and sections
interface ServiceItem {
  name: string;
  icon: any; // You can use 'ImageSourcePropType' for better typing
  isPromo?: boolean;
}

interface ServiceSection {
  title: string;
  items: ServiceItem[];
}

// Sample data
const servicesData: ServiceSection[] = [
  {
    title: 'Go anywhere, get anything',
    items: [
      //   { name: 'Moto', icon: images.car, isPromo: true },
      { name: 'Luxury', icon: images.suv, isPromo: true },
      { name: 'Reserve', icon: images.economy, isPromo: true },
      //   { name: 'Uber Auto', icon: images.car },
      { name: 'Marriage rentals', icon: images.wedding },
      { name: 'Intercity', icon: images.intercity },
      //   { name: 'Shuttle', icon: images.car },
    ],
  },
  {
    title: 'Get anything done',
    items: [
      { name: 'Courier', icon: images.delivery },
      { name: 'Store pick up', icon: images.storepickup },
    ],
  },
];

const ServicesScreen: React.FC = () => {
  const renderServiceSection = (section: ServiceSection, columns: number) => {
    const cardWidth = columns === 3 ? '30%' : '45%';

    return (
      <View style={styles.section} key={section.title}>
        <Text style={styles.sectionTitle}>{section.title}</Text>
        <View style={styles.row}>
          {section.items.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={[styles.card, { width: cardWidth }]}
              onPress={(event: GestureResponderEvent) =>
                console.log(`${item.name} clicked!`, event)
              }
            >
              {item.isPromo && <Text style={styles.promoBadge}>Promo</Text>}
              <Image source={item.icon} style={styles.icon} />
              <Text style={styles.cardText}>{item.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    );
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Services</Text>
      {servicesData.map((section, index) =>
        renderServiceSection(
          section,
          section.title === 'Go anywhere, get anything' ? 2 : 2,
        ),
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#fff',
    padding: 16,
    marginBottom: 100,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap', // Wrap the cards to the next line if they exceed the screen width
    justifyContent: 'space-between', // Maintain spacing between cards
    marginBottom: 8,
  },
  card: {
    alignItems: 'center',
    justifyContent: 'center',
    margin: 8,
    padding: 16,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    width: '30%', // Ensure the cards are consistently sized for 3 columns
  },
  icon: {
    width: 120,
    height: 120,
    marginBottom: 8,
    resizeMode: 'contain',
  },
  cardText: {
    fontSize: 14,
    textAlign: 'center',
  },
  promoBadge: {
    position: 'absolute',
    top: -5,
    left: -5,
    backgroundColor: '#4CAF50',
    color: '#fff',
    paddingHorizontal: 6,
    paddingVertical: 2,
    fontSize: 10,
    borderRadius: 4,
    overflow: 'hidden',
  },
});

export default ServicesScreen;

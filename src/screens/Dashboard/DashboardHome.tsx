import React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import MapView, { Circle } from 'react-native-maps';
import Icon from 'react-native-vector-icons/Ionicons';

import { Paths } from '@/navigation/paths';
import { RootScreenProps } from '@/navigation/types';

// function DashboardHomeScreen({
//   navigation,
// }: RootScreenProps<Paths.DashboardHome>) {
function DashboardHomeScreen() {
  return (
    <View style={styles.container}>
      {/* Map View */}
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 23.78825,
          longitude: 87.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        <Circle
          center={{ latitude: 37.78825, longitude: -122.4324 }}
          radius={300}
          strokeColor="rgba(255, 179, 0, 0.5)"
          fillColor="rgba(255, 179, 0, 0.2)"
        />
      </MapView>

      {/* User Profile Picture */}
      <View style={styles.profileContainer}>
        <Image
          source={{ uri: 'https://via.placeholder.com/150' }} // Replace with the actual profile image
          style={styles.profileImage}
        />
      </View>

      {/* Top Menu Icons */}
      <View style={styles.topMenu}>
        <TouchableOpacity>
          <Icon name="search-outline" size={28} color="#FFA500" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Icon name="notifications-outline" size={28} color="#FFA500" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Icon name="settings-outline" size={28} color="#FFA500" />
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <View style={styles.searchBar}>
        <TextInput placeholder="Where would you go?" style={styles.input} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { flex: 1 },
  profileContainer: {
    position: 'absolute',
    top: '40%',
    left: '50%',
    transform: [{ translateX: -25 }, { translateY: -25 }],
    zIndex: 1,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: '#FFF',
  },
  topMenu: {
    position: 'absolute',
    top: 50,
    left: 20,
    right: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    zIndex: 1,
  },
  quickAccess: {
    position: 'absolute',
    bottom: 180,
    left: 20,
    right: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  quickButton: {
    backgroundColor: '#FFF',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: '#FFA500',
  },
  quickText: { color: '#FFA500', fontSize: 14 },
  locateButton: {
    backgroundColor: '#FFA500',
    borderRadius: 25,
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchBar: {
    position: 'absolute',
    bottom: 120,
    left: 20,
    right: 20,
    backgroundColor: '#FFF',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  input: { fontSize: 16, color: '#A5A5A5' },
  bottomNavigation: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#FFF',
    paddingVertical: 10,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  navText: { fontSize: 12, color: '#A5A5A5', textAlign: 'center' },
});

export default DashboardHomeScreen;

import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const SettingsScreen = () => {
  // Define menu items
  const menuItems = [
    { id: 1, icon: '★', label: 'Ratings' },
    { id: 2, icon: '🚗', label: 'My Rides' },
    { id: 3, icon: '💼', label: 'Wallet' },
    { id: 4, icon: '🛡️', label: 'Safety' },
    { id: 5, icon: '🏅', label: 'My Rewards' },
    { id: 6, icon: '🎁', label: 'Refer & Earn' },
    { id: 7, icon: '❓', label: 'Help' },
    { id: 8, icon: '📄', label: 'Terms & Conditions' },
    { id: 9, icon: 'ℹ️', label: 'About' },
  ];

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Settings</Text>
      </View>

      {/* Profile Section */}
      <TouchableOpacity style={styles.profileContainer}>
        <View style={styles.profileIcon}>
          <Text style={styles.profileIconText}>👤</Text>
        </View>
        <View style={styles.profileDetails}>
          <Text style={styles.profileName}>Shubham Joshi</Text>
          <Text style={styles.profilePhone}>+91 89546 65493</Text>
          <Text style={styles.profilePhone}>shubhamjoshi99899@gmail.com</Text>
        </View>
        <View style={styles.profileIcon}>
          <Text style={styles.profileIconText}>🖍</Text>
        </View>
      </TouchableOpacity>

      {/* Menu Items */}
      <View style={styles.menuContainer}>
        {menuItems.map((item) => (
          <TouchableOpacity key={item.id} style={styles.menuItem}>
            <View style={styles.menuItemSingle}>
              <Text style={styles.menuIcon}>{item.icon}</Text>
              <Text style={styles.menuText}>{item.label}</Text>
            </View>
            <Text style={styles.menuIcon}>〉</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Sign Out */}
      <TouchableOpacity style={styles.signOutContainer}>
        <Text style={styles.signOutIcon}>🚪</Text>
        <Text style={styles.signOutText}>Sign out</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8F8',
  },
  header: {
    padding: 16,
    backgroundColor: '#FFF',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    padding: 16,
    marginVertical: 8,
  },
  menuItemSingle: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 8,
  },
  profileIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#EEE',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  profileIconText: {
    fontSize: 24,
  },
  profileDetails: {
    flex: 1,
  },
  profileName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  profilePhone: {
    fontSize: 14,
    color: '#555',
  },
  menuContainer: {
    backgroundColor: '#FFF',
    margin: 16,
    borderRadius: 8,
    paddingVertical: 8,
  },
  menuItem: {
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#EEE',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  menuIcon: {
    fontSize: 20,
    marginRight: 16,
    color: '#007AFF',
  },
  menuText: {
    fontSize: 16,
    color: '#333',
  },
  signOutContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#FFF',
    margin: 16,
    borderRadius: 8,
  },
  signOutIcon: {
    fontSize: 20,
    color: '#FF3B30',
    marginRight: 16,
  },
  signOutText: {
    fontSize: 16,
    color: '#FF3B30',
  },
});

export default SettingsScreen;

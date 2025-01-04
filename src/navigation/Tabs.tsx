import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React, { useEffect, useState } from 'react';
import {
  Image,
  ImageSourcePropType,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import DashboardHomeScreen from '@/screens/Dashboard/DashboardHome';
import ProfileScreen from '@/screens/ProfileScreen/ProfileScreen';
import MyRidesScreen from '@/screens/RidesScreen/RidesScreen';
import ServicesScreen from '@/screens/Service/ServiceScreen';

import DashboardComponent from '@/components/components/Dashboard/Dashboard';
import { icons } from '@/constants'; // Adjust the import path if necessary

import { Paths } from './paths';
import { TabParamList } from './types';

const Tab = createBottomTabNavigator<TabParamList>();

const TabIcon = ({
  source,
  label,
  focused,
}: {
  source: ImageSourcePropType;
  label: string;
  focused: boolean;
}) => (
  <View style={styles.iconWrapper}>
    <View style={[styles.iconContainer, focused && styles.iconFocused]}>
      <Image source={source} resizeMode="contain" style={styles.iconImage} />
    </View>
    <Text style={[styles.iconLabel, focused && styles.iconLabelFocused]}>
      {label}
    </Text>
  </View>
);

export default function Layout() {
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const showSubscription = Keyboard.addListener('keyboardDidShow', () => {
      setKeyboardVisible(true);
    });
    const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardVisible(false);
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <Tab.Navigator
        initialRouteName="DashboardHome"
        screenOptions={{
          tabBarShowLabel: false,
          tabBarStyle: [
            styles.tabBar,
            isKeyboardVisible ? { display: 'none' } : {},
          ],
          headerShown: false,
        }}
      >
        <Tab.Screen
          component={DashboardComponent}
          name={Paths.DashboardHome}
          options={{
            tabBarIcon: ({ focused }) => (
              <TabIcon source={icons.home} label="Home" focused={focused} />
            ),
          }}
        />
        <Tab.Screen
          name="Services"
          component={ServicesScreen}
          options={{
            tabBarIcon: ({ focused }) => (
              <TabIcon source={icons.grid} label="Services" focused={focused} />
            ),
          }}
        />
        <Tab.Screen
          name={Paths.RideDetails}
          component={MyRidesScreen}
          options={{
            tabBarIcon: ({ focused }) => (
              <TabIcon source={icons.list} label="Rides" focused={focused} />
            ),
          }}
        />
        <Tab.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            tabBarIcon: ({ focused }) => (
              <TabIcon
                source={icons.profile}
                label="Profile"
                focused={focused}
              />
            ),
          }}
        />
      </Tab.Navigator>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    height: 80,
    backgroundColor: '#333333',
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  iconWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconFocused: {
    backgroundColor: '#2F6FED', // Highlight color for focused tab
  },
  iconImage: {
    width: 24,
    height: 24,
    tintColor: 'white',
  },
  iconLabel: {
    marginTop: 4,
    fontSize: 12,
    color: '#A5A5A5', // Inactive label color
  },
  iconLabelFocused: {
    color: '#FFFFFF', // Active label color
  },
});

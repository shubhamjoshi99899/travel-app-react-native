import type { RootStackParamList } from '@/navigation/types';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { useTheme } from '@/theme';
import { Paths } from '@/navigation/paths';

import { Example, Home, SignUp, Startup } from '@/screens';
import ConfirmRide from '@/screens/BookRide/BookRide';
import Dashboard from '@/screens/Dashboard/Dashboard';
import DashboardHomeScreen from '@/screens/Dashboard/DashboardHome';
import DriverDetailsScreen from '@/screens/DriverDetails/DriverDetails';
import Login from '@/screens/Login/Login';
import SelectPreference from '@/screens/Preference/SelectPreference';
import RideDetails from '@/screens/RideDetails/RideDetails';
import RiderDetails from '@/screens/RiderDetails/RiderDetails';
import SelectSeat from '@/screens/SeatSelection/SeatSelection';
import SelectDestination from '@/screens/SelectDestination/SelectDestination';
import PickupLocationScreen from '@/screens/SelectDestination/SelectPickup';
import SelectRide from '@/screens/SelectRide/SelectRide';

import Layout from './Tabs';

const Stack = createStackNavigator<RootStackParamList>();

function ApplicationNavigator() {
  const { variant, navigationTheme } = useTheme();

  return (
    <SafeAreaProvider>
      <NavigationContainer theme={navigationTheme}>
        <Stack.Navigator key={variant} screenOptions={{ headerShown: false }}>
          <Stack.Screen component={Startup} name={Paths.Startup} />
          <Stack.Screen component={Example} name={Paths.Example} />
          <Stack.Screen component={Home} name={Paths.Home} />
          <Stack.Screen component={SignUp} name={Paths.SignUp} />
          <Stack.Screen component={Login} name={Paths.Login} />
          <Stack.Screen component={Dashboard} name={Paths.Dashboard} />
          <Stack.Screen
            component={DashboardHomeScreen}
            name={Paths.DashboardHome}
          />
          <Stack.Screen component={Layout} name={Paths.Layout} />
          <Stack.Screen component={RideDetails} name={Paths.RideDetails} />
          <Stack.Screen component={SelectRide} name={Paths.SelectRide} />
          <Stack.Screen component={ConfirmRide} name={Paths.ConfirmRide} />
          <Stack.Screen component={SelectSeat} name={Paths.SelectSeat} />
          <Stack.Screen
            component={PickupLocationScreen}
            name={Paths.SelectPickupLocation}
          />
          <Stack.Screen
            component={SelectDestination}
            name={Paths.SelectDestination}
          />

          <Stack.Screen
            component={DriverDetailsScreen}
            name={Paths.DriverDetails}
          />
          <Stack.Screen
            component={SelectPreference}
            name={Paths.SelectPreference}
          />
          <Stack.Screen component={RiderDetails} name={Paths.RiderDetails} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

export default ApplicationNavigator;

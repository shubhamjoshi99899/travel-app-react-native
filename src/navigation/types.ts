import type { StackScreenProps } from '@react-navigation/stack';
import type { Paths } from '@/navigation/paths';

export type RootStackParamList = {
  [Paths.Startup]: undefined;
  [Paths.Example]: undefined;
  [Paths.Home]: undefined;
  [Paths.SignUp]: undefined;
  [Paths.Login]: undefined;
  [Paths.Dashboard]: undefined;
  [Paths.Layout]: undefined;
  [Paths.SelectRide]: undefined;
  [Paths.ConfirmRide]: undefined;
  [Paths.SelectSeat]: undefined;
  [Paths.SelectDestination]: undefined;
  [Paths.SelectPreference]: undefined;
  [Paths.RiderDetails]: undefined;
  [Paths.DashboardHome]: undefined;
  [Paths.RideDetails]: undefined;
  [Paths.DriverDetails]: undefined;
  [Paths.SelectPickupLocation]: undefined;
};

export type TabParamList = {
  [Paths.DashboardHome]: undefined;
  [Paths.SelectDestination]: undefined;
  [Paths.SelectPickupLocation]: undefined;
  [Paths.RideDetails]: undefined;
  Services: undefined;
  RideDetails: undefined;
  Profile: undefined;
};

export type RootScreenProps<
  S extends keyof RootStackParamList = keyof RootStackParamList,
> = StackScreenProps<RootStackParamList, S>;

export type TabScreenProps<S extends keyof TabParamList = keyof TabParamList> =
  StackScreenProps<TabParamList, S>;

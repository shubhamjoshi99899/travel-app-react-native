import BottomSheet, {
  BottomSheetScrollView,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import React, { useRef } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { icons } from '@/constants';
import { useLocationStore } from '@/store';

import Map from './Map';
import UserLocation from './UserLocation';

interface DashboardLayoutProps {
  title: string;
  snapPoints?: string[];
  children: React.ReactNode;
  showFullRoute?: boolean;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  title,
  snapPoints,
  children,
  showFullRoute = false,
}) => {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const { userAddress } = useLocationStore();

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <View style={{ flex: 1, backgroundColor: '#3B82F6' }}>
          <View
            style={{
              position: 'absolute',
              zIndex: 10,
              top: 50,
              left: 10,
              right: 10,
              padding: 10,
              flexDirection: 'row',
              alignItems: 'center',
              backgroundColor: 'white', // Added background color for contrast
              borderRadius: 8, // Added border radius
              //   shadowColor: '#000', // Optional: shadow for elevation
              shadowOpacity: 0.2,
              shadowRadius: 4,
              elevation: 5,
            }}
          >
            <Image
              source={icons.point}
              style={styles.icon}
              resizeMode="cover"
            />

            <Text style={styles.userAdress}>{userAddress}</Text>
          </View>

          <Map />
        </View>

        <BottomSheet
          ref={bottomSheetRef}
          snapPoints={snapPoints || ['40%', '85%']}
          index={0}
        >
          {title === 'Choose' ? (
            <BottomSheetView style={{ flex: 1, padding: 20 }}>
              {children}
            </BottomSheetView>
          ) : (
            <BottomSheetScrollView style={{ flex: 1, padding: 20 }}>
              {children}
            </BottomSheetScrollView>
          )}
        </BottomSheet>
      </View>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  icon: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  userAdress: {
    fontSize: 12,
    fontWeight: '500',
    flex: 1,
    maxWidth: '80%',
    marginLeft: 10,
  },
});

export default DashboardLayout;

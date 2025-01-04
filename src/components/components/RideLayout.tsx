import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import React, { useRef } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { icons } from '@/constants';

import Map from './Map';

interface RideLayoutProps {
  title: string;
  snapPoints?: string[];
  children: React.ReactNode;
  showFullRoute?: boolean; // New prop to control zoom behavior
}

const RideLayout: React.FC<RideLayoutProps> = ({
  title,
  snapPoints,
  children,
  showFullRoute = false,
}) => {
  const bottomSheetRef = useRef<BottomSheet>(null);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={{ flex: 1, backgroundColor: '#3B82F6' }}>
        <View
          style={{
            position: 'absolute',
            zIndex: 10,
            top: 16,
            left: 0,
            padding: 16,
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <TouchableOpacity onPress={() => bottomSheetRef.current?.collapse()}>
            <View
              style={{
                width: 40,
                height: 40,
                backgroundColor: 'white',
                borderRadius: 20,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Image
                source={icons.backArrow}
                resizeMode="contain"
                style={{ width: 24, height: 24 }}
              />
            </View>
          </TouchableOpacity>
          <Text
            style={{
              fontSize: 20,
              fontFamily: 'JakartaSemiBold',
              marginLeft: 10,
            }}
          >
            {title || 'Go Back'}
          </Text>
        </View>

        <Map />
      </View>

      <BottomSheet
        ref={bottomSheetRef}
        snapPoints={snapPoints || ['100%', '100%']}
        index={0}
      >
        <BottomSheetView style={{ flex: 1, padding: 20 }}>
          {children}
        </BottomSheetView>
      </BottomSheet>
    </GestureHandlerRootView>
  );
};

export default RideLayout;

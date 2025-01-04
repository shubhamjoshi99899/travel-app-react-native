import type { RootScreenProps } from '@/navigation/types';

import { useRef, useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Swiper from 'react-native-swiper';

import { Paths } from '@/navigation/paths'; // Import your Paths for navigation

import CustomButton from '@/components/components/CustomButton';
import { onboarding } from '@/constants';

function Home({ navigation }: RootScreenProps<Paths.Home>) {
  const swiperRef = useRef<Swiper>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const isLastSlide = activeIndex === onboarding.length - 1;

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          navigation.reset({
            // Use reset to clear navigation stack
            index: 0,
            routes: [{ name: Paths.SignUp }], // Adjust the route to your sign-up path
          });
        }}
        style={styles.skipButton}
      >
        <Text style={styles.skipText}>Skip</Text>
      </TouchableOpacity>

      <Swiper
        ref={swiperRef}
        loop={false}
        dot={<View style={styles.dot} />}
        activeDot={<View style={styles.activeDot} />}
        onIndexChanged={(index) => setActiveIndex(index)}
      >
        {onboarding.map((item) => (
          <View key={item.id} style={styles.slide}>
            <Image
              source={item.image}
              style={styles.image}
              resizeMode="contain"
            />
            <View style={styles.titleContainer}>
              <Text style={styles.title}>{item.title}</Text>
            </View>
            <Text style={styles.description}>{item.description}</Text>
          </View>
        ))}
      </Swiper>

      <CustomButton
        title={isLastSlide ? 'Get Started' : 'Next'}
        onPress={() => {
          if (isLastSlide) {
            navigation.reset({
              index: 0,
              routes: [{ name: Paths.SignUp }], // Adjust the route to your sign-up path
            });
          } else {
            swiperRef.current?.scrollBy(1);
          }
        }}
        style={styles.button}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'white',
  },
  skipButton: {
    width: '100%',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    padding: 20,
  },
  skipText: {
    color: 'black',
    fontSize: 16,
    fontFamily: 'JakartaBold',
  },
  dot: {
    width: 32,
    height: 4,
    marginHorizontal: 1,
    backgroundColor: '#E2E8F0',
    borderRadius: 2,
  },
  activeDot: {
    width: 32,
    height: 4,
    marginHorizontal: 1,
    backgroundColor: '#0286FF',
    borderRadius: 2,
  },
  slide: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  image: {
    width: '100%',
    height: 300,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    marginTop: 20,
  },
  title: {
    color: 'black',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginHorizontal: 10,
  },
  description: {
    fontSize: 14,
    fontFamily: 'JakartaSemiBold',
    textAlign: 'center',
    color: '#858585',
    marginHorizontal: 10,
    marginTop: 10,
  },
  button: {
    width: '91%', // Adjusted width to match your original class
    marginTop: 20,
    marginBottom: 20,
  },
});

export default Home;

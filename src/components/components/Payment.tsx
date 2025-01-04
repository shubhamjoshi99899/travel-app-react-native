import { useStripe } from '@stripe/stripe-react-native';
import React, { useState } from 'react';
import { Alert, Image, StyleSheet, Text, View } from 'react-native';
import { ReactNativeModal } from 'react-native-modal';

import { images } from '@/constants';
import { fetchAPI } from '@/lib/fetch';
import { useLocationStore } from '@/store';
import { PaymentProps } from '@/types/type';

import CustomButton from './CustomButton';

const Payment = ({
  fullName,
  email,
  amount,
  driverId,
  rideTime,
}: PaymentProps) => {
  const { initPaymentSheet, presentPaymentSheet } = useStripe();
  const {
    userAddress,
    userLongitude,
    userLatitude,
    destinationLatitude,
    destinationAddress,
    destinationLongitude,
  } = useLocationStore();
  // const { userId } = useAuth();
  const [success, setSuccess] = useState<boolean>(false);

  const openPaymentSheet = async () => {
    const initializationResult = await initializePaymentSheet();
    if (initializationResult.error) {
      Alert.alert('Initialization Error', initializationResult.error.message);
      return;
    }

    const { error } = await presentPaymentSheet();
    if (error) {
      Alert.alert(`Payment Error`, error.message);
    } else {
      setSuccess(true);
    }
  };

  const initializePaymentSheet = async () => {
    const { error } = await initPaymentSheet({
      merchantDisplayName: 'Example, Inc.',
      intentConfiguration: {
        mode: {
          amount: parseInt(amount) * 100,
          currencyCode: 'usd',
        },
        confirmHandler: async (
          paymentMethod,
          shouldSavePaymentMethod,
          intentCreationCallback,
        ) => {
          const { paymentIntent, customer } =
            await createPaymentIntent(paymentMethod);
          if (paymentIntent?.client_secret) {
            const result = await confirmPayment(
              paymentMethod,
              paymentIntent,
              customer,
            );
            if (result.client_secret) {
              await createRideRecord(result.client_secret);
              intentCreationCallback({ clientSecret: result.client_secret });
            }
          }
        },
      },
      returnURL: 'myapp://book-ride',
    });

    return { error };
  };

  const createPaymentIntent = async (paymentMethod: any) => {
    try {
      const response = await fetchAPI('/(api)/(stripe)/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: fullName || email.split('@')[0],
          email,
          amount,
          paymentMethodId: paymentMethod.id,
        }),
      });
      return response;
    } catch (error: any) {
      Alert.alert('Error creating payment intent', error.message);
      return { error };
    }
  };

  const confirmPayment = async (
    paymentMethod: any,
    paymentIntent: any,
    customer: any,
  ) => {
    try {
      const response = await fetchAPI('/(api)/(stripe)/pay', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          payment_method_id: paymentMethod.id,
          payment_intent_id: paymentIntent.id,
          customer_id: customer,
          client_secret: paymentIntent.client_secret,
        }),
      });
      return response.result;
    } catch (error: any) {
      Alert.alert('Error confirming payment', error.message);
      return { error };
    }
  };

  const createRideRecord = async (clientSecret: any) => {
    try {
      await fetchAPI('/(api)/ride/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          origin_address: userAddress,
          destination_address: destinationAddress,
          origin_latitude: userLatitude,
          origin_longitude: userLongitude,
          destination_latitude: destinationLatitude,
          destination_longitude: destinationLongitude,
          ride_time: rideTime.toFixed(0),
          fare_price: parseInt(amount) * 100,
          payment_status: 'paid',
          driver_id: driverId,
          user_id: 123,
        }),
      });
    } catch (error: any) {
      Alert.alert('Error creating ride record', error.message);
    }
  };

  return (
    <>
      <CustomButton
        title="Confirm Ride"
        style={{ marginBottom: 20 }}
        onPress={openPaymentSheet}
      />

      <ReactNativeModal
        isVisible={success}
        onBackdropPress={() => setSuccess(false)}
      >
        <View style={styles.modalContainer}>
          <Image source={images.check} style={styles.checkImage} />
          <Text style={styles.successText}>Booking placed successfully</Text>
          <Text style={styles.thankYouText}>
            Thank you for your booking. Your reservation has been successfully
            placed. Please proceed with your trip.
          </Text>
          <CustomButton
            title="Back Home"
            onPress={() => {
              setSuccess(false);
            }}
            style={styles.backHomeButton}
          />
        </View>
      </ReactNativeModal>
    </>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 20,
  },
  checkImage: {
    width: 112, // 28 * 4 for a more consistent design
    height: 112, // 28 * 4 for a more consistent design
    marginTop: 20,
  },
  successText: {
    fontSize: 24,
    textAlign: 'center',
    fontWeight: 'bold',
    marginTop: 20,
  },
  thankYouText: {
    fontSize: 16,
    color: '#6B7280', // General-200 color
    textAlign: 'center',
    marginTop: 10,
  },
  backHomeButton: {
    marginTop: 20,
  },
});

export default Payment;

import { Link } from '@react-navigation/native';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Alert, Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { ReactNativeModal } from 'react-native-modal';

import { Paths } from '@/navigation/paths';
import { RootScreenProps } from '@/navigation/types';

import CustomButton from '@/components/components/CustomButton';
import InputField from '@/components/components/InputField';
import { icons, images } from '@/constants';

function SignUp({ navigation }: RootScreenProps<Paths.SignUp>) {
  //   const { isLoaded, signUp, setActive } = useSignUp();
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
  });

  const [verification, setVerification] = useState({
    state: 'default',
    error: '',
    code: '',
  });

  const handleNavigation = () => {
    navigation.navigate(Paths.Home);
  };

  const onSignUpPress = async () => {
    // if (!isLoaded) return;
    // try {
    //   await signUp.create({
    //     emailAddress: form.email,
    //     password: form.password,
    //   });
    //   await signUp.prepareEmailAddressVerification({ strategy: 'email_code' });
    //   setVerification({ state: 'pending', error: '', code: '' });
    // } catch (err: any) {
    //   console.log(JSON.stringify(err, null, 2));
    //   Alert.alert('Error', err.errors[0].longMessage);
    // }
    navigation.navigate(Paths.Layout);
    console.log('object');
  };

  const onPressVerify = async () => {};

  return (
    <ScrollView style={styles.container}>
      <View style={styles.innerContainer}>
        <View style={styles.imageContainer}>
          <Image source={images.signUpCar} style={styles.image} />
          <Text style={styles.title}>Create Your Account</Text>
        </View>
        <View style={styles.formContainer}>
          <InputField
            label="Name"
            placeholder="Enter name"
            icon={icons.person}
            value={form.name}
            onChangeText={(value) => setForm({ ...form, name: value })}
          />
          <InputField
            label="Email"
            placeholder="Enter email"
            icon={icons.email}
            textContentType="emailAddress"
            value={form.email}
            onChangeText={(value) => setForm({ ...form, email: value })}
          />
          <InputField
            label="Password"
            placeholder="Enter password"
            icon={icons.lock}
            secureTextEntry={true}
            textContentType="password"
            value={form.password}
            onChangeText={(value) => setForm({ ...form, password: value })}
          />
          <CustomButton
            title="Sign Up"
            onPress={onSignUpPress}
            style={styles.signUpButton}
          />
          <Link to="/sign-in" style={styles.link}>
            Already have an account? <Text style={styles.linkText}>Log In</Text>
          </Link>
        </View>

        <ReactNativeModal
          isVisible={verification.state === 'pending'}
          onModalHide={() => {
            if (verification.state === 'success') {
              setShowSuccessModal(true);
            }
          }}
        >
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Verification</Text>
            <Text style={styles.modalText}>
              We've sent a verification code to {form.email}.
            </Text>
            <InputField
              label="Code"
              icon={icons.lock}
              placeholder="12345"
              value={verification.code}
              keyboardType="numeric"
              onChangeText={(code) =>
                setVerification({ ...verification, code })
              }
            />
            {verification.error && (
              <Text style={styles.errorText}>{verification.error}</Text>
            )}
            <CustomButton
              title="Verify Email"
              onPress={onPressVerify}
              style={styles.verifyButton}
            />
          </View>
        </ReactNativeModal>

        <ReactNativeModal isVisible={showSuccessModal}>
          <View style={styles.modalContainer}>
            <Image source={images.check} style={styles.successImage} />
            <Text style={styles.successTitle}>Verified</Text>
            <Text style={styles.successText}>
              You have successfully verified your account.
            </Text>
            <CustomButton
              title="Browse Home"
              onPress={() => handleNavigation()}
              style={styles.browseButton}
            />
          </View>
        </ReactNativeModal>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  innerContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  imageContainer: {
    position: 'relative',
    width: '100%',
    height: 250,
  },
  image: {
    width: '100%',
    height: 250,
    zIndex: 0,
  },
  title: {
    fontSize: 24,
    color: 'black',
    fontWeight: 'bold',
    position: 'absolute',
    bottom: 20,
    left: 20,
  },
  formContainer: {
    padding: 20,
  },
  signUpButton: {
    marginTop: 24,
  },
  link: {
    textAlign: 'center',
    fontSize: 18,
    marginTop: 20,
  },
  linkText: {
    color: '#3498db', // Adjust to your theme color
  },
  modalContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 16,
    minHeight: 300,
  },
  modalTitle: {
    fontWeight: 'bold',
    fontSize: 24,
    marginBottom: 10,
  },
  modalText: {
    marginBottom: 20,
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: 5,
  },
  verifyButton: {
    marginTop: 20,
    backgroundColor: '#4CAF50', // Success color
  },
  successImage: {
    width: 110,
    height: 110,
    alignSelf: 'center',
    marginVertical: 10,
  },
  successTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  successText: {
    fontSize: 16,
    color: '#7D7D7D', // Adjust as needed
    textAlign: 'center',
    marginVertical: 5,
  },
  browseButton: {
    marginTop: 20,
  },
});

export default SignUp;

import React from 'react';
import {
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

import { InputFieldProps } from '@/types/type';

const InputField = ({
  label,
  icon,
  secureTextEntry = false,
  labelStyle,
  containerStyle,
  inputStyle,
  iconStyle,
  ...props
}: InputFieldProps) => {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.keyboardAvoidingView}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.wrapper}>
          <Text style={[styles.label]}>{label}</Text>
          <View style={[styles.inputContainer]}>
            {icon && <Image source={icon} style={[styles.icon]} />}
            <TextInput
              style={[styles.input]}
              secureTextEntry={secureTextEntry}
              {...props}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

// Styles
const styles = StyleSheet.create({
  keyboardAvoidingView: {
    flex: 1, // Ensures the KeyboardAvoidingView takes full height
  },
  wrapper: {
    marginVertical: 8,
    width: '100%',
  },
  label: {
    fontSize: 18,
    fontFamily: 'JakartaSemiBold',
    marginBottom: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f3f4f6', // Neutral 100
    borderRadius: 50,
    borderWidth: 1,
    borderColor: '#f3f4f6', // Neutral 100
    paddingHorizontal: 8,
    // Apply focus styles if necessary
  },
  icon: {
    width: 24,
    height: 24,
    marginLeft: 16,
  },
  input: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    fontSize: 15,
    fontFamily: 'JakartaSemiBold',
    borderRadius: 50,
    textAlign: 'left',
  },
});

export default InputField;

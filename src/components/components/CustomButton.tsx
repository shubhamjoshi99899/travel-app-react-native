import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { ButtonProps } from '@/types/type';

// Function to get background style based on variant
const getBgVariantStyle = (variant: ButtonProps['bgVariant']) => {
  switch (variant) {
    case 'secondary':
      return styles.bgSecondary;
    case 'danger':
      return styles.bgDanger;
    case 'success':
      return styles.bgSuccess;
    case 'outline':
      return styles.bgOutline;
    default:
      return styles.bgPrimary; // Default primary color
  }
};

// Function to get text style based on variant
const getTextVariantStyle = (variant: ButtonProps['textVariant']) => {
  switch (variant) {
    case 'primary':
      return styles.textPrimary;
    case 'secondary':
      return styles.textSecondary;
    case 'danger':
      return styles.textDanger;
    case 'success':
      return styles.textSuccess;
    default:
      return styles.textDefault; // Default text color
  }
};

const CustomButton = ({
  onPress,
  title,
  bgVariant = 'primary',
  textVariant = 'default',
  IconLeft,
  IconRight,
  style, // Use style instead of className
  ...props
}: ButtonProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.button, getBgVariantStyle(bgVariant), style]} // Combine styles
      {...props}
    >
      {IconLeft && <View style={styles.icon}>{<IconLeft />}</View>}
      <Text style={[styles.text, getTextVariantStyle(textVariant)]}>
        {title}
      </Text>
      {IconRight && <View style={styles.icon}>{<IconRight />}</View>}
    </TouchableOpacity>
  );
};

// Styles
const styles = StyleSheet.create({
  button: {
    width: '100%',
    borderRadius: 999, // Fully rounded
    padding: 12, // Adjusted padding for better aesthetics
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000', // Shadow color for Android
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5, // Shadow for Android
  },
  bgPrimary: {
    backgroundColor: '#0286FF',
  },
  bgSecondary: {
    backgroundColor: '#6B7280', // Tailwind gray-500
  },
  bgDanger: {
    backgroundColor: '#EF4444', // Tailwind red-500
  },
  bgSuccess: {
    backgroundColor: '#10B981', // Tailwind green-500
  },
  bgOutline: {
    backgroundColor: 'transparent',
    borderColor: '#D1D5DB', // Tailwind neutral-300
    borderWidth: 0.5,
  },
  text: {
    fontSize: 18, // Adjusted font size
    fontWeight: 'bold', // Bold text
  },
  textPrimary: {
    color: '#000', // Tailwind black
  },
  textSecondary: {
    color: '#F3F4F6', // Tailwind gray-100
  },
  textDanger: {
    color: '#FECACA', // Tailwind red-100
  },
  textSuccess: {
    color: '#A7F3D0', // Tailwind green-100
  },
  textDefault: {
    color: '#FFFFFF', // Default white text
  },
  icon: {
    marginHorizontal: 8, // Spacing between icons and text
  },
});

export default CustomButton;

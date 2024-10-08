import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';
import {COLORS} from '../../constants/colors'; // Assuming you have a colors file

type ButtonProps = {
  title: string;
  onPress: () => void;
  color?: 'primary' | 'secondary' | 'success' | 'danger'; // Define the available colors
  size?: 'small' | 'normal' | 'large'; // Define available sizes
  fullWidth?: boolean;
};

const CustomButton: React.FC<ButtonProps> = ({
  title,
  onPress,
  color = 'primary',
  size = 'normal',
  fullWidth = false,
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        styles[color], // Color styles
        styles[size], // Size styles
        fullWidth && {width: '100%'}, // Apply 100% width if fullWidth is true
      ]}
      onPress={onPress}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 5,
    paddingVertical: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  // Color styles
  primary: {
    backgroundColor: COLORS.primary,
  },
  secondary: {
    backgroundColor: COLORS.secondary,
  },
  success: {
    backgroundColor: COLORS.success,
  },
  danger: {
    backgroundColor: COLORS.background.danger,
  },
  // Size styles
  small: {
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  normal: {
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  large: {
    paddingVertical: 14,
    paddingHorizontal: 28,
  },
});

export default CustomButton;

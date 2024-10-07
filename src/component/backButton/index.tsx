// BackButton.tsx
import React from 'react';
import {StyleSheet, Text, TouchableNativeFeedback, View} from 'react-native';
import {COLORS} from '../../constants/colors';

interface BackButtonProps {
  onPress: () => void;
  title?: string;
  style?: object; // Optional style for custom styling
}

const BackButton: React.FC<BackButtonProps> = ({
  onPress,
  title = 'Back',
  style,
}) => {
  return (
    <TouchableNativeFeedback onPress={onPress}>
      <View style={[styles.button, style]}>
        <Text style={styles.buttonText}>{title}</Text>
      </View>
    </TouchableNativeFeedback>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#007AFF', // You can customize this color
    alignItems: 'center',
  },
  buttonText: {
    color: COLORS.background.primary,
    fontWeight: 'bold',
  },
});

export default BackButton;

import React from 'react';
import {StyleSheet, TextInput, View, Text} from 'react-native';
import {ThemeColors} from '../../theme/themeTypes';
import {useTheme} from '../../theme';
import CustomText from '../customText';

interface CustomTextInputProps {
  label?: string; // Optional label to show above the TextInput
  value: string;
  placeholder: string;
  onChangeText: (text: string) => void;
  keyboardType?: 'default' | 'numeric' | 'email-address'; // Optional, default is 'default'
  secureTextEntry?: boolean; // Optional for password fields
  maxLength?: number;
}

const CustomTextInput: React.FC<CustomTextInputProps> = ({
  label,
  value,
  placeholder,
  onChangeText,
  keyboardType = 'default',
  secureTextEntry = false,
  maxLength,
}) => {
  const {theme} = useTheme();
  const styles = createStyles(theme);
  return (
    <View style={styles.container}>
      {label && <CustomText style={styles.label}>{label}</CustomText>}
      <TextInput
        style={styles.input}
        value={value}
        placeholder={placeholder}
        onChangeText={onChangeText}
        keyboardType={keyboardType}
        secureTextEntry={secureTextEntry}
        maxLength={maxLength}
      />
    </View>
  );
};

const createStyles = (theme: ThemeColors) =>
  StyleSheet.create({
    container: {
      marginBottom: 10,
    },
    label: {
      marginBottom: 5,
      fontWeight: 'bold',
    },
    input: {
      height: 40,
      borderColor: 'gray',
      borderWidth: 1,
      borderRadius: 5,
      paddingHorizontal: 10,
    },
  });

export default CustomTextInput;

import React from 'react';
import {StyleSheet, TextInput, View, Text} from 'react-native';
import {ThemeColors} from '../../theme/themeTypes';
import {useTheme} from '../../theme';
import CustomText from '../customText';

interface CustomTextInputProps {
  label?: string;
  value: string;
  placeholder: string;
  onChangeText: (text: string) => void;
  keyboardType?: any;
  secureTextEntry?: boolean; 
  maxLength?: number;
  style?: any;
  autoCapitalize?: any;
}

const CustomTextInput: React.FC<CustomTextInputProps> = ({
  label,
  value,
  placeholder,
  onChangeText,
  keyboardType = 'default',
  secureTextEntry = false,
  maxLength,
  style,
  autoCapitalize,
}) => {
  const {theme} = useTheme();
  const styles = createStyles(theme);
  return (
    <View style={styles.container}>
      {label && <CustomText style={styles.label}>{label}</CustomText>}
      <TextInput
        style={[styles.input, {...style}]}
        value={value}
        placeholder={placeholder}
        placeholderTextColor={theme.text.secondary}
        onChangeText={onChangeText}
        keyboardType={keyboardType}
        secureTextEntry={secureTextEntry}
        maxLength={maxLength}
        autoCapitalize={autoCapitalize}
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
      color: theme.text.primary,
    },
  });

export default CustomTextInput;

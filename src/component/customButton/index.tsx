import React from 'react';
import {TouchableOpacity, Text, StyleSheet, View} from 'react-native';
import {useTheme} from '../../theme';
import {ThemeColors} from '../../theme/themeTypes';
import CustomText from '../customText';

type ButtonProps = {
  title: string;
  onPress?: () => void;
  color?: 'primary' | 'secondary' | 'success' | 'danger';
  size?: 'small' | 'normal' | 'large';
  fullWidth?: boolean;
  disabled?: boolean;
  bold?: boolean;
};

const CustomButton: React.FC<ButtonProps> = ({
  title,
  onPress,
  color = 'primary',
  size = 'normal',
  fullWidth = false,
  disabled = false,
  bold
}) => {
  const {theme} = useTheme();
  const styles = createStyles(theme, color, fullWidth, disabled); // Pass color to createStyles

  return (
    <View style={styles.buttonWrapper}>
      <TouchableOpacity
        style={[styles.button, styles[color], styles[size]]}
        onPress={onPress}
        disabled={disabled}>
        <CustomText bold={bold} style={styles.buttonText}>{title}</CustomText>
      </TouchableOpacity>
    </View>
  );
};

const createStyles = (
  theme: ThemeColors,
  color: string,
  fullWidth: boolean,
  disabled: boolean,
) =>
  StyleSheet.create({
    buttonWrapper: {
      alignItems: 'center',
      marginTop:2,
      width: fullWidth ? '100%' : 'auto',
    },
    button: {
      borderRadius: 5,
      paddingVertical: 10,
      alignItems: 'center',
      width: fullWidth ? '100%' : 'auto',
      opacity: disabled ? 0.8 : 1,
    },
    buttonText: {
      color:
        color === 'danger'
          ? theme.text.primary
          : color === 'success'
          ? theme.text.primary
          : color === 'secondary'
          ? theme.text.primary
          : theme.secondary,
    },
    primary: {
      backgroundColor: theme.primary,
    },
    secondary: {
      backgroundColor: theme.secondary,
    },
    success: {
      backgroundColor: theme.success,
    },
    danger: {
      backgroundColor: theme.background.danger,
    },
    small: {
      paddingVertical: 3,
      paddingHorizontal: 6,
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

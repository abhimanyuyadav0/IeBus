import React from 'react';
import {TouchableOpacity, StyleSheet, View} from 'react-native';
import {useTheme} from '../../theme';
import {ThemeColors} from '../../theme/themeTypes';
import CustomText from '../customText';

type ButtonProps = {
  title?: string;
  onPress?: () => void;
  color?: 'primary' | 'secondary' | 'success' | 'danger';
  size?: 'small' | 'normal' | 'large';
  fullWidth?: boolean;
  disabled?: boolean;
  bold?: boolean;
  variant?: 'normal' | 'text' | 'outline' | 'link';
};

const CustomButton: React.FC<ButtonProps> = ({
  title,
  onPress,
  color = 'primary',
  size = 'normal',
  fullWidth = false,
  disabled = false,
  bold,
  variant = 'normal',
}) => {
  const {theme} = useTheme();
  const styles = createStyles(theme, color, fullWidth, disabled, variant);

  return (
    <View style={styles.buttonWrapper}>
      <TouchableOpacity
        style={[
          styles.button,
          styles[size],
          getButtonStyle(styles, variant, color),
        ]}
        onPress={onPress}
        disabled={disabled}>
        {title && (
          <CustomText bold={bold} style={getTextStyle(styles, variant, color)}>
            {title}
          </CustomText>
        )}
      </TouchableOpacity>
    </View>
  );
};

const getButtonStyle = (styles: any, variant: string, color: string) => {
  switch (variant) {
    case 'outline':
      return styles.outline;
    case 'text':
      return styles.textButton;
    case 'link':
      return styles.link;
    case 'normal':
    default:
      return styles[color];
  }
};

const getTextStyle = (styles: any, variant: string, color: string) => {
  switch (variant) {
    case 'outline':
      return [styles.buttonText, styles.outlineText];
    case 'text':
      return [styles.buttonText, styles.textButtonText];
    case 'link':
      return [styles.linkText];
    default:
      return styles.buttonText;
  }
};

const createStyles = (
  theme: ThemeColors,
  color: string,
  fullWidth: boolean,
  disabled: boolean,
  variant: string,
) =>
  StyleSheet.create({
    buttonWrapper: {
      alignItems: 'center',
      marginTop: 2,
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
    outline: {
      backgroundColor: 'transparent',
      borderWidth: 2,
      borderColor: theme.border,
    },
    outlineText: {
      color: theme.border,
    },
    textButton: {
      backgroundColor: 'transparent',
    },
    textButtonText: {
      color: theme.primary,
    },
    link: {
      backgroundColor: 'transparent',
      padding: 0,
    },
    linkText: {
      color: theme.primary,
      textDecorationLine: 'underline',
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

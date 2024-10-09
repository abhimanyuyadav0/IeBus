import React from 'react';
import { Text, StyleSheet, TextProps } from 'react-native';
import { useTheme } from '../../theme';  

type CustomTextProps = TextProps & {
  variant?: 'header' | 'subheader' | 'body' | 'caption';  
  color?: 'primary' | 'secondary' | 'error' | 'success'; 
  bold?: boolean;  
};

const CustomText: React.FC<CustomTextProps> = ({
  variant = 'body',   
  color = 'primary',   
  bold = false,       
  style,
  children,
  ...rest
}) => {
  const { theme } = useTheme(); 

  const styles = createStyles(theme, color, bold);

  return (
    <Text
      style={[styles[variant], style]}
      {...rest}
    >
      {children}
    </Text>
  );
};

const createStyles = (theme: any, color: string, bold: boolean) =>
  StyleSheet.create({
    header: {
      fontSize: 24,
      fontWeight: bold ? 'bold' : 'normal',
      color: theme.text[color],  
    },
    subheader: {
      fontSize: 20,
      fontWeight: bold ? 'bold' : 'normal',
      color: theme.text[color],
    },
    body: {
      fontSize: 16,
      fontWeight: bold ? 'bold' : 'normal',
      color: theme.text[color],
    },
    caption: {
      fontSize: 12,
      fontWeight: bold ? 'bold' : 'normal',
      color: theme.text[color],
    },
  });

export default CustomText;

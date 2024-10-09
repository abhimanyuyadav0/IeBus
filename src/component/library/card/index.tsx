import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ImageSourcePropType,
  StyleProp,
  ViewStyle,
} from 'react-native';
import { useTheme } from '../../../theme';

interface CardProps {
  title?: string;
  children: React.ReactNode;
  image?: ImageSourcePropType;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
}

const Card: React.FC<CardProps> = ({
  title,
  image,
  onPress,
  style,
  children,
}) => {
  const { theme } = useTheme(); // Get the theme from the hook
  const styles = createStyles(theme);

  return (
    <TouchableOpacity style={[styles.card, style]} onPress={onPress}>
      {image && <Image source={image} style={styles.image} />}
      <View style={styles.content}>
        {title && <Text style={styles.title}>{title}</Text>}
        <View>{children}</View>
      </View>
    </TouchableOpacity>
  );
};

const createStyles = (theme: any) =>
  StyleSheet.create({
    card: {
      backgroundColor: theme.background.primary,
      borderRadius: 10,
      shadowColor: theme.text.primary, 
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.3,
      shadowRadius: 4,
      elevation: 5,
      overflow: 'hidden',
      padding: 10,
    },
    image: {
      width: '100%',
      height: 150,
    },
    title: {
      fontSize: 18,
      fontWeight: 'bold',
      color: theme.text.primary,  // Use theme text color
    },
    content: {},
  });

export default Card;

// Card.tsx
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ImageSourcePropType,
} from 'react-native';

interface CardProps {
  title?: string;
  children: any;
  image?: ImageSourcePropType; // Optional prop for the image
  onPress?: () => void;
  style?: any;
}

const Card: React.FC<CardProps> = ({
  title,
  image,
  onPress,
  style,
  children,
}) => {
  return (
    <TouchableOpacity style={[styles.card, {...style}]} onPress={onPress}>
      {image && <Image source={image} style={styles.image} />}
      <View style={styles.content}>
        {title && <Text style={styles.title}>{title}</Text>}
        <View>{children}</View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
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
  },
  content: {},
});

export default Card;

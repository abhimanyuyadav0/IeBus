// Grid.tsx
import React from 'react';
import {View, StyleSheet, ViewStyle} from 'react-native';

interface GridItemProps {
  span?: any; // Number of columns the item should span
  spacing?: any; // Number of columns the item should span
  children: React.ReactNode;
}

const GridItem: React.FC<GridItemProps> = ({
  span = 1,
  children,
  spacing = 4,
}) => {
  return (
    <View
      style={[
        styles.item,
        {flexBasis: `${(span / 12) * 100}%`, padding: spacing},
      ]}>
      {children}
    </View>
  );
};

interface GridProps {
  children: React.ReactNode;
}

const Grid: React.FC<GridProps> = ({children}) => {
  return (
    <View style={styles.grid}>
      {React.Children.map(children, child => (
        <>{child}</>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start', // Adjust alignment if needed
  },
  item: {} as ViewStyle,
});

// Use named exports
export {Grid, GridItem};

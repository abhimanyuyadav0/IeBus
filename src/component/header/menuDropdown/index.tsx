import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import { useTheme } from '../../../theme';
import { ThemeColors } from '../../../theme/themeTypes';
import CustomText from '../../customText';

interface DropdownMenuProps {
  onLogout: () => void;
  onProfile: () => void;
}

const DropdownMenu: React.FC<DropdownMenuProps> = ({onLogout, onProfile}) => {
  const {theme} = useTheme(); 
  const styles = createStyles(theme);
  const menuItems = [
    { label: 'User Profile', onPress: onProfile },
    { label: 'Logout', onPress: onLogout },
  ];
  return (
    <View style={styles.menuContainer}>
      {menuItems.map((item, index) => (
        <TouchableOpacity key={index} style={styles.menuItem} onPress={item.onPress}>
          <CustomText style={styles.menuText}>{item.label}</CustomText>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const createStyles = (theme: ThemeColors) => 
  StyleSheet.create({
    menuContainer: {
      position: 'absolute',
      top: 50,
      right: 10,
      backgroundColor: theme.background.primary,
      padding: 10,
      borderRadius: 5,
      elevation: 5,
      zIndex: 1000,
      shadowColor: theme.shadow,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 3.5,
    },
    menuItem: {
      paddingVertical: 10,
    },
    menuText: {
      fontSize: 16,
      color: theme.secondary,
    },
});

export default DropdownMenu;

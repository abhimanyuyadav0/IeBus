import React, {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DropdownMenu from './menuDropdown';
import { useTheme } from '../../theme';
import { ThemeColors } from '../../theme/themeTypes';
import CustomText from '../customText';
import { ROUTES } from '../../constants/routes';

interface CustomHeaderProps {
  navigation: any;
  title: string;
  headerBackVisible: boolean;
}

const CustomHeader: React.FC<CustomHeaderProps> = ({navigation, title, headerBackVisible}) => {
  const {theme} = useTheme(); 
  const styles = createStyles(theme);
  const [menuVisible, setMenuVisible] = useState(false);

  const toggleMenu = () => {
    setMenuVisible(prevState => !prevState);
  };

  const handleLogout = async () => {
    await AsyncStorage.removeItem('userData');
    navigation.replace(ROUTES.LOGIN);
  };

  const handleProfile = () => {
    setMenuVisible(false);
    navigation.navigate(ROUTES.DASHBOARD);
  };

  return (
    <View style={styles.headerContainer}>
      {headerBackVisible && navigation.canGoBack() && (
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <CustomText style={styles.backButton}>←</CustomText>
        </TouchableOpacity>
      )}
      <Text style={styles.headerTitle}>{title}</Text>
      <TouchableOpacity onPress={toggleMenu}>
        <CustomText style={styles.hamburger}>☰</CustomText>
      </TouchableOpacity>
      {menuVisible && (
        <DropdownMenu onLogout={handleLogout} onProfile={handleProfile} />
      )}
    </View>
  );
};

const createStyles = (theme: ThemeColors) =>  
  StyleSheet.create({
    headerContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      height: 60,
      paddingHorizontal: 10,
      backgroundColor: theme.background.primary,
      elevation: 5,
      shadowColor: theme.shadow,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 3.5,
    },
    backButton: {
      fontSize: 24,
      color: theme.text.primary,
    },
    hamburger: {
      fontSize: 24,
      color: theme.text.primary,
    },
    headerTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      color: theme.text.primary,
      flex: 1,
      textAlign: 'center',
    },
});

export default CustomHeader;

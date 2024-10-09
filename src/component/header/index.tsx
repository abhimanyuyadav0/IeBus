import React, {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DropdownMenu from './menuDropdown';

interface CustomHeaderProps {
  navigation: any;
  title: string;
  headerBackVisible: boolean; // New prop to control back button visibility
}

const CustomHeader: React.FC<CustomHeaderProps> = ({navigation, title, headerBackVisible}) => {
  const [menuVisible, setMenuVisible] = useState(false);

  const toggleMenu = () => {
    setMenuVisible(prevState => !prevState);
  };

  const handleLogout = async () => {
    await AsyncStorage.removeItem('userData');
    navigation.replace('Login');
  };

  const handleProfile = () => {
    setMenuVisible(false);
    navigation.navigate('Profile');
  };

  return (
    <View style={styles.headerContainer}>
      {headerBackVisible && navigation.canGoBack() && (
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backButton}>←</Text>
        </TouchableOpacity>
      )}
      <Text style={styles.headerTitle}>{title}</Text>
      <TouchableOpacity onPress={toggleMenu}>
        <Text style={styles.hamburger}>☰</Text>
      </TouchableOpacity>
      {menuVisible && (
        <DropdownMenu onLogout={handleLogout} onProfile={handleProfile} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 60,
    paddingHorizontal: 10,
    backgroundColor: '#007BFF',
  },
  backButton: {
    fontSize: 24,
    color: '#fff',
  },
  hamburger: {
    fontSize: 24,
    color: '#fff',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    flex: 1,
    textAlign: 'center',
  },
});

export default CustomHeader;

import React, {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Modal} from 'react-native';

interface DropdownMenuProps {
  onLogout: () => void;
  onProfile: () => void;
}

const DropdownMenu: React.FC<DropdownMenuProps> = ({onLogout, onProfile}) => {
  return (
    <View style={styles.menuContainer}>
      <TouchableOpacity style={styles.menuItem} onPress={onProfile}>
        <Text style={styles.menuText}>User Profile</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.menuItem} onPress={onLogout}>
        <Text style={styles.menuText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  menuContainer: {
    position: 'absolute',
    top: 50, // Adjust as per the header height
    right: 10,
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 5,
    elevation: 5,
    zIndex: 1000,
  },
  menuItem: {
    paddingVertical: 10,
  },
  menuText: {
    fontSize: 16,
    color: '#007BFF',
  },
});

export default DropdownMenu;

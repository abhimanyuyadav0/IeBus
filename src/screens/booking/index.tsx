import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableNativeFeedback,
  Alert,
} from 'react-native';
import { ROUTES } from '../../constants/routes';

const BookingScreen = ({ navigation, route }: any) => {
  const { bus } = route.params; 
  const [formData, setFormData] = useState({ name: '', contact: '' });

  const handleInputChange = (name: string, value: string) => {
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleBooking = () => {
    const { name, contact } = formData;
    if (name && contact) {
      Alert.alert('Booking Confirmed', `You have booked ${bus.name}.`, [
        { text: 'OK', onPress: () => navigation.replace(ROUTES.DASHBOARD) },
      ]);
    } else {
      Alert.alert('Error', 'Please fill in all fields.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Booking for {bus.name}</Text>
      <View style={styles.formGroup}>
        <Text>Name:</Text>
        <TextInput
          style={styles.input}
          value={formData.name}
          onChangeText={(value) => handleInputChange('name', value)}
          placeholder="Enter your name"
        />
      </View>
      <View style={styles.formGroup}>
        <Text>Contact:</Text>
        <TextInput
          style={styles.input}
          value={formData.contact}
          onChangeText={(value) => handleInputChange('contact', value)}
          placeholder="Enter your contact number"
          keyboardType="phone-pad"
        />
      </View>
      <TouchableNativeFeedback onPress={handleBooking}>
        <View style={styles.button}>
          <Text style={styles.buttonText}>Confirm Booking</Text>
        </View>
      </TouchableNativeFeedback>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  formGroup: {
    marginBottom: 15,
  },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
  },
  button: {
    backgroundColor: 'blue',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default BookingScreen;

import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Button, Alert } from 'react-native';
import { ROUTES } from '../../constants/routes';
import { CustomTextInput } from '../../component';

const PaymentScreen = ({ route, navigation }: any) => {
  const { selectedSeats, bus, totalPrice, passengers } = route.params; // Get passengers from params
  const [formData, setFormData] = useState({
    cardNumber: '',
    cardHolder: '',
    expiryDate: '',
    cvv: '',
  });

  useEffect(() => {
    // You can also handle total price calculation here if needed
  }, [selectedSeats, bus]);

  const handlePayment = () => {
    if (!formData.cardNumber || !formData.cardHolder || !formData.expiryDate || !formData.cvv) {
      Alert.alert('Error', 'Please fill in all payment details.');
      return;
    }

    // Implement the payment processing logic here
    // Alert.alert('Payment Successful', `Total Price: $${totalPrice}`);
    
    // Navigate to the confirmation screen
    navigation.replace(ROUTES.CONFIRMATION, { selectedSeats, bus, totalPrice, passengers }); // Pass passengers to confirmation
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Payment for {bus?.name || 'Bus'}</Text>
      <Text style={styles.totalText}>Total Price: ${totalPrice}</Text>

      <CustomTextInput
        label="Card Number"
        value={formData.cardNumber}
        placeholder="Card Number"
        onChangeText={value => handleInputChange('cardNumber', value)}
        keyboardType="numeric"
        maxLength={16}
      />
      <CustomTextInput
        label="Card Holder Name"
        value={formData.cardHolder}
        placeholder="Card Holder Name"
        onChangeText={value => handleInputChange('cardHolder', value)}
      />
      <CustomTextInput
        label="Expiry Date"
        value={formData.expiryDate}
        placeholder="Expiry Date (MM/YY)"
        onChangeText={value => handleInputChange('expiryDate', value)}
        maxLength={5}
      />
      <CustomTextInput
        label="CVV"
        value={formData.cvv}
        placeholder="CVV"
        onChangeText={value => handleInputChange('cvv', value)}
        keyboardType="numeric"
        secureTextEntry
        maxLength={3}
      />

      <Button title="Pay Now" onPress={handlePayment} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  totalText: {
    fontSize: 20,
    marginBottom: 20,
  },
});

export default PaymentScreen;

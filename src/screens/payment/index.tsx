import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, Button, Alert} from 'react-native';
import {ROUTES} from '../../constants/routes';
import { CustomTextInput } from '../../component';

const PaymentScreen = ({route, navigation}: any) => {
  const {selectedSeats, bus} = route.params;
  const [formData, setFormData] = useState({
    cardNumber: '',
    cardHolder: '',
    expiryDate: '',
    cvv: '',
  });
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    // Calculate total price based on selected seats
    const seatData = [
      {id: 1, price: 20},
      {id: 2, price: 20},
      {id: 3, price: 20},
      {id: 4, price: 25},
      {id: 5, price: 25},
      {id: 6, price: 25},
    ];

    const price = selectedSeats.reduce((total: number, seatId: number) => {
      const seat = seatData.find(s => s.id === seatId);
      return total + (seat ? seat.price : 0);
    }, 0);

    setTotalPrice(price);
  }, [selectedSeats]);

  const handlePayment = () => {
    navigation.replace(ROUTES.CONFIRMATION, {selectedSeats, bus});
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Payment for {bus?.name}</Text>
      <Text style={styles.totalText}>Total Price: ${totalPrice}</Text>

      <CustomTextInput
        label="Card Number"
        value={formData.cardNumber}
        placeholder="Card Number"
        onChangeText={value => handleInputChange('cardNumber', value)}
        keyboardType="numeric"
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
      />
      <CustomTextInput
        label="CVV"
        value={formData.cvv}
        placeholder="CVV"
        onChangeText={value => handleInputChange('cvv', value)}
        keyboardType="numeric"
        secureTextEntry
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

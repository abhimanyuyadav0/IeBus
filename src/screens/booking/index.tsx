import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Alert,
  TouchableOpacity,
} from 'react-native';
import { ROUTES } from '../../constants/routes';
import { CustomButton } from '../../component';
import SeatSelectionScreen from './seatSelection';
import { Card } from '../../component/library';

const BookingScreen = ({ navigation, route }: any) => {
  const { bus } = route.params;
  const [formData, setFormData] = useState<any[]>([]);
  const [selectedSeats, setSelectedSeats] = useState<number[]>([]);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [newPassenger, setNewPassenger] = useState<{ name: string; contact: string } | null>(null);

  // Handle input changes for new passenger
  const handleNewPassengerInputChange = (name: string, value: string) => {
    setNewPassenger((prev) => ({ ...prev, [name]: value }));
  };

  // Add passenger to formData array
  const saveNewPassenger = () => {
    if (!newPassenger?.name || !newPassenger.contact) {
      Alert.alert('Error', 'Please fill in all fields.');
      return;
    }
    setFormData((prev) => [...prev, newPassenger]);
    setNewPassenger(null);  // Reset form
  };

  // Delete passenger by index
  const deletePassenger = (index: number) => {
    setFormData((prev) => prev.filter((_, i) => i !== index));
    if (selectedSeats.length > formData.length) {
      setSelectedSeats(selectedSeats.slice(0, formData.length - 1));
    }
  };

  // Start editing an existing passenger
  const startEditing = (index: number) => {
    setEditingIndex(index);
    setNewPassenger({ ...formData[index] });  // Populate the form with passenger data
  };

  // Save changes made to an existing passenger
  const saveChanges = (index: number) => {
    if (!newPassenger?.name || !newPassenger.contact) {
      Alert.alert('Error', 'Please fill in all fields.');
      return;
    }
    setFormData((prev) => {
      const updatedData = [...prev];
      updatedData[index] = newPassenger;
      return updatedData;
    });
    setEditingIndex(null);  // Exit edit mode
    setNewPassenger(null);  // Reset form
  };

  // Cancel editing or adding a new passenger
  const cancelEditing = () => {
    setEditingIndex(null);
    setNewPassenger(null);  // Reset form
  };

  // Get total price for selected seats
  const getTotalPrice = () => {
    return selectedSeats.reduce((total, seatId) => {
      const seat = bus.seats.find((s: any) => s.id === seatId);
      return total + (seat ? seat.price : 0);
    }, 0);
  };
  const assignRandomSeats = () => {
    const availableSeats = bus.seats.filter((seat) => !selectedSeats.includes(seat.id) && !seat.booked);
    const requiredSeats = formData.length - selectedSeats.length;
  
    for (let i = 0; i < requiredSeats; i++) {
      if (availableSeats.length > 0) {
        const randomSeatIndex = Math.floor(Math.random() * availableSeats.length);
        const randomSeat = availableSeats[randomSeatIndex];
        setSelectedSeats((prev) => [...prev, randomSeat.id]);
        availableSeats.splice(randomSeatIndex, 1); // Remove the assigned seat from available seats
      }
    }
  };
  
  // Proceed to the payment screen
  const handleProceedToPayment = () => {
    const totalPrice = getTotalPrice();
    if (formData.some(person => !person.name || !person.contact)) {
      Alert.alert('Error', 'Please fill in all fields for all passengers.');
      return;
    }

    if (selectedSeats.length < formData.length) {
      assignRandomSeats();  // Ensure selected seats match passenger count
    }

    navigation.navigate(ROUTES.PAYMENT, {
      selectedSeats,
      bus,
      totalPrice,
      passengers: formData,  // Passing the passengers' data
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Booking for {bus.name}</Text>

      {formData.map((person, index) => (
        <Card key={index} style={styles.card}>
          {editingIndex === index ? (
            <View>
              <Text>Editing Passenger {index + 1}:</Text>
              <TextInput
                style={styles.input}
                value={newPassenger?.name}
                onChangeText={value => handleNewPassengerInputChange('name', value)}
                placeholder="Enter your name"
              />
              <TextInput
                style={styles.input}
                value={newPassenger?.contact}
                onChangeText={value => handleNewPassengerInputChange('contact', value)}
                placeholder="Enter your contact number"
                keyboardType="phone-pad"
              />
              <View style={styles.actionButtons}>
                <TouchableOpacity onPress={() => saveChanges(index)}>
                  <Text style={styles.saveButton}>Save</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={cancelEditing}>
                  <Text style={styles.cancelButton}>Cancel</Text>
                </TouchableOpacity>
              </View>
            </View>
          ) : (
            <View>
              <Text>Passenger {index + 1}:</Text>
              <Text>Name: {person.name}</Text>
              <Text>Contact: {person.contact}</Text>
              <View style={styles.actionButtons}>
                <TouchableOpacity onPress={() => startEditing(index)}>
                  <Text style={styles.editButton}>Edit</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => deletePassenger(index)}>
                  <Text style={styles.deleteButton}>Delete</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </Card>
      ))}

      {editingIndex === null && newPassenger === null && (
        <CustomButton title="Add Passenger" onPress={() => setNewPassenger({ name: '', contact: '' })} />
      )}

      {editingIndex === null && newPassenger !== null && (
        <View>
          <Text>New Passenger:</Text>
          <TextInput
            style={styles.input}
            value={newPassenger?.name}
            onChangeText={value => handleNewPassengerInputChange('name', value)}
            placeholder="Enter your name"
          />
          <TextInput
            style={styles.input}
            value={newPassenger?.contact}
            onChangeText={value => handleNewPassengerInputChange('contact', value)}
            placeholder="Enter your contact number"
            keyboardType="phone-pad"
          />
          <View style={styles.actionButtons}>
            <TouchableOpacity onPress={saveNewPassenger}>
              <Text style={styles.saveButton}>Save</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={cancelEditing}>
              <Text style={styles.cancelButton}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      <SeatSelectionScreen
        route={{ params: { bus } }}
        selectedSeats={selectedSeats}
        setSelectedSeats={setSelectedSeats}
      />

      <View style={styles.totalContainer}>
        <Text style={styles.totalText}>Total Price: ${getTotalPrice()}</Text>
        <CustomButton
          title="Proceed to Payment"
          onPress={handleProceedToPayment}
          disabled={formData.length === 0}
        />
      </View>
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
  card: {
    marginBottom: 15,
  },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginTop: 5,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  editButton: {
    color: 'blue',
  },
  saveButton: {
    color: 'green',
  },
  cancelButton: {
    color: 'gray',
  },
  deleteButton: {
    color: 'red',
  },
  totalContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  totalText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default BookingScreen;

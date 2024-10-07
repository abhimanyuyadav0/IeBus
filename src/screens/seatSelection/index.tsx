import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableNativeFeedback,
  FlatList,
  Button,
} from 'react-native';
import { ROUTES } from '../../constants/routes';
import { Grid, GridItem } from '../../component/library';
import { COLORS } from '../../constants/colors';

const seatData = [
  { id: 1, number: '1A', price: 20, booked: false },
  { id: 2, number: '1B', price: 20, booked: false },
  { id: 3, number: '1C', price: 20, booked: true }, // Example of a booked seat
  { id: 4, number: '2A', price: 25, booked: false },
  { id: 5, number: '2B', price: 25, booked: false },
  { id: 6, number: '2C', price: 25, booked: true }, // Example of a booked seat
];

const SeatSelectionScreen = ({ route, navigation }: any) => {
  const { bus } = route.params; // Get the bus details passed from the previous screen
  const [selectedSeats, setSelectedSeats] = useState<number[]>([]); // Track selected seat IDs

  const toggleSeatSelection = (id: number) => {
    setSelectedSeats(prev =>
      prev.includes(id) ? prev.filter(seatId => seatId !== id) : [...prev, id],
    );
  };

  const getTotalPrice = () => {
    return selectedSeats.reduce((total, seatId) => {
      const seat = seatData.find(s => s.id === seatId);
      return total + (seat ? seat.price : 0);
    }, 0);
  };

  const renderSeat = ({ item }: { item: any }) => (
    <GridItem span={4}>
      <View style={{ backgroundColor: COLORS.background.secondary }}>
        <TouchableNativeFeedback
          onPress={() => toggleSeatSelection(item.id)}
          disabled={item.booked}>
          <View
            style={[
              styles.seat,
              item.booked
                ? styles.booked
                : selectedSeats.includes(item.id)
                ? styles.selected
                : styles.available,
            ]}>
            <Text style={styles.seatNumber}>{item.number}</Text>
            <Text style={styles.price}>${item.price}</Text>
          </View>
        </TouchableNativeFeedback>
      </View>
    </GridItem>
  );

  // Send the selected seats, bus details, and total price to the payment screen
  const handleProceedToPayment = () => {
    const totalPrice = getTotalPrice();
    navigation.navigate(ROUTES.PAYMENT, {
      selectedSeats,
      bus,
      totalPrice, // Passing the total price along with selectedSeats and bus details
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Select Seats for {bus.name}</Text>
      <Grid>
        <FlatList
          data={seatData}
          renderItem={renderSeat}
          keyExtractor={item => item.id.toString()}
          numColumns={4}
          contentContainerStyle={styles.seatList}
        />
      </Grid>
      <View style={styles.totalContainer}>
        <Text style={styles.totalText}>Total Price: ${getTotalPrice()}</Text>
        <Button
          title="Proceed to Payment"
          onPress={handleProceedToPayment} // Call handleProceedToPayment on press
          disabled={selectedSeats.length === 0}
        />
      </View>
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
  seatList: {
    paddingBottom: 20,
  },
  seat: {
    margin: 5,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  available: {
    backgroundColor: COLORS.status.available,
  },
  booked: {
    backgroundColor: COLORS.status.booked,
  },
  selected: {
    backgroundColor: COLORS.status.selected,
  },
  seatNumber: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  price: {
    fontSize: 14,
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

export default SeatSelectionScreen;

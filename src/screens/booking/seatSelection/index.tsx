import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableNativeFeedback,
  FlatList,
} from 'react-native';
import {Grid, GridItem} from '../../../component/library';
import {COLORS} from '../../../constants/colors';

const seatData = [
  {id: 1, number: '1A', price: 20, booked: false},
  {id: 2, number: '1B', price: 20, booked: false},
  {id: 3, number: '1C', price: 20, booked: true}, // Example of a booked seat
  {id: 4, number: '2A', price: 25, booked: false},
  {id: 5, number: '2B', price: 25, booked: false},
  {id: 6, number: '2C', price: 25, booked: true}, // Example of a booked seat
];

const SeatSelectionScreen = ({
  route,
  selectedSeats,
  setSelectedSeats,
}: any) => {
  const {bus} = route.params;

  const toggleSeatSelection = (id: number) => {
    setSelectedSeats((prev: number[]) =>
      prev.includes(id) ? prev.filter(seatId => seatId !== id) : [...prev, id],
    );
  };

  const renderSeat = ({item}: {item: any}) => (
    <GridItem span={4}>
      <View style={{backgroundColor: COLORS.background.secondary}}>
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
});

export default SeatSelectionScreen;

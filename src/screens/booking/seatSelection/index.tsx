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
import { CustomText } from '../../../component';

const SeatSelectionScreen = ({
  route,
  selectedSeats,
  setSelectedSeats,
}: any) => {
  const {bus} = route.params;
console.log(bus?.seats)
  const toggleSeatSelection = (id: number) => {
    setSelectedSeats((prev: number[]) =>
      prev.includes(id) ? prev.filter(seatId => seatId !== id) : [...prev, id],
    );
  };

  const renderSeat = ({item}: {item: any}) => (
    
    <GridItem span={4}>
      <View style={{backgroundColor: COLORS.background.secondary}}>
        <TouchableNativeFeedback
          onPress={() => toggleSeatSelection(item._id)}
          disabled={item.booked}>
          <View
            style={[
              styles.seat,
              item.booked
                ? styles.booked
                : selectedSeats.includes(item._id)
                ? styles.selected
                : styles.available,
            ]}>
            <CustomText style={styles.seatNumber}>{item.seatName}</CustomText>
            <CustomText style={styles.price}>${item.price}</CustomText>
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
          data={bus?.seats}
          renderItem={renderSeat}
          keyExtractor={item => item._id.toString()}
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
    fontSize: 12,
  },
  price: {
    fontSize: 10,
  },
});

export default SeatSelectionScreen;

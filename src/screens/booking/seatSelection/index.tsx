import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableNativeFeedback,
  FlatList,
  ScrollView,
} from 'react-native';
import {Grid, GridItem} from '../../../component/library';
import {CustomText} from '../../../component';
import {useTheme} from '../../../theme';
import {ThemeColors} from '../../../theme/themeTypes';

const SeatSelectionScreen = ({route, selectedSeats, setSelectedSeats, formData}: any) => {
  const {theme} = useTheme();
  const styles = createStyles(theme);
  const {bus} = route.params;
  const toggleSeatSelection = (id: number) => {
    setSelectedSeats((prev: number[]) =>
      prev.includes(id) ? prev.filter(seatId => seatId !== id) : [...prev, id],
    );
  };

  const renderSeat = ({item}: {item: any}) => (
    <GridItem span={4}>
      <View style={{backgroundColor: 'transparent'}}>
        <TouchableNativeFeedback
          onPress={() => toggleSeatSelection(item._id)}
          disabled={item.booked|| formData.length===selectedSeats.length}>
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
      <CustomText style={styles.header}>Select Seats for {bus.name}</CustomText>
      <ScrollView>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            alignItems: 'center',
          }}>
          {[1, 2].map(() => (
            <View style={styles.busLight} />
          ))}
        </View>
        <View style={styles.busWrapper}>
          <Grid>
            <GridItem span={6}>
              <View style={[styles.extraSeat, styles.booked]} />
            </GridItem>
            <GridItem span={2}>
              <View />
            </GridItem>
            <GridItem span={4}>
              <View
                style={{
                  flexDirection: 'column',
                  justifyContent: 'space-around',
                }}>
                <View style={[styles.stearRing, styles.booked]} />
                <View style={[styles.driveSeat, styles.booked]} />
              </View>
            </GridItem>
          </Grid>
          <View style={{marginTop: 10}}>
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
        </View>
      </ScrollView>
    </View>
  );
};

const createStyles = (theme: ThemeColors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      padding: 10,
      backgroundColor: theme.background.primary,
    },
    header: {
      fontSize: 18,
      fontWeight: 'bold',
      marginVertical: 20,
    },
    busWrapper: {
      borderWidth: 2,
      borderColor: theme.background.secondary,
      borderRadius: 5,
      borderTopRightRadius: 15,
      borderTopLeftRadius: 15,
      overflow: 'hidden',
    },
    busLight: {
      height: 20,
      width: 20,
      marginBottom: -3,
      backgroundColor: theme.background.secondary,
      borderWidth: 2,
      borderColor: 'white',
      borderTopStartRadius: 10,
      borderTopEndRadius: 10,
    },
    seatList: {
      paddingBottom: 20,
    },
    extraSeat: {
      margin: 5,
      height: 80,
      borderRadius: 5,
      paddingVertical: 5,
      justifyContent: 'center',
      alignItems: 'center',
    },
    stearRing: {
      height: 40,
      width: 40,
      borderRadius: 50,
      alignSelf: 'center',
    },
    driveSeat: {
      margin: 5,
      height: 40,
      borderRadius: 5,
      paddingVertical: 5,
      justifyContent: 'center',
      alignItems: 'center',
    },
    seat: {
      margin: 5,
      borderRadius: 5,
      paddingVertical: 5,
      justifyContent: 'center',
      alignItems: 'center',
    },
    available: {
      backgroundColor: theme.status.available,
    },
    booked: {
      backgroundColor: theme.status.booked,
    },
    selected: {
      backgroundColor: theme.status.selected,
    },
    seatNumber: {
      fontSize: 12,
    },
    price: {
      fontSize: 10,
    },
  });

export default SeatSelectionScreen;

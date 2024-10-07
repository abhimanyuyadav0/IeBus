import React from 'react';
import {StyleSheet, Text, View, Button} from 'react-native';
import {ROUTES} from '../../constants/routes';
import {Card} from '../../component/library';
import {COLORS} from '../../constants/colors';

const ConfirmationScreen = ({route, navigation}: any) => {
  const {bus, selectedSeats, totalPrice} = route.params;

  const renderSelectedSeats = () => {
    return selectedSeats.map((seatId: number) => (
      <Text key={seatId} style={styles.seatNumber}>
        Seat {seatId}
      </Text>
    ));
  };

  const handleDone = () => {
    navigation.replace(ROUTES.DASHBOARD);
  };

  return (
    <View style={styles.container}>
      <Card style={{width: '100%'}}>
        <Text style={styles.header}>Payment Confirmed!</Text>
        <Text style={styles.subHeader}>Thank you for your booking.</Text>
        <View
          style={{
            backgroundColor: COLORS.background.secondary,
            padding: 3,
            marginBottom: 10,
          }}>
          <Card>
            <Text style={styles.detailsHeader}>Booking Details:</Text>
            <Text style={styles.detail}>Bus Name: {bus?.name}</Text>
            <Text style={styles.detail}>Total Price: ${totalPrice}</Text>

            <Text style={styles.detailsHeader}>Selected Seats:</Text>
            {renderSelectedSeats()}
          </Card>
        </View>

        <Button title="Back to Dashboard" onPress={handleDone} />
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subHeader: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
  },
  detailsHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 5,
  },
  detail: {
    fontSize: 16,
    marginBottom: 5,
  },
  seatNumber: {
    fontSize: 16,
    color: 'blue',
  },
});

export default ConfirmationScreen;

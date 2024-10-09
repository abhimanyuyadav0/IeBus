import React, {useEffect} from 'react';
import {StyleSheet, Text, View, Alert} from 'react-native';
import {ROUTES} from '../../constants/routes';
import {Card} from '../../component/library';
import {COLORS} from '../../constants/colors';
import {useMutation} from '@tanstack/react-query';
import {createOrder} from '../../api/services/orders';
import {CustomButton} from '../../component';
import {getUser} from '../../utils/getUser';
import {bookBusSeat} from '../../api/services/buses';
import {useToast} from 'react-native-toast-notifications';

const ConfirmationScreen = ({route, navigation}: any) => {
  const toast = useToast();
  const {bus, selectedSeats, totalPrice, passengers} = route.params;
  const renderSelectedSeats = () => {
    return bus.seats
      .filter((seat: any) => selectedSeats.includes(seat._id))
      .map((seat: any, index: number) => (
        <Text key={index} style={styles.seatNumber}>
          Seat {seat.seatName}
        </Text>
      ));
  };

  const mutation = useMutation({
    mutationFn: createOrder,
    onSuccess: async () => {
      toast.show('Ticket booked successfully', {
        type: 'success',
      });
      let seatIds = selectedSeats;
      await bookBusSeat(bus._id, seatIds);
      navigation.replace(ROUTES.DASHBOARD);
    },
    onError: (error: any) => {
      console.error('Error creating order:', error.message || 'Unknown error');
      toast.show('Failed to book the ticket.', {
        type: 'error',
      });
    },
  });

  const handleDone = async () => {
    const user = await getUser();
    const payload = {
      user: user._id,
      bus: bus?._id,
      passengers: passengers?.map((passenger: any) => ({
        name: passenger.name,
        contact: passenger.contact,
      })),
      selectedSeats,
      totalPrice,
    };
    mutation.mutate(payload);
  };

  useEffect(() => {
    handleDone();
  }, []);

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
        <CustomButton
          title="Back to Dashboard"
          // onPress={() => navigation.replace(ROUTES.DASHBOARD)}
          onPress={() => handleDone()}
        />
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

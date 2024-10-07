import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableNativeFeedback,
  Alert,
} from 'react-native';
import {Card, Grid, GridItem} from '../../component/library';
import {COLORS} from '../../constants/colors';
import BackButton from '../../component/backButton';
import {ROUTES} from '../../constants/routes';
import {useQuery} from '@tanstack/react-query';
import {getOrders} from '../../api/services/orders';

const OrdersScreen = ({navigation}: any) => {
  const [bookedTickets, setBookedTickets] = useState<any[]>([]);
  const {
    data,
    isPending: loading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ['orders'],
    queryFn: getOrders,
  });
  useEffect(() => {
    const fetchBookedTickets = () => {
      const tickets = [
        {
          id: '1',
          name: 'John Doe',
          busName: 'Bus A',
          departure: '10:00 AM',
          arrival: '2:00 PM',
          price: '$20',
        },
        {
          id: '2',
          name: 'Jane Smith',
          busName: 'Bus B',
          departure: '1:00 PM',
          arrival: '5:00 PM',
          price: '$25',
        },
      ];
      setBookedTickets(tickets);
    };

    fetchBookedTickets();
  }, []);

  const handleDelete = (id: string) => {
    const updatedTickets = bookedTickets.filter(ticket => ticket.id !== id);
    setBookedTickets(updatedTickets);
    Alert.alert('Ticket Deleted', 'The ticket has been deleted successfully.');
  };
  console.log('first::', data);
  const renderItem = ({item}: any) => (
    <Grid>
      <GridItem span={12}>
        <Card title={item.name}>
          <View style={styles.ticketWrapper}>
            <Text>{item.busName}</Text>
            <Grid>
              <GridItem span={6}>
                <Text>Departure: {item.departure}</Text>
              </GridItem>
              <GridItem span={6}>
                <Text>Arrival: {item.arrival}</Text>
              </GridItem>
            </Grid>
            <Text>Price: {item.price}</Text>
            <TouchableNativeFeedback onPress={() => handleDelete(item.id)}>
              <View style={styles.deleteButton}>
                <Text style={styles.buttonText}>Delete Ticket</Text>
              </View>
            </TouchableNativeFeedback>
          </View>
        </Card>
      </GridItem>
    </Grid>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Booked Tickets</Text>
      {bookedTickets.length > 0 ? (
        <FlatList
          data={bookedTickets}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        />
      ) : (
        <Text>No booked tickets available.</Text>
      )}
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
  ticketWrapper: {
    padding: 5,
  },
  ticketHeader: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  deleteButton: {
    marginTop: 10,
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default OrdersScreen;
